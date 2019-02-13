<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple logo"><img src="../assets/msg/logo.jpg" alt="logo加载中..."></div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">
            <h2>优品网商品管理后台</h2>
          </div>
        </el-col>
        <el-col :span="1">
          <div @click.prevent="login()" class="grid-content bg-purple"><a href="#">退出 <i class="el-icon-error"></i></a></div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
    <el-footer class="footer">Copyright ©2013-2019 优品网商品管理后台</el-footer>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      login() {
        this.$router.push('login')
      }
    },
  }
</script>

<style>
  .container {
    height: 100%;
    /* background-color: #B3C0D1; */
  }

  .logo img {
    width: 200px;
    height: 60px;
  }

  .header {
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 30px;
    height: 30px!important;
    font-size: 12px;
    font-weight: 700;
  }

  .aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

.main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>
