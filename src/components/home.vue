<template>
  <el-container class="container">
    <el-header class="header">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="3">
          <div class="grid-content bg-purple logo"><img @click="gotoHome()" src="../assets/msg/logo.png" alt="logo加载中..."></div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <!-- <h2>优品网商品管理后台</h2> -->
          </div>
        </el-col>
        <el-col :span="4">
          <div class="userinfo">欢迎 <span>{{ userInfo }}</span>，<a href="#" @click.prevent="loginout()"> 退出系统 <i class="el-icon-error"></i></a></div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 菜单 -->
        <el-menu default-active="1" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
          unique-opened router>
          <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="user"><i class="el-icon-caret-right"></i>用户列表</el-menu-item>
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-caret-right"></i>角色列表</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-caret-right"></i>权限列表</el-menu-item>
          </el-submenu>
          <!-- 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-caret-right"></i>商品列表</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-caret-right"></i>商品分类</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-caret-right"></i>商品分类</el-menu-item>
          </el-submenu>
          <!-- 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-caret-right"></i>订单列表</el-menu-item>
          </el-submenu>
          <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-caret-right"></i>数据统计</el-menu-item>
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
        userInfo: '管理员',
      }
    },
    // 验证是否有正确token值，如果没有则跳转回login进行登陆
    created() {
      if (!localStorage.getItem('token')) {
        this.$router.push('login')
      }
    },
    mounted() {
      this.getUser();
    },
    methods: {
      // 退出方法
      loginout() {
        // 删除保存的token
        localStorage.clear();
        // 跳转到login页面
        this.$router.push('login');
        this.$message.success('退出登陆成功！');
      },
      gotoHome() {
        this.$router.push('index');
      },
      getUser() {
        // 定义请求头token
        const AUTH_TOKEN = localStorage.getItem("token");
        // 获取保存的token值
        this.$axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
        // 将用户id转换为数字类型
        const Id = Number(localStorage.getItem('userid'));
        // 携带用户id请求用户信息，将用户名显示到欢迎后
        this.$axios.get(`users/${Id}`).then((res) => {
          // console.log(res);
          this.userInfo = res.data.data.username;
        });
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
    cursor: pointer;
  }

  .header,
  .header a {
    /* background-color: #E6A23C; */
    color: #333;
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
    background-color: #545c64;
    color: #fff;
  }

  .el-menu {
    border-right: none;
  }

  .userinfo {
    font-size: 14px;
  }

  .userinfo span {
    color: #409EFF;
  }

  .main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>
