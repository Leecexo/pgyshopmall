<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple logo"><img src="../assets/msg/logo.png" alt="logo加载中..."></div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">
            <h2>优品网商品管理后台</h2>
          </div>
        </el-col>
        <el-col :span="1">
          <div @click.prevent="loginout()" class="grid-content bg-purple"><a href="#">退出 <i class="el-icon-error"></i></a></div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 菜单 -->
        <el-menu default-active="1" unique-opened router>
          <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="user"><i class="el-icon-tickets"></i>用户列表</el-menu-item>
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-tickets"></i>权限列表</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-tickets"></i>权限列表2</el-menu-item>
          </el-submenu>
          <!-- 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-tickets"></i>商品列表</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-tickets"></i>商品分类</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-tickets"></i>商品分类</el-menu-item>
          </el-submenu>
          <!-- 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-tickets"></i>订单列表</el-menu-item>
          </el-submenu>
          <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-tickets"></i>数据统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
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
    // 验证是否有正确token值，如果没有则跳转回login进行登陆
    created() {
      if (!localStorage.getItem('token')) {
        this.$router.push('login')
      }
    },
    methods: {
      // 退出方法
      loginout() {
        // 删除保存的token
        localStorage.clear();
        // 跳转到login页面
        this.$router.push('login');
        this.$message.success('退出登陆成功！');
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

  .header,
  .header a {
    background-color: #545C64;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }

  .footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 30px;
    height: 30px !important;
    font-size: 12px;
    font-weight: 700;
  }

  .aside {
    color: #333;
  }

  .main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>
