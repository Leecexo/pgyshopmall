<template>
  <el-card>
    <!-- 面包屑导航 -->
    <crumbs val1="权限管理" val2="角色列表"></crumbs>
    <!-- 添加按钮 -->
    <el-button type="primary" plain class="addrole" @click="addRoleshow()">添加角色</el-button>
    <!-- 表单部分 -->
    <el-table :data="roleData" style="width: 100%">
      <!-- 下拉内容 -->
      <el-table-column type="expand" label="#" width="80px">
        <template slot-scope="scope">
          <el-row v-for="(item1) in scope.row.children" :key="item1.id">
            <el-col :span="4" class="rowMar">
              <el-tag closable @close="deleteOneRole(scope.row,item1.id)">{{ item1.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2) in item1.children" :key="item2.id">
                <el-col :span="4" class="rowMar">
                  <el-tag closable type="success" @close="deleteOneRole(scope.row,item2.id)">{{ item2.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20" class="rowMar">
                  <el-tag closable type="warning" v-for="(item3) in item2.children" :key="item3.id" class="sjtag"
                    @close="deleteOneRole(scope.row,item3.id)">{{
                    item3.authName
                    }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length==0" class="lableDefu">
            <span>未分配权限</span>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="80px"></el-table-column>
      <el-table-column prop="roleName" label="角色名" width="180px">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180px">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="editRoleshow(scope.row)" type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
            <el-button @click="deleteRoleshow(scope.row)" type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
            <el-button @click="statusRolesshow(scope.row)" type="success" icon="el-icon-check" circle size="mini" plain></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色 弹窗 -->
    <el-dialog title="添加角色" :visible.sync="dialogTableVisibleRoleAdd" width="30%">
      <el-form :model="roleAddData" label-position="left" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="roleAddData.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleAddData.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisibleRoleAdd = false">取 消</el-button>
        <el-button type="primary" @click="RoleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色信息弹窗 -->
    <el-dialog title="编辑角色" :visible.sync="dialogTableVisibleRoleEdit" width="30%">
      <el-form :model="roleEditdData" label-position="left" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="roleEditdData.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleEditdData.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisibleRoleEdit = false">取 消</el-button>
        <el-button type="primary" @click="RoleEdit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除角色信息 弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleRoleDelete" width="30%" :model="roleEditdData">
      <i class="el-icon-warning" style="color:#E6A23C;font-size: 30px;vertical-align: middle;"></i><span>&nbsp;&nbsp;此操作将永久删除该文件,
        是否继续?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleRoleDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteRole()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限 弹窗 -->
    <el-dialog title="分配权限" :visible.sync="dialogTableVisibleRoleEditrole">
      <el-tree :data="treeData" :props="props" node-key="id" :default-expanded-keys="arrExpanded" :default-checked-keys="arrChecked"
        ref="treeDom" show-checkbox>
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisibleRoleEditrole = false">取 消</el-button>
        <el-button type="primary" @click="editRoleright()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        roleData: [], // 角色列表 初始值数组
        roleAddData: { // 添加角色列表 初始值对象
          roleName: '',
          roleDesc: ''
        },
        roleEditdData: { // 编辑角色列表 初始值对象
          roleName: '',
          roleDesc: ''
        },
        // RoleList: [], // 角色列表
        dialogTableVisibleRoleAdd: false, // 添加角色弹窗 初始值
        dialogTableVisibleRoleEdit: false, // 编辑角色弹窗 初始值
        dialogVisibleRoleDelete: false, // 删除角色弹窗 初始值
        dialogTableVisibleRoleEditrole: false, // 编辑角色树形弹窗  初始值
        treeData: [],// 分配权限树形弹窗 初始数据
        arrExpanded: [], // 分配权限默认展开的数据
        arrChecked: [], // 分配权限默认选中的数据
        props: { // 分配权限树形弹窗 配置数据
          label: 'authName',
          children: 'children',
        },
        Roleinfo: [],// 当前角色信息
      }
    },

    created() {
      // 加载最新列表
      this.getRoleData();
      // 加载单个权限的内容
      this.getRoleDataInof();
    },
    methods: {
      // 加载角色列表
      async getRoleData() {
        const res = await this.$axios.get(`roles`);
        // console.log(res);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.roleData = data;
        }
      },
      // 添加角色
      async RoleAdd() {
        const res = await this.$axios.post(`roles`, this.roleAddData);
        // console.log(res);
        const { data, meta: { msg, status } } = res.data;
        if (status === 201) {
          this.getRoleData();
          this.$message.success(msg);
          this.dialogTableVisibleRoleAdd = false;
          this.roleAddData = {};
        } else if (status === 400) {
          this.$message.error(msg);
        } else {
          this.$message.error("服务器繁忙请稍后再试！");
        }
      },
      // 显示添加角色弹窗
      async addRoleshow() {
        this.roleAddData = {};
        this.dialogTableVisibleRoleAdd = true;
      },
      // 显示编辑角色 弹窗并读取当前角色数据
      async editRoleshow(role) {
        // console.log(role);
        this.roleEditdData = role;
        this.dialogTableVisibleRoleEdit = true;
      },
      // 保存编辑内容
      async RoleEdit() {
        const role = this.roleEditdData;
        const res = await this.$axios.put(`roles/${role.id}`, this.roleEditdData);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.getRoleData();
          this.$message.success("修改成功！");
          this.dialogTableVisibleRoleEdit = false;
        } else {
          this.$message.error("修改失败，请稍后再试！");
        }
      },
      // 删除角色弹窗
      deleteRoleshow(role) {
        this.roleEditdData = role;
        this.dialogVisibleRoleDelete = true;
      },
      // 删除角色
      async deleteRole() {
        const role = this.roleEditdData;
        const res = await this.$axios.delete(`roles/${role.id}`);
        const { meta: { msg, status } } = res.data;
        if (status === 200) {
          this.getRoleData();
          this.$message.success(msg);
          this.dialogVisibleRoleDelete = false;
        } else {
          this.$message.success("删除失败！");
        }

      },
      // 获取每个角色的权限详情
      async getRoleDataInof() {
        const res = await this.$axios.get(`roles`);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.roleData = data;
        } else {
          this.$message.error("获取失败，请稍后再试！");
        }
      },
      // 在展开列表中删除某个角色的某个/某类权限
      async deleteOneRole(role, rightId) {
        const res = await this.$axios.delete(`roles/${role.id}/rights/${rightId}`);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.$message.success(msg);
          role.children = data;
        } else {
          this.$message.error("取消失败，请稍后再试！");
        }

      },
      // 分配权限-显示
      async statusRolesshow(roles) {
        this.Roleinfo = roles;
        // roles 当前角色的所有信息
        // data 所有角色的相关信息
        this.dialogTableVisibleRoleEditrole = true;
        // 获取所有栏目
        const res = await this.$axios.get(`rights/tree`);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.treeData = data;
          const arr = []; // 定义用于存储所有角色信息一/二/三级目录
          const arr1 = []; // 定义用于存储当前用户的所有已选中的三级目录 用于默认选中项
          const arr2 = []; // 定义用于存储所有角色信息一/二级目录 用于默认展开项
          // 遍历所有角色目录
          data.forEach(item1 => {
            arr.push(item1.id);
            item1.children.forEach(item2 => {
              arr.push(item2.id);
              item2.children.forEach(itme3 => {
                arr.push(itme3.id);
              });
            });
            // 遍历当前角色目录
            roles.children.forEach(item1 => {
              arr2.push(item1.id);
              item1.children.forEach(item2 => {
                arr2.push(item2.id);
                item2.children.forEach(item3 => {
                  arr1.push(item3.id);
                });
              });
            });
            this.arrExpanded = arr2; // 当前默认展开项
            this.arrChecked = arr1; // 当前默认选中项
          });
          this.arrExpanded = arr; // 所有角色权限目录
        } else {
          this.$message.error("获取数据失败，请稍后再试！");
        }
      },
      // 分配权限-保存
      async editRoleright() {
        const roles = this.Roleinfo;
        const arr1 = this.$refs.treeDom.getHalfCheckedKeys();// 获取所有半选节点的key值
        const arr2 = this.$refs.treeDom.getCheckedKeys(); // 获取所有全选节点的key值
        const rids = [...arr1, ...arr2]
        const res = await this.$axios.post(`roles/${roles.id}/rights`, {
          rids: rids.join(",") // 请求体是以,号分开的字符串
        });
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.dialogTableVisibleRoleEditrole = false; // 编辑角色树形弹窗 隐藏
          this.getRoleData(); // 刷新本列表
        } else {
          this.$message.error("提交数据失败，请稍后再试！");
        }
      }
    },
  }
</script>
<style>
  .addrole {
    margin: 10px 0;
  }

  .rowMar {
    margin-bottom: 8px;
  }

  .sjtag {
    margin-right: 4px;
  }

  .lableDefu {
    text-align: center;
  }
</style>
