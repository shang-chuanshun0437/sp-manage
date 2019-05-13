/*
* Author: 阿甘
* Email:519983770@qq.com
*/
<template>
  <div class="verify-code-list">
    <div class="verify-code-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/businessList' }" style="font-size: 17px;">管理平台</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">短信统计</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="verify-code-search">
        <SearchForm :searchData="searchData" @handleSubmit="handleSearch"></SearchForm>
      </div>
      <div class="verify-code-table">
        <el-table v-loading="loading" :data="list" @row-click="clickRow" border stripe ref="moviesTable">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="userPhone" label="用户账号" align="center"></el-table-column>
          <el-table-column prop="content" label="短信内容" align="center"></el-table-column>
          <el-table-column prop="createTime" label="发送日期" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="verify-code-page">
        <el-row>
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total">
          </el-pagination>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
  import SearchForm from "../common/SearchForm";
  import { mapState } from "vuex";
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  const searchData = [

    {
      name: "用户手机号",
      type: "input",
      placeholder: "请输入用户手机号",
      key: "userPhone"
    },
  ];
  export default {
    components: {
      SearchForm,
    },
    computed: {
      ...mapState("verifyCode", {
        total: state => state.total,
        list: state => state.list
      })
    },
    data() {
      return {
        loading: true,
        currentPage: 1,
        searchData: searchData,
        filters: {
          userPhone: "",
        }
      };
    },
    created() {

      this.refresh();
    },
    methods: {
      refresh() {
        //debugger
        console.log('refresh');
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,
          needPhone:this.filters.userPhone,currentPage: this.currentPage });

        //发送查询短信统计请求
        API.POST(URL.VERIFY_CODE_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.loading = false;
              this.$store.dispatch("verifyCode/list",res);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },

      handleSearch(params) {
        console.log(params);
        this.filters=Object.assign({},params);
        this.refresh();
      },
      clickRow(row){
        this.$refs.moviesTable.toggleRowSelection(row)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.refresh();
        console.log(`当前页: ${val}`);
      }
    }
  };
</script>

<style scoped lang="stylus" type="text/stylus">
  .verify-code-list
    position: relative;
    width 100%
    height 100%
    .verify-code-content
      position absolute
      width 98%
      height 100%
      left 1%
      .panel-heading
        position relative
        top 20px
      .verify-code-search
        position: relative;
        top 40px
        display flex
        flex-direction row
        flex-wrap wrap
      .verify-code-table
        position relative
        width 100%
        top 50px
      .verify-code-page
        position relative
        top 80px
        text-align center
</style>
