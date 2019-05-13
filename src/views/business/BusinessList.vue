/*
 * Author: 阿甘
 * Email:519983770@qq.com
 *餐桌管理
 */
<template>
  <div class="menu-list">
    <div class="menu-list-content">
      <div class="panel-heading">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/user/businessList' }" style="font-size: 17px;">管理平台</el-breadcrumb-item>
          <el-breadcrumb-item style="font-size: 17px;">商家管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="menu-list-search">
        <SearchForm :searchData="searchData" @handleSubmit="handleSearch"></SearchForm>
        <el-button type="primary" style="height: 40px" icon="el-icon-plus" @click="addBusiness()">新增商家</el-button>
      </div>
      <div class="menu-list-table">
        <el-table v-loading="loading" :data="list" @row-click="clickRow" border stripe ref="moviesTable">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="120" prop="userPhone" label="商家账号" align="center"></el-table-column>
          <el-table-column width="180" prop="userName" label="商家名称" align="center"></el-table-column>
          <el-table-column width="100" prop="shopTotal" label="最多可接入" align="center"></el-table-column>
          <el-table-column width="100" prop="shopCount" label="已接入" align="center"></el-table-column>
          <el-table-column width="100px" prop="payType" label="支付方式" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.payType == 1">前台支付</span>
              <span v-else-if="scope.row.payType == 2" >在线支付</span>
            </template>
          </el-table-column>
          <el-table-column width="180" prop="createTime" label="添加日期" align="center"></el-table-column>
          <el-table-column width="180" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.userPhone)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="menu-list-page">
        <el-row style="text-align:center;margin-top:15px;">
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
    name: "商家账号",
    type: "input",
    placeholder: "请输入商家账号",
    key: "businessPhone"
  },

];
export default {
  components: {
    SearchForm,
  },
  computed: {
    ...mapState("business", {
      total: state => state.total,
      list: state => state.list
    }),

  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      searchData: searchData,
      filters: {
        businessPhone: "",
      },
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    refresh() {
      console.log('refresh');
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,
        businessPhone: this.filters.businessPhone , currentPage: this.currentPage });

      //查询商家列表
      API.POST(URL.QUERY_USER_URL, param)
        .then(res => {
          if (res.result.retCode === 0) {
            this.loading = false;
            this.$store.dispatch("business/list",res);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('后台正在升级，请联系管理员！');
        });
    },

    handleSearch(params) {
      this.filters=Object.assign({},params);
      this.refresh();
    },
    addBusiness() {
      this.$router.push("/user/addBusiness");
    },

    clickRow(row){
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    handleEdit(row) {
      this.$router.push({path:"/user/editBussiness",
        query:{userPhone: row.userPhone,shopTotal: row.shopTotal}});
    },
    handleIntoStore(storeId) {
      this.$router.push({path:"/user/store/list/storeInfo",query:{storeId: storeId}});
    },
    handleDelete(phone) {
      let user = JSON.parse(window.localStorage.getItem('access-user'));
      var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,
        needDeletePhone: phone});

      swal({
        title: "删除商家",
        text: "您确定要删除: " + phone + " 吗？",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          //删除商家
          API.POST(URL.DELETE_USER_URL, param)
            .then(res => {
              if (res.result.retCode === 0) {
                swal({
                    title: "已删除",
                    text: "删除商家成功",
                    icon: "success",
                    button: "确认"
                  }).then(() => {
                    this.refresh();
                  });
                }else{
                this.$message.error('删除失败，请重新操作！');
              }
            })
            .catch(err => {
              this.$message.error('系统正在升级中，请联系管理员！');
            });
          }
        })
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
  .menu-list
    position: relative;
    width 100%
    height 100%
    .menu-list-content
      position absolute
      width 98%
      height 100%
      left 1%
      .panel-heading
        position relative
        top 20px
      .menu-list-search
        position: relative;
        top 40px
        display flex
        flex-direction row
        flex-wrap wrap
      .menu-list-table
        position relative
        width 100%
        top 50px
      .menu-list-page
        position relative
        top 50px
        text-align center
</style>
