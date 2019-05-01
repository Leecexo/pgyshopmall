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
        <el-menu :default-active="$route.name" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
          unique-opened router :data="menuData">
          <!-- 菜单列表 -->
          <el-submenu :index="i+''" v-for="(item,i) in menuData" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2,i) in item.children"><i class="el-icon-caret-right"></i>{{item2.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- 菜单列表 end -->
      </el-aside>
      <el-main class="main">
        <!-- 主体部分 -->
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
        menuData: [],
      }
    },
    created() {
      if (!localStorage.getItem('token')) {
        this.$router.push('login')
      };

    },
    mounted() {
      this.getUser();
      this.getmenu();
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
      // 跳转到首页组件
      gotoHome() {
        this.$router.push('index');
      },
      // 展示当前登陆用户名
      async getUser() {
        // 将用户id转换为数字类型
        const Id = Number(localStorage.getItem('userid'));
        // 携带用户id请求用户信息，将用户名显示到欢迎后
        const res = await this.$axios.get(`users/${Id}`);
        this.userInfo = res.data.data.username;
      },
      // 读取当前用户的权限菜单
      async getmenu() {
        const res = await this.$axios.get(`menus`);
        // console.log(res);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.menuData = data;
        } else {
          this.$message.error('获取数据失败，请稍后重试！');
        }

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
