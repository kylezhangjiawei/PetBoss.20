<template>
  <div class="product">
    <header>
      <span>库存</span>
    </header>
    <div class="container">
      <yd-tab>
        <yd-tab-panel label="全部" active>
          <div class="content" @click="goProductDetail(item)" v-for="(item,index) in allDatas">
            <div>
              <div>
                <p>{{item.Name}}</p>
                <p>
                  <span>&yen; {{item.Price}}/{{item.Unit}}</span>
                  <span>条码：{{item.Barcode}}</span>
                  <span>
                    <span v-if="Number(item.StockWarning) === 1">
                      <yd-badge shape="circle" bgcolor="#ff9900" color="#ffffff">饱和</yd-badge>
                    </span>
                    <span v-if="Number(item.StockWarning) === 2">
                      <yd-badge shape="circle" bgcolor="#f20202" color="#ffffff">缺货</yd-badge>
                    </span>
                    <span v-if="Number(item.AdventWarning) === 1">
                      <yd-badge shape="circle" bgcolor="#444444" color="#ffffff">临期</yd-badge>
                    </span>
                  </span>
                </p>
                <p>
                  <span>
                     <span>{{item.Stock}}<em>{{item.Unit}}</em></span>
                  <span>{{item.Sku | filterSize}}</span>
                  </span>
                  <span>
                    <!--<span>2018.02.17过期</span>-->
                  </span>
                </p>
              </div>
              <div>
                <span><i class="icon-gengduo"></i></span>
              </div>
            </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="饱和">
          <div class="content" @click="goProductDetail(item)" v-for="(item,index) in allDatas" v-if="Number(item.StockWarning) === 1">
            <div>
              <div>
                <p>{{item.Name}}</p>
                <p>
                  <span>&yen; {{item.Price}}/{{item.Unit}}</span>
                  <span>条码：{{item.Barcode}}</span>
                  <span>
                  </span>
                </p>
                <p>
                  <span>
                     <span>{{item.Stock}}<em>{{item.Unit}}</em></span>
                  <span>{{item.Sku | filterSize}}</span>
                  </span>
                  <span>

                  </span>
                </p>
              </div>
              <div>
                <span><i class="icon-gengduo"></i></span>
              </div>
            </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="缺货">
          <div class="content" @click="goProductDetail(item)" v-for="(item,index) in allDatas" v-if="Number(item.StockWarning) === 2">
            <div>
              <div>
                <p>{{item.Name}}</p>
                <p>
                  <span>&yen; {{item.Price}}/{{item.Unit}}</span>
                  <span>条码：{{item.Barcode}}</span>
                  <span>
                  </span>
                </p>
                <p>
                  <span>
                     <span>{{item.Stock}}<em>{{item.Unit}}</em></span>
                  <span>{{item.Sku | filterSize}}</span>
                  </span>
                  <span>

                  </span>
                </p>
              </div>
              <div>
                <span><i class="icon-gengduo"></i></span>
              </div>
            </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="临期">
          <div class="content" @click="goProductDetail(item)" v-for="(item,index) in allDatas" v-if="Number(item.AdventWarning) === 1">
            <div>
              <div>
                <p>{{item.Name}}</p>
                <p>
                  <span>&yen; {{item.Price}}/{{item.Unit}}</span>
                  <span>条码：{{item.Barcode}}</span>
                  <span>
                  </span>
                </p>
                <p>
                  <span>
                     <span>{{item.Stock}}<em>{{item.Unit}}</em></span>
                  <span>{{item.Sku | filterSize}}</span>
                  </span>
                  <span>
                    <span>{{item.OverTime}}过期</span>
                  </span>
                </p>
              </div>
              <div>
                <span><i class="icon-gengduo"></i></span>
              </div>
            </div>
          </div>
        </yd-tab-panel>
      </yd-tab>
    </div>
  </div>
</template>

<script>
    export default {
        name: "product",
      data(){
          return{
            allDatas:'',//全部数据
          }
      },
      created(){
        this.getAllData();
      },
      methods:{
          /* 进入详情页面 */
          goProductDetail(data){
            this.$router.push({path:'/productDetail',query:{plan:data}});
          },
        /* 获取全部数据 */
        getAllData(){
          this.$http.post('https://api.yongdaoyun.com/special/pet/commodity/commodity_item_boss_info.php', this.sendData()).then(res => {
            console.log(res)
            if(res.data.err_code === "0000"){
             this.allDatas = res.data.data;
            }else {
              this.$store.dispatch('getDatas',{
                states:true,
                msg:res.data.err_msg
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      filters: {
        // 过滤对象类型的字符串
        filterSize(value) {
          if (value === "null") {
            return value.replace(/null/, " ")
          } else {
            return value.replace(/{|}|"/g, '');
          }
        },
        /* 过滤第二种情况 */
        filterSku(value) {
          if (value === "null") {
            return value.toString().replace(/null/, " ")
          } else {
            return value.toString().replace(/\[|\]|"/g, '');
          }
        },
        // 过滤字数过长的限制
        filterStrLen(value) {
          if(value){
            return (value.length >= 5) ? value.substring(0, 5) + '...' : value;
          }
        },
        filterTest(value) {
          if (value) {
            return value;
          } else {
            return value = "非会员";
          }
        },
        //  过滤时间戳
        filterTime(value) {
          if (value) {
            return (value.length >= 10) ? new Date(parseInt(value) * 1000).toLocaleString().replace(/\//g, "-").substr(0, 10) : value;
          } else {
            console.log("nothing")
          }
        }
      },
    }
</script>

<style scoped lang="scss">
  .product{
    padding-bottom: 1rem;
    overflow: auto;
    height: 100%;
    & > header {
      height: 1rem;
      font-size: .36rem;
      text-align: center;
      line-height: 1rem;
      background-color: #4B5060;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      color: #ffffff;
    }
    .container{
      padding-top: 1.88rem;
      .content{
        padding-left: .3rem;
        &>div{
          padding: .25rem .3rem .2rem 0;
          border-bottom: 1px solid #e8e8e8;
          display: flex;
          justify-content: space-between;
          &>div:nth-of-type(1){
            &>p:nth-of-type(1){
              font-size: .3rem;
              color: #333333;
            }
            &>p:nth-of-type(2){
              margin-top: .1rem;
              &>span{
                font-size: .24rem;
                color: #999999;
              }
              &>span:nth-of-type(1){
                margin-right: .2rem;
              }
            }
            &>p:nth-of-type(3){
              margin-top: .25rem;
              display: flex;
              justify-content: space-between;
              &>span:nth-of-type(1){
                &>span:nth-of-type(1){
                  font-size: .3rem;
                  color: #ff6633;
                  margin-right: .2rem;
                  &>em{
                    font-size: .24rem;
                  }
                }
                &>span:nth-of-type(2){
                  font-size: .24rem;
                  color: #333333;
                }
              }
              &>span:nth-of-type(2){
                display: flex;
                justify-content: center;
                flex-direction: column;
                &>span{
                  display: inline-block;
                  font-size: .24rem;
                  color: #999999;
                  background-color: #e8e8e8;
                  border-radius: 5px;
                  padding: 0 .1rem;
                  height: .34rem;
                  line-height: .34rem;
                }
              }
            }
          }
          &>div:nth-of-type(2){
            display: flex;
            &>span{
              display: flex;
              justify-content: center;
              flex-direction: column;
              margin-left: .2rem;
              &>i{
                font-size: .3rem;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .product{
    .container{
      .yd-tab-nav-item{
        height: .88rem;
        font-size: .3rem;
        color: #999999;
        border-bottom: 1px solid #e8e8e8;
      }
      .yd-tab-nav-item:not(:last-child):after{
        top: 0;
        height: 100%;
        border-right: 1px solid #e8e8e8;
      }
      .yd-tab-nav .yd-tab-active{
        background-color: #eef1fa;
        color: #4b5060;
      }
      .yd-tab-nav .yd-tab-active:before{
        width: auto;
        left: 0;
        right: 0;
        margin-left: 0;
      }
      .yd-tab-panel{
        margin-top: .15rem;
      }
      .yd-badge{
        margin-left: .1rem;
        font-size: .2rem;
        border-radius: 5px;
        padding: 0 .05rem;
      }
      .yd-tab-nav{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        margin-top: 1rem;
      }
    }
  }
</style>
