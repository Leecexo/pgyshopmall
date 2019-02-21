<template>
  <el-card>
    <!-- 面包屑导航 -->
    <crumbs val1="商品管理" val2="商品列表"></crumbs>
    <!-- 搜索 -->

    <el-input placeholder="请输入内容" v-model="query" class="search" clearable @clear="clearInputVal()" @keyup.enter.native="gotosearch()">

      <el-button slot="append" icon="el-icon-search" @click="gotosearch()"></el-button>
    </el-input>
    <!-- 添加按钮 -->
    <el-button type="primary" plain class="goods" @click="$router.push({name:'goodsadd'})">添加商品</el-button>
    <!-- 表单部分 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="goods_id" label="#" width="80">
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="600">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="100">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="100">
      </el-table-column>
      <el-table-column prop="add_time" label="创建日期" width="120">
        <template slot-scope="scope">
          <!-- frmDate是main.js中过滤器的名字  -->
          {{scope.row.add_time|frmDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="goodsedit(scope.row)" type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
            <el-button @click="goodsdelete(scope.row)" type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表单部分 end -->
    <!-- 分页 -->
    <el-pagination @size-change="SizeChange" @current-change="CurrentChange" :current-page="pagenum" :page-sizes="[10, 20, 50, 100]"
      :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 分页 end -->
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],// 商品列表 数据初始值
        pagenum: 1, // 当前页码 初始值
        pagesize: 10, // 每页商品量 初始值
        query: '', // 搜索框 初始值
        total: -1, // 总商品量 初始值
      }
    },
    created() {
      this.getgoods();
    },
    methods: {
      // 搜索框
      gotosearch() {
        this.pagenum = 1;
        this.getgoods();
      },
      // 清空搜索框
      clearInputVal() {
        // this.query = '';
        this.pagenum = 1;
        this.getgoods();
      },
      async getgoods() {
        const res = await this.$axios.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
        // console.log(res);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.tableData = data.goods;
          this.total = data.total;
        } else {
          this.$message.error('数据获取失败，请稍后再试！');
        }
      },
      SizeChange(val) {
        this.pagenum = 1;
        this.pagesize = val;
        this.getgoods();
      },
      CurrentChange(val) {
        this.pagenum = val;
        this.getgoods();
      },
      // 编辑商品，并商品id通过url传过去
      goodsedit(goods) {
        this.$router.push({ name: 'goodsedit', params: { id: goods.goods_id } });
      },
      async goodsdelete(goods) {
        console.log(goods);
        const res = await this.$axios.delete(`goods/${goods.goods_id}`);
        console.log(res);
        const { meta: { msg, status } } = res.data;
        if (status === 200) {
          this.$message.success(msg);
          this.getgoods();
        }
      },
    },
  }
</script>
<style>
  .goods {
    margin: 10px 0;
  }

  /* .goosname div {
    height: 45px;
  }

  .ordersname div {
    height: auto;
    height: 45px;
    line-height: 45px !important;
  } */

  .search {
    width: 300px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
