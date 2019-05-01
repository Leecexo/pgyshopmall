<template>
  <el-card>
    <!-- 面包屑导航 -->
    <crumbs val1="商品管理" val2="分类参数"></crumbs>
    <!-- 注意事项 -->
    <el-alert class="alert" title="注意:只允许为第三级分类设置参数" type="warning" :closable="false" show-icon></el-alert>
    <!-- 表单部分 -->
    <!-- 选择分类开始 -->
    <div class="block">
      <span>请选择商品分类</span>
      <el-cascader :options="options" :props="props" v-model="selectedOptions3" @change="handleChange">
      </el-cascader>
    </div>
    <!-- 选择分类结束 -->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 加载当前分类 动态属性 -->
      <el-tab-pane label="动态参数" name="many">
        <!-- 添加按钮 -->
        <el-button type="primary" @click="paramsAddShow()" class="paramsbtn" size="small">添加动态属性</el-button>
        <!-- 添加按钮end -->
        <!-- 添加按钮表格开始 -->
        <el-table ref="singleTable" :data="tableData" highlight-current-row @expand-change="handleExpandChange" style="width: 100%">
          <el-table-column type="expand" empty-text="暂无数据">
            <!-- tag 开始 -->
            <template slot-scope="
            scope">
              <el-tag :key="index" v-for="(tag,index) in scope.row.attr_vals" closable :disable-transitions="false"
                @close="handleClose(scope.row, index)" class="elTag">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
            <!-- tag 结束 -->
          </el-table-column>
          <el-table-column type="index" width="50">
          </el-table-column>
          </el-table-column>
          <el-table-column prop="attr_name" label="属性名称" width="120">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-button @click="paramseditshow(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"
                  plain></el-button>
                <el-button @click="paramsdeleteshow(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"
                  plain></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 加载当前动态分类 动态属性 end-->
      <!-- 添加动态分类弹窗 -->
      <el-dialog title="添加分类参数" :visible.sync="dialogFormVisibleAdddt">
        <el-form>
          <el-form-item label="所在分类" width="200px">
            <el-cascader :options="options1" :props="props" v-model="selectedOptions">
            </el-cascader>
          </el-form-item>
          <el-form-item label="参数名称" width="200px">
            <el-input v-model="PramattrName"></el-input>
          </el-form-item>
          <div class="dtfl">分类动态参数</div>
          <el-tag :key="index" v-for="(tag,index) in tagList" closable :disable-transitions="false" @close="handleCloseTag(tagList, index)"
            class="elTag">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputTagVal" ref="saveTagInput" size="small"
            @keyup.enter.native="handleInputAdd()" @blur="handleInputAdd()">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdddt = false">取 消</el-button>
          <el-button type="primary" @click="paramsAdd()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加动态分类弹窗end -->
      <!-- 编辑动态分类弹窗 -->
      <el-dialog title="编辑分类参数" :visible.sync="dialogFormVisibleDt">
        <el-form :model="formDtData">
          <el-form-item label="所在分类" width="200px">
            <el-cascader :options="options" :props="props" v-model="selectedOptions3">
            </el-cascader>
          </el-form-item>
          <el-form-item label="参数名称" width="200px">
            <el-input v-model="formDtData.attr_name" @keyup.enter.native=paramsedit(formDtData)></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleDt = false">取 消</el-button>
          <el-button type="primary" @click="paramsedit(formDtData)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑动态分类弹窗end -->
      <!-- 动态分类删除框 -->
      <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%" :before-close="handleClose">
        <span><i class="el-icon-warning"></i>删除是不可恢复操作，是否真的删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDelete = false">取 消</el-button>
          <el-button type="primary" @click="paramsdelete()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 动态分类删除框 end -->
      <!-- 加载当前分类 静态属性 -->
      <el-tab-pane label="静态参数" name="only">
        <!-- 添加按钮 -->
        <el-button type="primary" size="small" @click="paramsAddJtshow()">添加静态属性</el-button>
        <!-- 添加按钮 end -->
        <!-- 表格开始 -->
        <el-table :data="jtData" stripe style="width: 100%">
          <el-table-column label="#" type="index" width="80"></el-table-column>
          <el-table-column prop="attr_name" label="属性名" width="150"></el-table-column>
          <el-table-column prop="attr_vals" label="属性值" width="150"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-button @click="paramseditJtshow(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"
                  plain></el-button>
                <el-button @click="paramsdeleteJtshow(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"
                  plain></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格开始 end -->
      </el-tab-pane>
      <!-- 新增属性弹窗 -->
      <el-dialog title="新增静态属性" :visible.sync="dialogFormVisibleJtAdd">
        <el-form :model="addPraData" label-position="left">
          <el-form-item label="属性名" label-width="60px">
            <el-input v-model="addPraData.attr_name"></el-input>
          </el-form-item>
          <el-form-item label="属性值" label-width="60px">
            <el-input v-model="addPraData.attr_vals"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleJtAdd = false">取 消</el-button>
          <el-button type="primary" @click="paramsAddJt()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增属性弹窗end -->
      <!-- 编辑属性弹窗 -->
      <el-dialog title="新增静态属性" :visible.sync="dialogFormVisibleJtEdit">
        <el-form :model="editPraData" label-position="left">
          <el-form-item label="属性名" label-width="60px">
            <el-input v-model="editPraData.attr_name"></el-input>
          </el-form-item>
          <el-form-item label="属性值" label-width="60px">
            <el-input v-model="editPraData.attr_vals"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleJtEdit = false">取 消</el-button>
          <el-button type="primary" @click="paramseditJt()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑属性弹窗end -->
      <!-- 删除静态属性弹窗 -->
      <el-dialog title="提示" :visible.sync="dialogVisibleparamsdeleteJt" width="30%" :before-close="handleClose">
        <span><i class="el-icon-warning"></i>删除是不可恢复操作，是否真的删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleparamsdeleteJt = false">取 消</el-button>
          <el-button type="primary" @click="paramsdeleteJt()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除属性弹窗end -->
      <!-- 加载当前分类 静态属性 end -->
    </el-tabs>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        selectedOptions: [],
        selectedOptions3: [],
        activeName: "many",
        options: [],
        options1: [],
        PramattrName: '',
        props: {// 商品分类 配置初始值
          value: "cat_id",
          label: "cat_name",
          children: "children",
        },
        tableData: [], // 分类列表数组
        inputVisible: false,
        inputValue: '',
        // 添加动态分类
        dialogFormVisibleAdddt: false,
        dtFromData: [],
        // 编辑分类弹窗初始值
        formDtData: [{ attr_name: '' }],
        dialogFormVisibleDt: false,
        tagList: ["默认"], // 新增 参数时添加的tag标签
        inputTagVal: '',
        // 删除框 初始值
        dialogVisibleDelete: false,
        dialogFormVisibleJt: false, // 新增静态属性名弹窗
        // 添加静态属性-初始值
        jtData: [],
        dialogFormVisibleJtAdd: false,
        addPraData: {},
        // 编辑静态属性-初始值
        dialogFormVisibleJtEdit: false,
        editPraData: {},
        // 删除静态属性-初始值
        dialogVisibleparamsdeleteJt: false,
      }
    },
    created() {
      this.getGoods();
    },
    methods: {
      // 点击展开时只展开一行
      handleExpandChange(row, expandedRows) {
        if (expandedRows.length > 1) {
          expandedRows.shift();
        }
      },

      // 获取所有商品分类
      async getGoods() {
        const res = await this.$axios.get(`categories`);
        const { data, meta: { msg, status } } = res.data;
        // console.log(data);
        if (status === 200) {
          this.options = data; // 给分类数据值
          this.selectedOptions3 = [data[0].cat_id, data[0].children[0].cat_id, data[0].children[0].children[0].cat_id];
          this.getParams();
        }
      },
      // 获取当前分类-动态属性
      async getParams() {
        const len = this.selectedOptions3.length;
        const res = await this.$axios.get(`categories/${this.selectedOptions3[len - 1]}/attributes?sel=${this.activeName}`);
        // console.log(res);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200 && this.activeName === 'many') {
          this.tableData = data;
          // console.log(this.tableData);
          // const arr = [];
          this.tableData.forEach(item => {
            // 将每个动态项的字符串类型转成数组
            item.attr_vals = item.attr_vals.trim().split(",").length === 0 ? [] : item.attr_vals.trim().split(',');
          });
        }
      },
      // tag 关闭事件
      async handleClose(tag, index) {
        tag.attr_vals.splice(tag.attr_vals.indexOf(tag), 1);
        // const putData = tag.attr_vals;
        const cat_id = tag.cat_id;
        const attr_id = tag.attr_id;
        // put携带的对象
        const putData = {
          attr_name: tag.attr_name,
          attr_sel: tag.attr_sel,
          attr_vals: tag.attr_vals.join(',')
        }
        // 发送请求
        const url = `/categories/${cat_id}/attributes/${attr_id}`
        const res = await this.$axios.put(url, putData)
        const { meta: { msg, status } } = res.data;
        if (status === 200) {
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      },
      // tag 输入事件
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      // tag 添加到动态数组事件
      async handleInputConfirm(tag) {
        let inputValue = this.inputValue;
        if (inputValue) {
          tag.attr_vals.push(inputValue);
          const cat_id = tag.cat_id;
          const attr_id = tag.attr_id;
          // put携带的对象
          const putData = {
            attr_name: tag.attr_name,
            attr_sel: tag.attr_sel,
            attr_vals: tag.attr_vals.join(',')
          }
          // 发送请求
          const url = `/categories/${cat_id}/attributes/${attr_id}`
          const res = await this.$axios.put(url, putData)
          const { meta: { msg, status } } = res.data;
          if (status === 200) {
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      // tag所有事件结束

      // 编辑分类信息弹窗-展示
      paramseditshow(row) {

        this.dialogFormVisibleDt = true;
        this.formDtData = row;
      },
      // 编辑分类信息弹窗-提交信息
      async paramsedit(row) {
        const attr_vals = row.attr_vals.join(","); // 处理请求体中的动态tag标签
        const cat_id = this.selectedOptions3[this.selectedOptions3.length - 1]; // 获取当前最新的三级分类的id
        const res = await this.$axios.put(`categories/${cat_id}/attributes/${row.attr_id}`,
          {
            attr_name: row.attr_name,
            attr_sel: "many",
            attr_vals
          });
        const { meta: { msg, status } } = res.data;
        if (status === 200) {
          this.getParams();
          this.dialogFormVisibleDt = false;
        }

      },
      // 添加分类弹窗-展示
      async paramsAddShow() {
        this.dialogFormVisibleAdddt = true;
        const res = await this.$axios.get(`categories`);
        const { data, meta: { msg, status } } = res.data;
        if (status === 200) {
          this.options1 = data; // 给分类数据值
          this.selectedOptions = this.selectedOptions3; // 默认选择 当前选中的分类
        }
      },
      // 添加分类弹窗-添加
      async paramsAdd() {
        const attr_name = this.PramattrName;
        const attr_vals = this.tagList.join(',');
        this.tagList = ["默认"]; // 存储起来之后将之前的tag数组清空，给之后的添加tag框使用
        const len = this.selectedOptions3.length;
        const res = await this.$axios.post(`categories/${this.selectedOptions3[len - 1]}/attributes`,
          {
            attr_name,
            attr_sel: 'many',
            attr_vals
          });
        // console.log(res);
        const { meta: { msg, status } } = res.data;
        if (status === 201) {
          this.$message.success(msg);
          this.dialogFormVisibleAdddt = false;
          this.getParams();
          this.PramattrName = '';
        } else {
          this.$message.error(msg);
        }

      },
      // 新增的tag
      handleInputAdd() {
        let inputTagVal = this.inputTagVal;
        if (inputTagVal) {
          this.tagList.push(inputTagVal);
        }
        this.inputVisible = false;
        this.inputTagVal = '';
      },
      // 新增弹窗中 删除tag
      handleCloseTag(tag) {
        this.tagList.splice(this.tagList.indexOf(tag), 1);
      },
      // 删除框提示框-展示
      async paramsdeleteshow(row) {
        this.deleteFl = row;
        this.dialogVisibleDelete = true;
      },
      // 删指定分类
      async paramsdelete() {
        const res = await this.$axios.delete(`categories/${this.deleteFl.cat_id}/attributes/${this.deleteFl.attr_id}`);
        const { meta: { msg, status } } = res.data;
        if (status === 200) {
          this.dialogVisibleDelete = false;
          this.$message.success(msg);
          this.getParams();
          this.deleteFl = [];
        }
      },
      // 删除框提示框 - 右上 X号执行事件
      handleClose() {
        this.dialogVisibleDelete = false;
      },
      // 分类改变 页面数据刷新
      handleChange() {
        this.getParams(); // 修改分类 重新加载动态属性
        this.handleClick(); // 修改分类 重新加载静态属性
      },

      // 静态数据处理--获取静态数据
      async handleClick() {
        const len = this.selectedOptions3.length;
        const res = await this.$axios.get(`categories/${this.selectedOptions3[len - 1]}/attributes?sel=only`);
        const { data, meta: { msg, status } } = res.data;
        // console.log(data);
        if (status === 200) {
          this.jtData = data;
        }
      },
      // 静态数据处理-添加-展示
      paramsAddJtshow() {
        this.dialogFormVisibleJtAdd = true;
      },
      // 静态数据处理-添加 - 添加
      async paramsAddJt() {
        console.log(this.addPraData);
        // 发送添加请求
        const attr_name = this.addPraData.attr_name;
        const attr_vals = this.addPraData.attr_vals;
        const len = this.selectedOptions3.length;
        const res = await this.$axios.post(`categories/${this.selectedOptions3[len - 1]}/attributes`,
          {
            attr_name,
            attr_sel: 'only',
            attr_vals
          });
        const { meta: { msg, status } } = res.data;
        if (status === 201) {
          this.handleClick();
          this.dialogFormVisibleJtAdd = false;
          this.addPraData = {};
        }
      },
      // 静态数据处理-编辑-展示
      paramseditJtshow(row) {
        this.editPraData = row;
        this.dialogFormVisibleJtEdit = true;
        // console.log(row);
      },
      // 静态数据处理-编辑-提交
      async paramseditJt() {
        console.log(this.editPraData);
        const res = await this.$axios.put(`categories/${this.editPraData.cat_id}/attributes/${this.editPraData.attr_id}`, {
          attr_name: this.editPraData.attr_name,
          attr_sel: 'only',
          attr_vals: this.editPraData.attr_vals
        });
        console.log(res);
        const { meta: { msg, status } } = res.data;
        if (status === 200) {
          this.$message.success(msg);
          this.dialogFormVisibleJtEdit = false;
          this.handleClick();
        }
      },
      // 静态数据处理-删除-展示
      paramsdeleteJtshow(row) {
        this.editPraData = row;
        this.dialogVisibleparamsdeleteJt = true;
      },
      // 静态数据处理-删除-确认
      async paramsdeleteJt() {
        const res = await this.$axios.delete(`categories/${this.editPraData.cat_id}/attributes/${this.editPraData.attr_id}`);
        console.log(res);
        const { meta: { msg, status } } = res.data;
        if (status === 200) {
          this.$message.success(msg);
          this.dialogVisibleparamsdeleteJt = false;
          this.handleClick();
        }
      },
    },
  }
</script>
<style>
  .alert {
    margin: 10px;
  }

  .block {
    margin: 10px 0;
  }

  .el-tag+.el-tag {
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .paramsbtn {
    margin-bottom: 5px;
  }

  .dtfl {
    margin-bottom: 10px;
  }

  .jtinputVal {
    display: inline-block;
    width: 260px;
  }

  .el-icon-warning {
    color: #E6A23C;
    font-size: 30px;
    vertical-align: middle;
    margin-right: 10px;
  }
</style>
