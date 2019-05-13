/*
* Author: 阿甘
* Email:519983770@qq.com
*前台点餐
*/
<template>
  <div class="role-list">
    <div class="role-list-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/store/list' }" style="font-size: 17px;">管理平台</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">角色管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="role-list-search">
        <SearchForm :searchData="searchData" ref="searchBox" @handleSubmit="handleSearch" style="display:inline-block"></SearchForm>
        <el-button type="primary" icon="el-icon-plus" @click="addRole()" style="height: 40px">添加角色</el-button>
      </div>
      <div class="role-list-table">
        <el-table v-loading="loading" :data="list" style="width:98%;left: 1%" @row-click="clickRow" border stripe ref="moviesTable">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="角色ID" align="center"></el-table-column>
          <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
          <el-table-column prop="roleDesc" label="角色描述" align="center"></el-table-column>
          <el-table-column width="90px" prop="status" label="角色状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===1" type="success">启用</el-tag>
              <el-tag v-else type="danger">停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column width="270" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id,scope.row.roleName)">删除</el-button>
              <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button size="mini" type="danger" v-if="scope.row.status===1" @click="enableDevice(scope.row.id,2)">停用</el-button>
              <el-button size="mini" type="primary" v-if="scope.row.status===2" @click="enableDevice(scope.row.id,1)">启用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="role-list-page">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="total">
        </el-pagination>
      </div>
      <AddRole :show.sync="addShow" ></AddRole>
      <EditRole :show.sync="editShow" :id.sync="id"></EditRole>
    </div>
  </div>
</template>

<script>
  import SearchForm from "../common/SearchForm";
  import AddRole from "./AddRole";
  import EditRole from "./EditRole";

  import { mapState } from "vuex";
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";

  const searchData = [
    {
      name: "角色名称",
      type: "input",
      placeholder: "请输入角色名称",
      key: "roleName"
    },
  ];
  export default {
    components: {
      SearchForm,
      AddRole,
      EditRole
    },
    computed: {
      ...mapState("role", {
        total: state => state.total,
        list: state => state.list
      })
    },
    data() {
      return {
        loading: true,
        currentPage: 1,
        addShow:false,
        editShow:false,
        id:"",
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
          roleName:this.filters.roleName,currentPage: this.currentPage });

        //发送查询短信统计请求
        API.POST(URL.ROLE_LIST, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.loading = false;
              this.$store.dispatch("role/list",res);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      addRole() {
        this.addShow = true;
      },
      handleDelete(id,name) {
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,id: id});

        swal({
          title: "确定？",
          text: "你确定要删除: " + name + "  角色吗？",
          icon: "warning",
          buttons: true,
          dangerMode: true
        }).then(willDelete => {
          if (willDelete) {
            //删除角色
            API.POST(URL.ROLE_DELETE, param)
              .then(res => {
                if (res.result.retCode === 0) {
                  swal({
                    title: "已删除",
                    text: "删除角色成功",
                    icon: "success",
                    button: "确认"
                  }).then(() => {
                    console.log('unbindDevice');
                    this.refresh();
                  });
                }
              })
              .catch(err => {
                //this.confirm=false;
                if(err.response.status === 400)
                {
                  this.$message.error('输入错误，设备编号只包含数字！');
                }else{
                  this.$message.error('系统正在升级中，请联系管理员！');
                }
              });
          }
        })
      },
      handleEdit(id){
        this.id = id;
        this.editShow = true;
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
  .role-list
    position: relative;
    width 100%
    height 100%
    .role-list-content
      position absolute
      width 98%
      height 100%
      left 1%
      .panel-heading
        position relative
        top 20px
      .role-list-search
        position: relative;
        top 40px
        display flex
        flex-direction row
        flex-wrap wrap
      .role-list-table
        position relative
        width 100%
        top 50px
      .role-list-page
        position relative
        top 80px
        text-align center
</style>
