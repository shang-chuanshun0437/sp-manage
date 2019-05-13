<template>
 <!-- 头部区域 -->
 <div v-if="show" class="top-head">
   <div class="img">
     <img style="width: 40px;height: 40px;" src="../../assets/logo.png">
   </div>
   <div class="description">
      <span style="color: white">云扫码点餐 · 管理平台</span>
   </div>
   <div class="basic-info">
     <el-dropdown>
      <span style = "color:#ffffff;font-size: 15px;" class="el-dropdown-link">{{userPhone}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
       <el-dropdown-menu slot="dropdown">
         <el-dropdown-item @click.native = "userInfo">基本资料</el-dropdown-item>
         <el-dropdown-item @click.native = "logout">退出登录</el-dropdown-item>
       </el-dropdown-menu>
     </el-dropdown>
   </div>
   <ChangePwd :show.sync="pwdShow"></ChangePwd>
 </div>
</template>

<script>
  import { mapState } from "vuex";
  import ChangePwd from "../../views/account/ChangPwd";
  export default {
    name: 'Top',
    components: {
      ChangePwd,
    },
    data () {
      return {
        pwdShow: false,
        //userPhone: 'Welcome',
      }
    },
    created() {
      //let user = JSON.parse(window.localStorage.getItem('access-user'));
      //this.userPhone = user.userPhone;
    },
    methods:{
      logout(){
        this.$router.push('/login');
      },
      changPassword(){
        this.pwdShow = true;
      },
      userInfo(){
        this.$router.push('/account/private');
      },
    },
    computed: {
      ...mapState("top", {
        show: state => state.show,
      }),
      ...mapState("login", {
        userPhone: state => state.userPhone,
      }),
    },
}
</script>

<style scoped lang="stylus" type="text/stylus">
  .top-head
    position relative
    display table
    width 100%
    height 60px
    background-color: #20a0ff;
    .img
      position: absolute;
      top: 10px;
      left: 60px;
      width: 40px;
      height: 40px;
    .description
      position relative;
      left: 150px;
      top: 20px;
      width: 240px;
    .info
      position: absolute;
      width 580px
      top: 0px;
      left: 140px;
    .basic-info
      position: absolute;
      width 180px
      top: 20px;
      right: 60px;
      .el-menu-item:hover
        background-color: #ffffff !important;
      .el-menu-item.is-active
        background-color: #00b43c !important;
      .el-menu-item.focus
        background-color: rgb(43, 127, 247) !important;

</style>
