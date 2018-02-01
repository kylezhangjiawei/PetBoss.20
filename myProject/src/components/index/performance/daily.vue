<template>
    <div class="daily">
      <fold>
        <span slot="headerLeft">李白</span>
        <span slot="headerRight" @click="test"><i class="icon-shouqi" :class="{'activess':indexs}"></i></span>
        <div slot="body">
          <div v-if="indexs">
            <p>
              <span>张三</span>
              <span>10:03:23</span>
            </p>
            <p>
              <span>
                <dl>
                  <dt>辛巴(泰迪)</dt>
                  <dd>洗澡</dd>
                </dl>
              </span>
              <span>
                <em>关小美</em>
                <em>&yen;180</em>
              </span>
            </p>
          </div>
        </div>
      </fold>
    </div>
</template>

<script>
    export default {
        name: "daily",
      data(){
        return{
          indexs:false
        }
      },
      methods:{
        test(){
          if(this.indexs === true){
            this.indexs = false
          }else {
            this.indexs=true;
          }

        }
      }
    }
</script>

<style scoped lang="scss">
.daily{
  .icon-shouqi{
    display: block;
    font-size: .28rem;
    -webkit-transition: width 1s, height 1s, -webkit-transform .5s; /* For Safari 3.1 to 6.0 */
    transition: width 1s, height 1s, transform .5s;
  }
  .activess{
    display: block;
    -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
    transform: rotate(180deg);
  }
}
</style>
<!--<style lang="scss">-->
<!--.daily{-->
<!--.yd-accordion-head-arrow:after,.yd-accordion-rotated:after{display:none}-->
<!--}-->

<!--</style>-->
