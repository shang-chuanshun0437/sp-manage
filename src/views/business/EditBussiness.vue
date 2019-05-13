/*
* Project: f:\2017Project\game-cms
* Copyright (c) 2018 SN
*/

<template>
  <div>
    <div class="headNav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/user/businessList' }" style="font-size: 17px;">商家管理</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 17px;">新增商家</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
        <el-form-item  label="商家账号" prop="businessPhone">
          <el-col :span="12">
            <el-input v-model="ruleForm.businessPhone" :disabled="true" placeholder="请输入商家账号"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="可接入店铺数量" prop="shopTotal" label-width="180px">
          <el-col :span="12">
            <el-input v-model="ruleForm.shopTotal" placeholder="请输入店铺数量"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div >
      <el-button type="primary" :disabled="confirm"  @click.native.prevent="handleEdit" class="confirmBtn">确认修改</el-button>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";

  export default {
    data: function() {
      return {
        confirm:true,
        ruleForm:{
          businessPhone: "",
          shopTotal: ""
        },
        rules: {
          businessPhone: [
            { required: true, message: "请填写商家账号", trigger: "blur" }
          ],
          shopTotal: [
            { required: true, message: "请填写可接入店铺数量", trigger: "blur" }
          ]
        }
      };
    },
    methods: {
      handleEdit() {
        let user = JSON.parse(window.localStorage.getItem('access-user'));
        var param = Object.assign({}, {userPhone: user.userPhone , token: user.token ,
          needUpdatePhone: this.ruleForm.businessPhone , shopTotal: this.ruleForm.shopTotal});

        //更新商家
        API.POST(URL.UPDATE_USER_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.$router.go(-1);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error('后台正在升级，请联系管理员！');
          });
      },
    },
    beforeUpdate() {
      if( this.ruleForm.businessPhone != '' & this.ruleForm.shopTotal != '' )
      {
        this.confirm = false;
      }
      else{
        this.confirm = true;
      }
    },
    created() {
      this.ruleForm.businessPhone = this.$route.query.userPhone;
      this.ruleForm.shopTotal = this.$route.query.shopTotal;
    }
  };
</script>

<style scoped>
  .headNav{
    position: relative;
    top: 20px;
    left: 20px;
    width: 380px;
  }
  .content{
    position: relative;
    top: 40px;
    width: 90%;
    left: 20px;
  }
  .confirmBtn{
    position: relative;
    top: 70px;
    width: 480px;
    left: 30px;
  }
  .el-icon-plus.avatar-uploader-icon,
  .avatar-uploader .avatar {
    position: relative;
    width: 100px;
    height: 100px;
    line-height: 100px;
    border: 1px solid black;
    top: 10px;
    left: 20px;
  }

</style>
