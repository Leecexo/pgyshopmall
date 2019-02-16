<template>
  <el-card>
    <crumbs val1="权限管理" val2="权限列表"></crumbs>
    <el-table :data="stateData" highlight-current-row style="width: 100%" class="box">
      <el-table-column type="index" width="80">
      </el-table-column>
      <el-table-column property="authName" label="角色名称" width="260">
      </el-table-column>
      <el-table-column property="path" label="路径" width="200">
      </el-table-column>
      <el-table-column property="level" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        stateData: [], // 列表 初始值
      }
    },
    created() {
      this.stateDataget();
    },
    methods: {
      async stateDataget() {
        const res = await this.$axios.get(`rights/list`);
        console.log(res);
        const { data: { data, meta: { msg, status } } } = res;
        console.log(data);
        if (status === 200) {
          this.stateData = data;
        }

      }
    },
  }
</script>
<style>
  .box {
    margin-top: 10px;
  }
</style>
