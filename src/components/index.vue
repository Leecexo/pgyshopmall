<template>
  <el-card>
    <!-- 订单相关 -->
    <el-card class="user">
      <h3>订单相关</h3>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="rowbox indexBox">
            订单总量：
          </div>
        </el-col>
        <el-col :span="6">
          <div class="rowbox indexBox2">
            未付款：
          </div>
        </el-col>
        <el-col :span="6">
          <div class="rowbox indexBox3">
            未发货:
          </div>
        </el-col>
        <el-col :span="6">
          <div class="rowbox indexBox4">
            已发货：
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 四个回复框 -->
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
    <el-row class="skp" :gutter="10">
      <!-- 最新用户列表 -->
      <el-col :span="6">
        <el-card>
          <div class="newuser">
            <h4>新增用户</h4>
            <span @click="userlist()">更多>></span>
          </div>
          <el-table :data="userData" style="width: 100%">
            <el-table-column label="姓名" width="60px">
              <img src="../assets/msg/userico.png" alt="用户ico加载中..." class="userico">
            </el-table-column>
            <el-table-column prop="username" width="100%" label-class-name="userlabeltitle">
            </el-table-column>
            <el-table-column label="注册时间">
              <template slot-scope="scope">
                <!-- frmDate是main.js中过滤器的名字  -->
                {{scope.row.add_time|frmDate}}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 商品销量Top5 -->
      <el-col :span="10">
        <el-card>
          <div class="newuser">
            <h4>销量Top5</h4>
            <span @click="categorieslist()">更多>></span>
          </div>
          <el-table :data="categoriesData" style="width: 100%">
            <el-table-column label="#" type="index" width="30px"></el-table-column>
            <el-table-column prop="goods_name" label="商品名" width="200px" class-name="goosname" label-class-name="gooslabel">
            </el-table-column>
            <el-table-column label="更新时间">
              <template slot-scope="scope">
                <!-- frmDate是main.js中过滤器的名字  -->
                {{scope.row.upd_time|frmDate}}
              </template>
            </el-table-column>
            <el-table-column prop="goods_state" label="状态" width="100px">
              <template slot-scope="scope">
                <span v-if="scope.row.goods_state===0">未通过</span>
                <span v-if="scope.row.goods_state===1">审核中</span>
                <span v-if="scope.row.goods_state===2">已审核</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 统计图 -->
      <el-col :span="8">
        <el-card>
          <div class="newuser">
            <h4>未处理订单</h4>
            <span @click="orderslist()">更多>></span>
          </div>
          <el-table :data="ordersData" style="width: 100%">
            <el-table-column label="订单ID" prop="order_id" width="80px"></el-table-column>
            <el-table-column prop="is_send" label="支付状态" width="80px" class-name="ordersname" label-class-name="gooslabel">
              <template slot-scope="scope">
                <span v-if="scope.row.pay_status==='0'">未付款</span>
                <span v-if="scope.row.pay_status==='1'">已付款</span>
                <!-- <span v-if="scope.row.is_send===2">已审核</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="is_send" label="发货状态" width="80px">
              <template slot-scope="scope">
                <span v-if="scope.row.is_send==='否'">未发货</span>
                <span v-if="scope.row.is_send==='是'">已发货</span>
                <!-- <span v-if="scope.row.is_send===2">已审核</span> -->
              </template>
            </el-table-column>
            <el-table-column label="下单时间">
              <template slot-scope="scope">
                <!-- frmDate是main.js中过滤器的名字  -->
                {{scope.row.create_time|frmDate}}
              </template>
            </el-table-column>

          </el-table>
        </el-card>
      </el-col>
    </el-row>


  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        userData: [], // 用户列表初始值
        categoriesData: [], // 商品列表初始值
        ordersData: [],// 订单列表初始值
      }
    },
    created() {
      // 加载用户列表首屏数据
      this.getUserData();
      this.getcategoriesData();
      this.orderslist();
    },
    methods: {
      // 加载用户列表首屏数据
      async getUserData() {
        // 发送数据请求
        const res = await this.$axios.get(`users?query=&pagenum=1&pagesize=5}`);
        const { data, meta: { msg, status } } = res.data;
        if (status === 400) {
          this.$message.error(msg);
          this.$router.push('login');
        } else if (status === 404) {
          this.$message.error("服务器繁忙请稍后再试！");
        } else if (status === 200) {
          const { users } = data;
          this.userData = users;
        };
      },
      // 用户列表入口
      userlist() {
        this.$router.push('user');
      },
      // 商品列表入口
      categorieslist() {
        this.$router.push('categories');
      },
      async getcategoriesData() {
        // 发送数据请求
        const res = await this.$axios.get(`goods?query=&pagenum=1&pagesize=5}`);
        const { data, meta: { msg, status } } = res.data;
        if (status === 400) {
          this.$message.error(msg);
          this.$router.push('login');
        } else if (status === 404) {
          this.$message.error("服务器繁忙请稍后再试！");
        } else if (status === 200) {
          // console.log(res);
          const { goods } = data;
          // console.log(goods);
          // console.log(goods.goods_state);
          this.categoriesData = goods;
        };
      },
      // 订单列表入口
      async orderslist() {
        // 发送数据请求
        const res = await this.$axios.get(`orders?query=&pagenum=1&pagesize=5}`);
        // console.log(res);
        const { data, meta: { msg, status } } = res.data;
        if (status === 400) {
          this.$message.error(msg);
          this.$router.push('login');
        } else if (status === 404) {
          this.$message.error("服务器繁忙请稍后再试！");
        } else if (status === 200) {
          const { goods } = data;
          // console.log(goods);
          // console.log(goods.goods_state);
          this.ordersData = goods;
        };
      },
    },
  }
</script>
<style>
  .goosname div {
    height: 45px;
  }

  .ordersname div {
    height: 45px;
    line-height: 45px !important;
  }

  .userlabeltitle {
    height: 45px;

  }

  /* .gooslabel div {
    height: auto;
  } */

  .user {
    margin-bottom: 10px;
  }

  .skp {
    margin-top: 10px;
  }

  .carbox {
    margin-right: 10px;
  }

  .userico {
    width: 40px;
    height: 40px;
    /* background: url('../assets/msg/userico.png') no-repeat; */
  }

  .item {
    margin-right: 20px;
  }

  .rowbox {
    border-radius: 4px;
    min-height: 36px;
    max-height: 80px;
    color: #fff;
    padding: 20px;
  }

  .indexBox {
    background: #409EFF;
  }

  .indexBox2 {
    background-color: #67C23A;
  }

  .indexBox3 {
    background-color: #E6A23C;
  }

  .indexBox4 {
    background-color: #F56C6C;
  }

  .newuser h4 {
    margin: 0;
    height: 0;
    float: left;
    color: #409EFF;
  }

  .newuser span {
    float: right;
    color: #409EFF;
    cursor: pointer;
  }
</style>
