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
    <el-input placeholder="请输入内容" v-model="query" class="search" clearable @clear="clearInputVal()">
      <el-button slot="append" icon="el-icon-search" @click="gotosearch()"></el-button>
    </el-input>
    <el-button type="success" plain @click="addUserShow()">添加用户</el-button>
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
        <template slot-scope="scope">
          <!-- frmDate是main.js中过滤器的名字  -->
          {{scope.row.create_time|frmDate}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="stateEdit(scope.row.id)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="dialogFormVisibleEdit = true" type="primary" icon="el-icon-edit" circle size="mini"
              plain></el-button>
            <el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form label-position="left" label-width="80px" :model="formData" :rules="rules">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleAdd = false">确 定</el-button>
        <!-- <el-button type="primary" @click="userAdd()">确 定</el-button> -->
      </div>
    </el-dialog>
    <!-- 编辑用户 信息弹窗 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form label-position="left" label-width="80px" :model="formEditData" :rules="rules">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formEditData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formEditData.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formEditData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formEditData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="stateEdit()">保 存</el-button>
        <!-- <el-button type="primary" @click="userAdd()">确 定</el-button> -->
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        // 搜索框 初始值
        query: '',
        // 数据总量 初始值
        total: -1,
        // 当前分页 初始值
        pagenum: 1,
        // 每页数据量 初始值
        pagesize: 2,
        // 用户状态初始值
        mg_state: true,
        // 用户列表 数据初始值
        tableData: [],
        // 添加用户弹窗页面初始值
        formData: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        // 编辑用户 初始值
        formEditData: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        // 添加用户 弹窗初始值
        dialogFormVisibleAdd: false,
        // 编辑用户 弹窗初始值
        dialogFormVisibleEdit: false,
        // 添加用户表单验证
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入用户密码', trigger: 'blur' }
          ],

        },
      }
    },
    created() {
      this.getOneData();
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagenum = 1;
        this.pagesize = val;
        this.getOneData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val;
        this.getOneData();
      },
      // 搜索功能
      gotosearch() {
        this.pagenum = 1;
        this.getOneData();
      },
      // 清空用户
      clearInputVal() {
        this.pagenum = 1;
        this.getOneData();
      },
      // 添加用户-展示
      addUserShow() {
        this.dialogFormVisibleAdd = true;
      },
      // 添加用户-post
      // userAdd() {
      //   this.$axios.post(`users`).then((res) => {

      //   });
      // },
      // 修改用户状态
      stateEdit(uId) {
        this.mg_state = !this.mg_state;
        this.$axios.put(`users/${uId}/state/${this.mg_state}`).then((res) => {
          // console.log(res);
          this.$message.success("修改成功！");
        });
      },
      // 修改用户信息
      editUser(userId) {
        console.log(userId);

      },
      // 首屏数据
      getOneData() {
        // 定义请求头token
        const AUTH_TOKEN = localStorage.getItem("token");
        // 获取保存的token值
        this.$axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
        // 发送数据请求
        this.$axios.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`).then((res) => {
          const { data: { data: { total, users }, meta: { msg, status } } } = res;
          if (status === 400) {
            this.$message.error(msg);
          };
          // console.log(res);
          this.tableData = users;
          this.total = total;
        })
      },
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
