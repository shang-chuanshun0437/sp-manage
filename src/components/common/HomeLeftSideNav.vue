<template>
 <!-- 首页左侧导航栏 -->
  <div class="home-left">
    <div class="left-nav">
      <el-menu :default-active="$route.path" router style="height:100%">
        <el-menu-item index = "/user/businessList" style = "font-size: 16px;">
          <i class="el-icon-ali-LC_icon_user_group_line"></i>
          <span slot="title">商家管理</span>
        </el-menu-item>
        <el-menu-item index = "/report" style = "font-size: 16px;">
          <i class="el-icon-ali-navicon-dxgl"></i>
          <span slot="title">在线报表</span>
        </el-menu-item>
        <el-menu-item index = "/verifyCode" style = "font-size: 16px;">
          <i class="el-icon-ali-navicon-dxgl"></i>
          <span slot="title">短信统计</span>
        </el-menu-item>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span style = "font-size: 16px;">系统管理</span>
          </template>
          <el-menu-item index="/role/list" style = "font-size: 15px;">角色管理</el-menu-item>
          <el-menu-item index="/role/userRoleList" style = "font-size: 15px;">管理员管理</el-menu-item>
          <el-menu-item index="/interface/access/list" style = "font-size: 15px;">接口访问统计</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="home-left-router">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeLeftSideNav',
  data () {
    return {
      username: 'Weflcome'
    }
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
  .home-left
    position: relative;
    display flex
    flex-direction row
    height: 100%;
    width 100%;
    .left-nav
      position relative;
      flex 0 0 205px;
      .el-menu-item.is-active
        background-color: rgb(240, 243, 245) !important;
    .home-left-router
      position relative
      flex 0 10 2000px
      height 100%
</style>
