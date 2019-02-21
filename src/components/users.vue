<template>
  <!-- 右侧卡片容器 -->
  <el-card>
    <crumbs val1="用户管理" val2="用户列表"></crumbs>
    <!-- 搜索 -->
    <el-input placeholder="请输入内容" v-model="query" class="search" clearable @clear="clearInputVal()">
      <el-button slot="append" icon="el-icon-search" @click="gotosearch()"></el-button>
    </el-input>
    <el-button type="primary" plain @click="addUserShow()">添加用户</el-button>
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
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="stateEdit(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="editUsershow(scope.row)" type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
            <el-button @click="deleteUser(scope.row)" type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
            <el-button @click="statusUser(scope.row)" type="success" icon="el-icon-check" circle size="mini" plain></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
      :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
        <!-- <el-button type="primary" @click="dialogFormVisibleAdd = false">确 定</el-button> -->
        <el-button type="primary" @click="userAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 信息弹窗 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit" @close="userClose()">
      <el-form label-position="left" label-width="80px" :model="formData" :rules="rules">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser(formData.id)">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户权限 信息弹窗 -->
    <el-dialog title="编辑用户权限" :visible.sync="dialogFormVisibleStatus">
      <el-form :model="formData" label-width="80px" label-position="left">
        <el-form-item label="用户名称">{{ usersName }}</el-input>
        </el-form-item>
        <el-form-item label="用户权限">
          <el-select v-model="userStateval">
            <!-- 默认第一个为 请选择 -->
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option v-for="(item) in routsList" :label="item.roleName" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleStatus = false">取 消</el-button>
        <el-button type="primary" @click="editUserStatus(formData)">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        query: '',// 搜索框 初始值
        total: -1, // 数据总量 初始值
        pagenum: 1, // 当前分页 初始值
        pagesize: 10, // 每页数据量 初始值
        mg_state: true, // 用户状态初始值
        tableData: [],// 用户列表 数据初始值
        formData: {// 添加/编辑用户弹窗页面初始值
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        dialogFormVisibleAdd: false,  // 添加用户 弹窗初始值
        dialogFormVisibleEdit: false,  // 编辑用户 弹窗初始值
        dialogFormVisibleStatus: false,  // 编辑用户权限 弹窗初始值
        usersName: "", // 用户权限初始值
        userStateval: -1, //用户权限列表 初始值
        routsList: [],// 用户权限中的列表 初始值
        rules: { // 添加用户表单验证
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
      // 编辑用户的close事件
      userClose() {
        this.getOneData();
      },
      handleSizeChange(val) {
        this.pagenum = 1;
        this.pagesize = val;
        this.getOneData();
      },
      handleCurrentChange(val) {
        this.pagenum = val;
        this.getOneData();
      },
      // 修改用户权限-展示
      async statusUser(user) {
        this.formData = user;
        this.dialogFormVisibleStatus = true; // 展示修改权限框
        this.usersName = user.username; // 给用户名位置赋值
        // 获取所有角色值并填充到下拉菜单中
        const res = await this.$axios.get(`roles`);
        const { data: { data, meta: { msg, status } } } = res;
        // data是个数组，里面是对象
        if (status === 200) {
          this.routsList = data;
        }
        // 根据用户id获取当前用户的 角色id值
        const res2 = await this.$axios.get(`users/${user.id}`);
        const status2 = res2.data.meta.status;
        if (status2 === 200) {
          this.userStateval = res2.data.data.rid;
        }

      },
      // 修改用户权限-提交
      async editUserStatus(user) {
        const res = await this.$axios.put(`users/${user.id}/role`, { rid: this.userStateval });
        const { data: { data, meta: { msg, status } } } = res;
        if (status === 200) {
          this.dialogFormVisibleStatus = false; // 隐藏 修改权限框
          this.$message.success(msg);
        }
      },// 搜索功能
      gotosearch() {
        this.pagenum = 1;
        this.getOneData();
      },
      // 清空用户搜索框
      clearInputVal() {
        this.pagenum = 1;
        this.getOneData();
      },
      // 添加用户-展示
      addUserShow() {
        this.dialogFormVisibleAdd = true;
        this.formData = {};
      },
      // 添加用户-post
      async userAdd() {
        const res = await this.$axios.post(`users`, this.formData);
        const { data: { data, meta: { msg, status } } } = res;
        if (status === 201) {
          this.$message.success(msg);
          this.dialogFormVisibleAdd = false;
          this.pagenum = 1;
          this.getOneData();
        } else if (status === 400) {
          this.$message.error(msg);
        }
      },
      // 修改用户状态
      async stateEdit(user) {
        const res = await this.$axios.put(`users/${user.id}/state/${user.mg_state}`);
        const { data: { data, meta: { msg, status } } } = res;
        if (status === 200) {
          this.$message.success("修改成功！");
          // 刷新当前页
          this.getOneData();
        } else if (status === 404) {
          this.$message.error("服务器繁忙请稍后再试！");
        }

      },
      // 修改用户信息-展示
      editUsershow(user) {
        // 展示编辑弹窗
        this.dialogFormVisibleEdit = true;
        // 展示当前点击用户信息
        this.formData = user;
      },
      // 修改用户信息
      async editUser(userid) {
        const res = await this.$axios.put(`users/${userid}`, this.formData);
        const { data: { data, meta: { msg, status } } } = res;
        if (status === 200) {
          this.$message.success(msg);
          // 关闭弹窗
          this.dialogFormVisibleEdit = false;
          // 刷新当前页 在close中有，此处可以不用刷新页面
          // this.getOneData();
        } else if (status === 404) {
          this.$message.error("服务器繁忙请稍后再试！");
        }
      },
      // 删除用户
      deleteUser(user) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$axios.delete(`users/${user.id}`);
          const { data: { data, meta: { msg, status } } } = res;
          // console.log(res);
          if (status === 200) {
            this.$message.success(msg);
            // 关闭弹窗
            this.dialogFormVisibleEdit = false;
            // 刷新当前页
            this.pagenum = 1;
            this.getOneData();
          } else if (status === 404) {
            this.$message.error("服务器繁忙请稍后再试！");
          }

        }).catch(() => {
          this.$message.info('已取消删除!');
        });
      },
      // 加载首屏数据
      async getOneData() {
        // 发送数据请求
        const res = await this.$axios.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
        const { data, meta: { msg, status } } = res.data;
        if (status === 400) {
          this.$message.error(msg);
          this.$router.push('login');
        } else if (status === 404) {
          this.$message.error("服务器繁忙请稍后再试！");
        } else if (status === 200) {
          const { total, users } = data;
          this.tableData = users;
          this.total = total;
        };
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
