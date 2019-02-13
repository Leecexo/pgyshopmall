<template>
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">logo</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">
            <h2>品优购商品管理后台</h2>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple"><a href="#">退出</a></div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
    <el-footer>Copyright ©2013-2019 品优购商品管理后台</el-footer>
  </el-container>
</template>

<script>
  export default {

  }
</script>

<style>
  .container {
    height: 100%;
  }

  h2 {
    color: #fff;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 20px;
    height: 20px;
    font-size: 14px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>
