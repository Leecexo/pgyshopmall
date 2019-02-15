<template>
  <el-card>
    <el-card class="user">
      user---
    </el-card>
    <el-card class="shopmall">
      <el-badge :value="12" class="item">
        <el-button size="small">商品总量</el-button>
      </el-badge>
      <el-badge :value="3" class="item">
        <el-button size="small">回复</el-button>
      </el-badge>
      <el-badge :value="1" class="item" type="primary">
        <el-button size="small">评论</el-button>
      </el-badge>
      <el-badge :value="2" class="item" type="warning">
        <el-button size="small">回复</el-button>
      </el-badge>
    </el-card>
  </el-card>
</template>
<script>
  export default {

  }
</script>
<style>
  .user {
    margin-bottom: 10px;
  }

  .item {
    margin-right: 20px;
  }
</style>
