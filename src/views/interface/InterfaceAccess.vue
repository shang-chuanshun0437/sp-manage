/*
* Author: 阿甘
* Email:519983770@qq.com
*前台点餐
*/
<template>
  <div class="interface-access-list">
    <div class="interface-access-list-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">管理平台</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">接口访问统计</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="interface-access-list-search">
        <SearchForm :searchData="searchData" ref="searchBox" @handleSubmit="handleSearch" style="display:inline-block"></SearchForm>
        <el-button class="clearQuery" @click="clearQuery">置空</el-button>
      </div>
      <div class="interface-access-list-table">
        <el-table v-loading="loading" :data="list" style="width:98%;left: 1%" @row-click="clickRow" border stripe ref="moviesTable">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="90px" prop="id" label="ID" align="center"></el-table-column>
          <el-table-column width="140px" prop="userPhone" label="访问账号" align="center"></el-table-column>
          <el-table-column width="140px" prop="ip" label="IP" align="center"></el-table-column>
          <el-table-column width="280px" prop="interfaceName" label="接口名" align="center"></el-table-column>
          <el-table-column width="180px" prop="url" label="URL" align="center"></el-table-column>
          <el-table-column width="90px" prop="interfaceCount" label="访问次数" align="center"></el-table-column>
          <el-table-column width="90px" prop="averageTime" label="平均耗时" align="center"></el-table-column>
          <el-table-column width="90px" prop="consumeTime" label="访问耗时" align="center"></el-table-column>
          <el-table-column width="90px" prop="status" label="访问状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===1" type="success">成功</el-tag>
              <el-tag v-else type="danger">失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="180px" prop="createTime" label="访问日期" align="center"></el-table-column>
          <el-table-column width="120px" prop="remark" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="interface-access-list-page">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total">
        </el-pagination>
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
      name: "接口名称",
      type: "input",
      placeholder: "请输入接口名称",
      key: "interfaceName"
    },
    {
      name: "访问状态",
      type: "select",
      key: "status",
      options: ["成功", "失败"]
    },
    {
      name: "开始时间",
      type: "date",
      placeholder: "请选择开始时间",
      key: "startTime"
    },
    {
      name: "结束时间",
      type: "date",
      placeholder: "请选择结束时间",
      key: "endTime"
    },
    {
      name: "平均耗时",
      type: "input",
      placeholder: "请输入平均耗时",
      key: "averageTime"
    },
    {
      name: "访问次数",
      type: "input",
      placeholder: "请输入访问次数",
      key: "interfaceCount"
    },
  ];
  export default {
    components: {
      SearchForm,
    },
    computed: {
      ...mapState("interfaceAccess", {
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
          interfaceName: "",
          status: "",
          startTime: "",
          endTime: "",
          averageTime: "",
          interfaceCount: "",
        }
      };
    },
    created() {

      this.refresh();
    },
    methods: {
      refresh() {
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,
          interfaceName:this.filters.interfaceName,interfaceCount:this.filters.interfaceCount,
          startTime:this.filters.startTime,endTime:this.filters.endTime,
          averageTime:this.filters.averageTime,status:this.filters.status,
          currentPage: this.currentPage });

        //发送查询接口耗时统计请求
        API.POST(URL.INTERFACE_ACCESS, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.loading = false;
              this.$store.dispatch("interfaceAccess/list",res);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },

      handleSearch(params) {
        console.log(params);
        this.filters=Object.assign({},params);
        if (this.filters.status == "成功") {
          this.filters.status = 1;
        } else if (this.filters.status == "失败") {
          this.filters.status = 2;
        }
        this.refresh();
      },
      clearQuery() {
        let params = {};
        this.filters = Object.assign({},params);
        this.refresh(params);
        this.$refs.searchBox.onClear();
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
  .interface-access-list
    position: relative;
    width 100%
    height 100%
    .interface-access-list-content
      position absolute
      width 98%
      height 100%
      left 1%
      .panel-heading
        position relative
        top 20px
      .interface-access-list-search
        position: relative;
        top 40px
        display flex
        flex-direction row
        flex-wrap wrap
      .interface-access-list-table
        position relative
        width 100%
        top 50px
      .interface-access-list-page
        position relative
        top 80px
        text-align center
</style>
