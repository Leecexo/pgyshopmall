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
            <!-- <el-button @click="statusUser(scope.row)" type="success" icon="el-icon-check" circle size="mini" plain></el-button> -->
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
    <!-- 商品删除弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleGoodsDelete" width="30%" :before-close="handleClose">
      <span><i class="el-icon-warning"></i>删除后将不能恢复，是否真的要删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleGoodsDelete = false">取 消</el-button>
        <el-button type="primary" @click="goodsDelete()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 商品删除弹窗 end -->
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
        goods: [], // 当前要删除商品信息
        dialogVisibleGoodsDelete: false
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
      // 删除弹窗显示
      goodsdelete(goods) {
        this.goods = goods;
        this.dialogVisibleGoodsDelete = true;

      },
      // 删除弹窗-关闭
      handleClose() {
        this.dialogVisibleGoodsDelete = false;
      },
      // 删除弹窗-删除确认操作
      async goodsDelete() {
        const res = await this.$axios.delete(`goods/${this.goods.goods_id}`);
        const { meta: { msg, status } } = res.data;
        if (status === 200) {
          this.dialogVisibleGoodsDelete = false;
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

  .el-icon-warning {
    color: #E6A23C;
    font-size: 30px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .search {
    width: 300px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
