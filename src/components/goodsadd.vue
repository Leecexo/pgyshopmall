<template>
  <el-card>
    <!-- 面包屑导航 -->
    <crumbs val1="商品管理" val2="添加商品"></crumbs>
    <!-- 面包屑导航 end -->
    <el-alert title="添加商品" type="info" center show-icon class="infoalert"></el-alert>
    <!-- 横进度 -->
    <el-steps :active="active*1" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 横进度 end -->
    <!-- 表单主体 -->
    <el-form ref="form" :model="goodsData" label-width="150px" label-position="top" :rules="rules">
      <!-- 竖进度 -->
      <el-tabs v-model="active" @tab-click="getCSdata" tab-position="left" class="goodsXQ">
        <el-tab-pane label="基本信息" name="1">
          <!-- 下拉 -->
          <el-form-item label="商品分类" prop="options">
            <!--
              options 数据源
              selectedOptions3 默认显示分类
              props 配置选项绑定数据源(options)中的key名
            -->
            <el-cascader :options="options" v-model="selectedOptions3" :props="props" @change="cascaderchange()"
              filterable></el-cascader>
          </el-form-item>
          <!-- 下拉 end -->
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="goodsData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="goodsData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="goodsData.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="goodsData.goods_weight"></el-input>
          </el-form-item>
          <!-- 以上表单框 不可为空 -->
        </el-tab-pane>
        <!-- 商品动态属性 可删除 读取分类中设置中直接填入表单中 -->
        <el-tab-pane label="商品参数" name="2">
          <el-form-item :label="item.attr_name" v-for="(item) in goodsDTcheckList" :key="item.attr_id" @change="goodsDTcheckListchange()">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox :label="item2" v-for="(item2,i) in item.attr_vals" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <!-- 商品静态属性 读取分类中设置中直接填入表单中 -->
        <el-tab-pane label="商品属性" name="3">
          <el-form-item :label="item.attr_name" v-for="(item) in goodsJTcheckList" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <el-form-item>

            <!-- 商品图片点击上传 -->
            <el-upload action="http://localhost:8888/api/private/v1/upload" list-type="picture-card" :on-remove="handleRemove"
              :on-success="handleSuccess" :on-preview="handlePictureCardPreview" :headers="headers">
              <i class="el-icon-plus"></i>
            </el-upload>
            <!-- 商品图片点击上传 end -->
            <!-- 商品图片点击放大 -->
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <!-- 商品图片点击放大 end -->
            <!-- 提示文字 -->
            <div> <i class="el-icon-warning error"></i> 仅支持上传一张图片，多图优选最后上传的一张为商品</div>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">
          <!-- 添加商品按钮 -->
          <el-button type="primary" plain class="goods" @click="goodsadd()">添加商品</el-button>
          <!-- 富文本 -->
          <quillEditor v-model="goodsData.goods_introduce"></quillEditor>
        </el-tab-pane>
      </el-tabs>
      <!-- 竖进度  end -->
    </el-form>
    <!-- 表单主体  end -->
  </el-card>
</template>
<script>
  // 引入富文本样式
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  // 定义组件
  import { quillEditor } from 'vue-quill-editor'
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        active: '1',// 步骤 初始值
        goodsData: { // 商品信息 初始值
          goods_name: "",
          goods_cat: "",
          goods_price: "",
          goods_number: "",
          goods_weight: "",
          goods_introduce: "",
          pics: [],
          attrs: [],
        },
        rules: {
          goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          goods_price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          goods_number: [
            { required: true, message: '请输入商品数量', trigger: 'blur' }
          ],
          goods_weight: [
            { required: true, message: '请输入商品重量', trigger: 'blur' }
          ],
          options: [
            { required: true, message: '请选择商品分类', trigger: 'blur' }
          ]
        },
        options: [],// 商品分类 初始值
        selectedOptions3: [],// 商品分类默认显示 初始值
        props: {// 商品分类 配置初始值
          value: "cat_id",
          label: "cat_name",
          children: "children",
        },
        goodsDTcheckList: [],// 商品动态属性 初始值
        goodsJTcheckList: [],// 商品静态属性 初始值
        // checkList: [],// 选中商品动态属性 初始值
        dialogImageUrl: '', // 点击放大图片路径
        dialogVisible: false, // 上传图片位置点击放大
        headers: { Authorization: localStorage.getItem('token') }, // 设置上传图片 请求头
        goodsstr: '', // 记录当前分类的String
      }
    },
    created() {
      // 加载商品分类请求
      this.getGoods();
    },
    methods: {
      // 发送商品分类数据请求
      async getGoods() {
        const res = await this.$axios.get(`categories?type=3`);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.options = data; // 给分类数据值
          this.selectedOptions3 = [data[0].cat_id, data[0].children[0].cat_id, data[0].children[0].children[0].cat_id];
          // console.log(this.selectedOptions3);
        }
        // 设置默认显示分类 获取动态数据
        this.getDTdata();
        // 获取静态数据
        this.getJdData();
      },
      // 封装获取动态数据函数
      async getDTdata() {
        // console.log("获取动态数据-----------");
        const res = await this.$axios.get(`categories/${this.selectedOptions3[2]}/attributes?sel=many`);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.goodsDTcheckList = data;
          // console.log("获取动态数据---");
          console.log(this.goodsDTcheckList);
          this.goodsDTcheckList.forEach(item => {
            if (item.attr_vals.length !== 0) {
              item.attr_vals = item.attr_vals.trim().split(",");
            } else if (item.attr_vals.length === 0) {
              item.attr_vals = [];
            }
            // this.checkList = item.attr_vals;
          });
        } else {
          this.$message.error(msg);
        };
      },
      // 封装获取静态数据函数
      async getJdData() {
        // console.log("获取静态数据-----------");
        const res = await this.$axios.get(`categories/${this.selectedOptions3[2]}/attributes?sel=only`);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.goodsJTcheckList = data;
          // console.log("获取静态数据---");
          console.log(this.goodsJTcheckList);
        } else {
          this.$message.error(msg);
        };
      },
      // 如果商品三级分类发生改变时执行
      async cascaderchange() {
        // console.log("商品三级分类发生改变-----------");
        // 设置默认显示分类 获取动态数据
        this.getDTdata();
        // 获取静态数据
        this.getJdData();
      },
      // 判断是否选择了三级分类
      async getCSdata() {
        if (this.selectedOptions3.length !== 3) {
          this.goodsDTcheckList = []; // 未选则清空动态分类数据
          this.goodsJTcheckList = [];// 未选则清空静态分类数据
          this.$message.error("请先选择三级分类！");
          return;
        };

        // // 如果分类是三级
        // if (this.active === "2" || this.active === "3") {
        //   if (this.selectedOptions3.length !== 3) {
        //     // 提示
        //     this.$message.error("请先选择三级分类!");
        //     // 清空
        //     if (this.active === "2") {
        //       this.goodsDTcheckList = [];
        //     } else {
        //       this.goodsJTcheckList = [];
        //     }
        //     return;
        //   }

        //   if (this.active === "2") {
        //     // 获取动态数据
        //     const res = await this.$axios.get(
        //       `categories/${this.selectedOptions3[2]}/attributes?sel=many`
        //     );
        //     // console.log(res);
        //     const {
        //       meta: { msg, status },
        //       data
        //     } = res.data;
        //     if (status === 200) {
        //       this.goodsDTcheckList = data;
        //       console.log("动态数据----");

        //       // 处理this.arrDy中的每个元素的attr_vals)
        //       this.goodsDTcheckList.forEach(item => {
        //         item.attr_vals =
        //           item.attr_vals.trim().length === 0
        //             ? []
        //             : item.attr_vals.trim().split(",");
        //       });
        //       console.log(this.goodsDTcheckList);
        //     }
        //   }

        //   if (this.active === "3") {
        //     // 获取静态数据
        //     const res = await this.$axios.get(
        //       `categories/${this.selectedOptions3[2]}/attributes?sel=only`
        //     );
        //     // console.log(res);
        //     const {
        //       meta: { msg, status },
        //       data
        //     } = res.data;
        //     if (status === 200) {
        //       this.goodsJTcheckList = data;
        //       // console.log("静态数据----");
        //       console.log(this.goodsJTcheckList);
        //     }
        //   }
        // }



      },
      goodsDTcheckListchange() {
        // console.log(this.goodsDTcheckList);
      },
      // 上传商品图片 删除触发 如果删除所有图片 数组置0
      handleRemove(file, fileList) {
        if (fileList.length !== 0) {
          this.goodsData.pics = [{
            "pic": fileList[0].response.data.tmp_path
          }];
        } else {
          this.goodsData.pics = [];
        }
      },
      // 上传商品图片 点击放大图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 上传商品图片 选中触发 如果没有上传 数组为空
      handleSuccess(response, file, fileList) {
        if (fileList.length !== 0) {
          this.goodsData.pics = [{
            "pic": fileList[0].response.data.tmp_path
          }];
        } else {
          this.goodsData.pics = [];
        }
      },
      async goodsadd() {
        // 生成商品分类 字符串
        this.goodsData.goods_cat = this.selectedOptions3.join(',');
        // 获取动态参数
        const arr1 = this.goodsDTcheckList.map(item => {
          return { attr_id: item.attr_id, attr_value: item.attr_vals };
        });
        // 获取静态参数
        const arr2 = this.goodsJTcheckList.map(item => {
          return { attr_id: item.attr_id, attr_value: item.attr_vals };
        });
        // 合并attrs参数数据
        this.goodsData.attrs = [...arr1, ...arr2];
        console.log(this.goodsData.attrs);

        const res = await this.$axios.post(`goods`, this.goodsData);
        // console.log(res);
        const { data, meta: { msg, status } } = res.data;
        if (status === 201) {
          // this.getGoods();
          this.$router.push('goods');
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }

      }
    },
  }
</script>
<style>
  .infoalert {
    margin: 20px 0;
  }

  .goodsXQ {
    margin: 20px 0;
  }

  .ql-toolbar {
    width: 90%;
  }

  .ql-container {
    min-height: 300px !important;
    width: 90%;
  }

  .ql-editor {
    min-height: 300px !important;

  }

  .goods {
    margin: 10px 0;
  }

  .error {
    color: red;
  }
</style>
