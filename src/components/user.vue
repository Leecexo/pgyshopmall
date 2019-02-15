<template>
  <!-- 右侧卡片容器 -->
  <el-card>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-input placeholder="请输入内容" v-model="query" class="search">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" plain>添加用户</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" class="userList">
      <el-table-column prop="id" label="#" width="80">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="210">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="210">
      </el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="220">
      </el-table-column>
      <el-table-column label="用户状态" width="120">
        <template>
          <el-switch v-model="mg_state" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template>
          <el-row>
            <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
            <el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
      :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        query: '',
        pagenum: 1,
        pagesize: 5,
        mg_state: true,
        tableData: [],

      }
    },
    created() {
      this.getOneData();
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // 首屏数据
      getOneData() {
        // 定义请求头token
        const AUTH_TOKEN = localStorage.getItem("token");
        // 获取保存的token值
        this.$axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
        // 发送数据请求
        this.$axios.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`).then((res) => {
          const { data: { data: { users }, meta: { msg, status } } } = res;
          if (status === 400) {
            this.$message.error(msg);
          };
          console.log(users);

          this.tableData = users;
        })
      }
    },
  }
</script>
<style>
  .search {
    width: 300px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .userList {
    margin-bottom: 15px;
  }
</style>
