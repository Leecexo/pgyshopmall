<template>
  <el-card>
    <!-- 面包屑导航 -->
    <crumbs val1="商品管理" val2="商品分类"></crumbs>
    <!-- 添加按钮 -->
    <el-button type="primary" plain size="small" class="cat_btn" @click="addCatshow()">添加商品分类</el-button>
    <!-- 表格部分 -->
    <el-table :data="tableData" height="500px">
      <!--
        treeKey -- 树形对应自己的key
        parentKey -- 父级key名
        levelKey -- 自己的key名
        childKey -- 子级的key名
        expandAll -- 是否全展开（默认 是）
       -->
      <el-table-tree-column file-icon="icon icon-file" folder-icon="icon icon-folder" prop="cat_name" label="商品分类"
        width="220" treeKey="cat_id" parentKey="cat_pid" levelKey="cat_level"></el-table-tree-column>

      <el-table-column prop="cat_level" label="级别" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-if="scope.row.cat_level===1">二级</span>
          <span v-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted===false">有效</span>
          <span v-if="scope.row.cat_deleted===true">无效</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <el-row>
          <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
        </el-row>
      </el-table-column>
    </el-table>
    <!-- 表格部分 end  -->

    <!-- 添加商品分类弹窗 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAddCat" width="30%">
      <el-form>
        <el-form-item label="分类名称">
          <el-input v-model="categories_name" autocomplete="off" class="Catinput">
          </el-input>
        </el-form-item>
        <el-form-item label="选择分类">
          <el-cascader expand-trigger="hover" :options="options" v-model="selectedDdata" @change="handleChange" :props="props">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAddCat = false">取 消</el-button>
        <el-button type="primary" @click="addCat()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加商品分类弹窗 end -->
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],  // 列表数据-初始
        props: {
          children: 'children',
          label: 'cat_name'
        },
        dialogFormVisibleAddCat: false, // 添加商品分类-弹窗
        categories_name: '', // 添加商品分类-名称-初始
        options: [],  // 添加商品分类-初始
        selectedDdata: [], // 添加商品分类-默认选中分类
      }
    },
    created() {
      this.getData();
    },
    methods: {
      // 添加商品分类 - 展示
      addCatshow() {
        this.dialogFormVisibleAddCat = true;
        this.getCatdata();
      },
      // 添加商品分类 - 添加
      addCat() {

      },
      // 获取商品分类
      async getCatdata() {
        const res = await this.$axios.get(`categories?type=2`);
        const { data, meta: { msg, status } } = res.data;
        const len = data.length;
        console.log(data);
        if (status === 200) {
          this.categories_name = '';
          this.options = data;
          // this.selectedDdata = data[0].cat_id
        };
      },
      // 获取商品分类首屏数据
      async getData() {
        const res = await this.$axios.get(`categories?type=3`);
        // console.log(res);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          // this.total = data.length;
          this.tableData = data;
        };
      },
      handleChange(value) {
        console.log(value);
      }
    },
  }
</script>
<style>
  .cat_btn {
    margin: 10px 0;
  }

  .cat_card {
    height: 100%;
    overflow-y: auto;
  }

  .Catinput {
    width: 80%;
  }
</style>
