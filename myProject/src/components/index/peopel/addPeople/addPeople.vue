<template>
    <div class="addPeople">
      <header>
        <i class="icon-fanhui" @click="goBack()"></i>
        <span>添加员工</span>
      </header>
      <div class="container">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left"><em style="color: #ff6633;">*</em>姓名</span>
            <input slot="right" type="text" placeholder="请输入姓名" v-model="userName">
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left"><em style="color: #ff6633;">*</em>手机号</span>
            <input slot="right" type="tel" placeholder="请输入手机号" maxlength="11" oninput="this.value = this.value.replace(/[^0-9]/g, '')" v-model="userPhone" :disabled=disabledState>
          </yd-cell-item>
          <yd-cell-item arrow type="label">
            <span slot="left"><em style="color: #ff6633;">*</em>职位</span>
            <select slot="right" v-model="userJob">
              <option  value="" disabled selected>请选择</option>
              <option v-for="item in options">{{item.JobName}}</option>
            </select>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">备注</span>
            <input slot="right" type="text" placeholder="请填写备注" v-model="userNote">
          </yd-cell-item>
        </yd-cell-group>
        <div class="button">
          <button type="button" @click="addPeople">确定</button>
        </div>
        <!--<div class="message">
          <p>您当前短信剩余 <em>125</em> 条。</p>
        </div>-->
      </div>
      <!-- 商标 -->
      <div class="footer">
        <span>&copy; 2018 用道云 {{copy}}</span>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {Confirm, Alert, Toast, Notify, Loading} from 'vue-ydui/dist/lib.rem/dialog';
    export default {
        name: "add-people",
      data(){
          return{
            options:[],
            userName:'',
            userPhone:'',
            userJob:'',
            userNote:'',
            pathState:0,//跳转状态
            disabledState:false,//手机号状态
            peopleState:'',//人员状态
            StaffNumber:'',//员工编号
            StaffUrl:'',//员工头像
          }
      },
      computed:{
        ...mapGetters([
          'copy',
          'peopleData'
        ])
      },
      beforeRouteEnter (to, from, next) {
          console.log(from)
        next(vm => {
          if(from.path === "/peopleManagement"){
            vm.pathState = 1;
            vm.disabledState=false;
          }else  if(from.path === "/peopleManagementDetail"){
            vm.pathState = 2;
            vm.userName = vm.peopleData.StaffName;
            vm.userPhone = vm.peopleData.StaffPhone;
            vm.userJob = vm.peopleData.JobName;
            vm.userNote = vm.peopleData.Note;
            vm.peopleState = vm.peopleData.State;
            vm.StaffNumber = vm.peopleData.StaffNumber;
            vm.StaffUrl = vm.peopleData.StaffUrl;
            if(Number(vm.peopleData.State) === 1){
              vm.disabledState = true;
            }else {
              vm.disabledState = false;
            }
          }else {
            console.log('what ?')
          }
        })
      },
      created(){
          this.getJob();
      },
      methods:{
        goBack(){
            this.$router.go(-1);
          },
        /* 查询职位接口 */
        getJob(){
          this.$http.post('https://api.yongdaoyun.com/special/pet/staff/job_info.php', this.sendData()).then(res => {
            console.log(res)
            if (res.data.err_code === "0000") {
              this.options = res.data.data;
            } else {
              this.$store.dispatch('getDatas',{
                states:true,
                msg:res.data.err_msg
              })
            }
          }).catch(err => {
            console.log(err)
          })
        },
        /* 添加人员 */
        addPeople(){
          if(this.userName === ''){
            Toast({
              mes: '姓名不能为空！',
              timeout: 2000
            });
            return false;
          }else if(this.userPhone === ''){
            Toast({
              mes: '手机号不能为空！',
              timeout: 2000
            });
            return false;
          }else if(this.userJob === ''){
            Toast({
              mes: '职位不能为空！',
              timeout: 2000
            });
            return false;
          }else {

          }
          let jobData = {};
          jobData = this.options.find( (item) =>{  return item.JobName === this.userJob});
          console.log(jobData);
          if(this.pathState === 1){
            this.$http.post('https://api.yongdaoyun.com/special/pet/staff/staff_add.php', this.sendData({
              job_number:jobData.JobNumber,
              job_name:this.userJob,
              staff_name:this.userName,
              staff_phone:this.userPhone,
              note:this.userNote,
              author_phone:localStorage.getItem('userPhone'),
              author_name:localStorage.getItem('userName'),
              job_type:jobData.JobType
            })).then(res => {
              console.log(res)
              if (res.data.err_code === "0000") {
                this.$router.go(-1);
                Toast({mes: '已发送初始密码！', timeout: 1000});
              } else {
                Toast({mes: res.data.err_msg, timeout: 1000});
              }
            }).catch(err => {
              console.log(err)
            })
          }else if(this.pathState === 2){
            if(Number(this.peopleState) === 2){
              this.$http.post('https://api.yongdaoyun.com/special/pet/staff/staff_update.php', this.sendData({
                job_number:jobData.JobNumber,
                job_name:this.userJob,
                staff_number:this.StaffNumber,
                staff_name:this.userName,
                staff_phone:this.userPhone,
                note:this.userNote,
                author_phone:localStorage.getItem('userPhone'),
                author_name:localStorage.getItem('userName'),
                job_type:jobData.JobType
              })).then(res => {
                console.log(res)
                if (res.data.err_code === "0000") {
                  this.$router.push({path:'/peopleManagement'});
                  Toast({mes: '修改成功！', timeout: 1000});
                } else {
                  Toast({mes: res.data.err_msg, timeout: 1000});
                }
              }).catch(err => {
                console.log(err)
              })
            }else if(Number(this.peopleState) === 1){
              this.$http.post('https://api.yongdaoyun.com/special/pet/staff/staff_update_per.php', this.sendData({
                job_number:jobData.JobNumber,
                job_name:this.userJob,
                staff_number:this.StaffNumber,
                staff_name:this.userName,
                staff_url:this.StaffUrl,
                note:this.userNote,
                author_phone:localStorage.getItem('userPhone'),
                author_name:localStorage.getItem('userName'),
                job_type:jobData.JobType
              })).then(res => {
                console.log(res)
                if (res.data.err_code === "0000") {
                  this.$router.push({path:'/peopleManagement'});
                  Toast({mes: '修改成功！', timeout: 1000});
                } else {
                  Toast({mes: res.data.err_msg, timeout: 1000});
                }
              }).catch(err => {
                console.log(err)
              })
            }else {
              this.$store.dispatch('getDatas',{
                states:true,
                msg:'未知错误，请联系客服'
              })
              return false;
            }
          }

        }
      }
    }
</script>

<style scoped lang="scss">
.addPeople{
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
    .button{
      padding: 0 .3rem;
      &>button{
        width: 100%;
        height: .78rem;
        line-height: .78rem;
        background-color: #ff6633;
        color: #ffffff;
        border-radius: 8px;
        font-size: .3rem;
        border: none;
      }

    }
  /*  .message{
      margin-top: .7rem;
      padding-left: .3rem;
      font-size: .28rem;
      color: #333333;
      &>p{
        &>em{
          color: #ff6633;
        }
      }
    }*/
  }
  .footer {
    font-size: .2rem;
    color: #bbbbbb;
    width: 100%;
    position: absolute;
    bottom: .2rem;
    & > span {
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
  .addPeople{
    .container{
      .yd-cell-item{
        height: 1.2rem;
      }
      .yd-cell-left{
        width: 1.5rem;
      }
      .yd-cell-right{
        padding-left: .6rem;
      }
      .yd-cell-right select{
        margin-left: 0;
        color: #333333;
      }
      .yd-cell-item:not(:last-child):after{
        border-bottom: 1px solid #e8e8e8;
      }
      .yd-cell:after{
        border-bottom: none;
      }
    }
  }
</style>
