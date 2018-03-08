<template>
    <div class="peopleManagement">
      <header>
        <i class="icon-fanhui" @click="goBack()"></i>
        <span>人员管理</span>
      </header>
      <div class="container">
        <!-- 添加员工 -->
        <div class="addPeople">
          <span @click="addPeople">+ 添加员工</span>
        </div>
        <!-- 人员列表 -->
        <div class="peopleList">
          <div @click="goPeopleManagementDetail(item,index)" v-for="(item,index) in allDatas">
            <div>
              <span v-if='item.StaffUrl ==="" '>
                <i class="icon-meirongshi"></i>
              </span>
              <span v-if='item.StaffUrl'>
                <img :src=item.StaffUrl alt="头像">
              </span>
              <span>
                <dl>
                <dt>{{item.StaffName | filterStrLen}}</dt>
                <dd>{{item.StaffPhone}}</dd>
              </dl>
              </span>
            </div>
            <div>
              <span>
                <!--<span v-if="Number(item.UserType) === 2">收银员</span>-->
                <!--<span v-else-if="Number(item.UserType) === 3">美容师</span>-->
                <!--<span v-else-if="Number(item.UserType) === 4">美容师助理</span>-->
                <!--<span v-else-if="Number(item.UserType) === 5">店长</span>-->
                <!--<span v-else>喵喵喵</span>-->
                <span>{{item.JobName}}</span>
                <span v-if="Number(item.State) === 1">已启用</span>
                <span v-else-if="Number(item.State) === 2">未激活</span>
                <span v-else-if="Number(item.State) === 3">已停用</span>
                <span v-else>已删除</span>
              </span>
              <span><i class="icon-gengduo"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "people-management",
      data(){
        return{
          allDatas:'',//所有人员数据
        }
      },
      created(){
        this.getAllPeople();
      },
      methods:{
        /* 返回上一层 */
        goBack(){
          this.$router.push({path:'/people'})
        },
        /* 添加员工 */
        addPeople(){
          this.$router.push({path:'/addPeople'});
        },
        /* 管理员工详情 */
        goPeopleManagementDetail(data,index){
          let aaa = {
            indexs:index
          }
          Object.assign(data, aaa);
          this.$router.push({path:'/peopleManagementDetail'});
          this.$store.dispatch('getPeopleAllData',data);
        },
        /* 获取所有员工 */
        getAllPeople(){
          this.$http.post('https://api.yongdaoyun.com/special/pet/staff/staff_info.php', this.sendData()).then(res => {
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
.peopleManagement{
  overflow: auto;
  height: 100%;
  & > header {
    height: 1rem;
    font-size: .36rem;
    border-bottom: 1px solid #e8e8e8;
    text-align: center;
    line-height: 1rem;
    background-color: #4B5060;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    color: #ffffff;
    & > i:nth-of-type(1) {
      position: absolute;
      font-size: .42rem;
      left: .28rem;
      color: #ffffff;
    }
  }
  .container{
    margin-top: 1rem;
    .addPeople{
      padding: .2rem .3rem;
      &>span{
        display: block;
        height: .75rem;
        background-color: #ffffff;
        color: #ff6633;
        font-size: .3rem;
        border-radius: 10px;
        border: 1px dotted #ff6633;
        line-height: .75rem;
        text-align: center;
      }
    }
    .peopleList{
      background-color: #ffffff;
      padding-left: .3rem;
      &>div{
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        height: 1.2rem;
        box-sizing: border-box;
        padding-top: .15rem;
        justify-content: space-between;
        &>div:nth-of-type(1){
          display: flex;
          &>span:nth-of-type(1){
            display: inline-block;
            background-color: #FFEFEE;
            width: .9rem;
            height: .9rem;
            line-height: .9rem;
            text-align: center;
            border-radius: 10px;
            overflow: hidden;
            &>i{
              font-size: .57rem;
              color: #F0BDA8;
            }
            &>img{
              width: 100%;
              height: 100%;
            }
          }
          &>span:nth-of-type(2){
            margin-left: .2rem;
            &>dl{
              padding-top: .05rem;
              &>dt{
                font-size: .3rem;
                color: #333333;
                margin-bottom: .1rem;
              }
              &>dd{
                font-size: .26rem;
                color: #999999;
              }
            }
          }
        }
        &>div:nth-of-type(2){
          display: flex;
          justify-content: space-between;
          padding-top: .2rem;
          padding-right: .3rem;
          &>span:nth-of-type(1){
            display: flex;
            justify-content: space-between;
            width: 2.8rem;
            margin-right: .15rem;
            &>span:nth-of-type(1){
              display: inline-block;
              border: 1px solid #e8e8e8;
              height: .44rem;
              line-height: .44rem;
              padding: 0 .12rem;
              background-color: #F6F6F6;
              font-size: .24rem;
              color: #666666;
              border-radius: 10px;
            }
            &>span:nth-of-type(2){
              font-size: .28rem;
              color: #cc2200;
              padding-top: .05rem;
            }
          }
          &>span:nth-of-type(2){
            padding-top: .1rem;
            &>i{
              font-size: .3rem;
            }
          }
        }
      }
      &>div:last-child{
        border-bottom: none;
      }
    }
  }
}
</style>
