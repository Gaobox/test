<template>
  <el-row style="width: 100%;">
    <el-col :span="24">
      <el-row style="margin-bottom: 35px;">
        <el-check-tag effect="plain" :checked="checkedBoy" style="margin-right: 8px"
          @change="handleChangeBoy">Men's shoes management</el-check-tag>
        <el-check-tag effect="plain" :checked="checkedGirl" @change="handleChangeGirl">Women's shoes management</el-check-tag>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="Search by shoe id:">
              <el-input v-model="formInline.id" placeholder="Please enter id" clearable />
            </el-form-item>
            <el-form-item label="Search by shoe name:">
              <el-input v-model="formInline.title" placeholder="Please enter a name" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">Query</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-row justify="end">
            <el-button type="primary" @click="handleEditItem">Add product</el-button>
          </el-row>
        </el-col>
      </el-row>
      <template v-if="list.length > 0">
        <el-table ref="adminTable" :data="list" style="width: 100%" stripe highlight-current-row show-overflow-tooltip>
          <el-table-column prop="id" label="id" width="40" />
          <el-table-column prop="title" label="name" width="200" />
          <el-table-column prop="price" label="price" width="80" />
          <el-table-column prop="discount" label="discount" width="100" />
          <el-table-column prop="color" label="color" />
          <el-table-column prop="desc" label="description" />
          <el-table-column fixed="right" label="operate" width="200">
            <template #default="scope">
              <el-button type="primary" size="small" @click="handleEditItem(scope.row)">edit</el-button>
              <el-button type="danger" size="small" @click="handleDelItem(scope.row.id)">delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog v-model="dialogVisible" :title="title" width="600" :before-close="handleClose">
        <el-form ref="adminForm" :model="productForm" label-width="80px">
          <el-form-item label="id" prop="id">
            <el-input v-model="productForm.id" :disabled="idDisabled" placeholder="Please enter an id" />
          </el-form-item>
          <el-form-item label="name" prop="title">
            <el-input v-model="productForm.title" placeholder="Please enter a name" />
          </el-form-item>
          <el-form-item label="price" prop="price">
            <el-input v-model="productForm.price" placeholder="Please enter a price" />
          </el-form-item>
          <el-form-item label="color" prop="color">
            <el-select v-model="productForm.color" multiple placeholder="Select" style="width:100%">
              <el-option label="white" value="white" />
              <el-option label="blue" value="blue" />
              <el-option label="red" value="red" />
              <el-option label="green" value="green" />
              <el-option label="pink" value="pink" />
              <el-option label="rose" value="rose" />
              <el-option label="black" value="black" />
            </el-select>
          </el-form-item>
          <el-form-item label="discount" prop="discount">
            <el-input v-model="productForm.discount" placeholder="Please enter whether there is a discount. If you do not enter, it means the original price is sold" />
          </el-form-item>
          <el-form-item label="Product Description" prop="desc">
            <el-input v-model="productForm.desc" :row="5" autosize placeholder="Please enter a product description" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">confirm</el-button>
            <el-button @click="handleCancel">cancel</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-col>
  </el-row>
  
  <!-- 添加返回用户页面的按钮 -->
  <el-button type="warning" @click="goToLogin" style="margin-top: 20px;">Return to the user interface</el-button>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import { getHomeListData } from '@/api'

export default {
  name: 'Admin',
  data() {
    return {
      list: [],
      listboy: [],
      listgirl: [],
      dialogVisible: false,
      title: '',
      productForm: {
        id: '',
        title: '',
        price: '',
        discount: '',
        color: ["black", 'white'],
        desc: ''
      },
      copyRow: {},
      buttonText: '',
      checkedBoy: true,
      checkedGirl: false,
      formInline: {
        id: '',
        title: ''
      },
      idDisabled: false
    }
  },
  mounted() {
    this.getHomeList()
  },
  methods: {
    // 跳转到用户页面
    goToLogin() {
      this.$router.push({ path: '/home' });
    },
    getHomeList() {
      getHomeListData().then(res => {
        try {
          const { code, data, msg } = res
          if (code === 200) {
            this.list = data[0].list
            this.listboy = data[0].list
            this.listgirl = data[1].list
          } else {
            ElMessage.error(msg)
          }
        } catch (error) {
          ElMessage.error("请求数据错误")
        }
      }).catch(error => {
        ElMessage.error("请求数据错误")
        console.log(error)
      })
    },
    handleClose() {
      this.$refs.adminForm.resetFields()
      this.dialogVisible = false
    },
    
    handleEditItem(row) {
      this.dialogVisible = true
      if (row.id) {
        this.title = 'Edit product'
        this.idDisabled = true
        this.copyRow = Object.assign({}, { ...row })
        this.productForm = row
      } else {
        this.title = 'Add product'
        this.idDisabled = false
        this.productForm = {
          title: '',
          price: '',
          discount: '',
          color: ["black", 'white'],
          desc: ''
        }
      }
    },
    handleCancel() {
      this.list = this.list.map(element => {
        if (element.id === this.copyRow.id) {
          return {
            ...element,
            ...this.copyRow
          }
        } else {
          return element
        }
      });
      this.dialogVisible = false
    },
    handleSubmit() {
      if (this.title === 'Add product') {
        // 商品添加成功
        this.list.push(this.productForm);
        this.$emitter.emit('updateProductList');  // 触发商品更新事件
        ElMessage.success('Added successfully');
      } else {
        // 商品编辑成功
        this.list.forEach(element => {
          if (element.id === this.productForm.id) {
            element = this.productForm;
          }
        });
        this.$emitter.emit('updateProductList');  // 触发商品更新事件
      }
      this.dialogVisible = false;
    },

    handleDelItem(id) {
      ElMessageBox.confirm(
        'Are you sure you want to delete this message?',
        'Delete products',
        {
          confirmButtonText: 'delete',
          cancelButtonText: 'cancel',
          type: 'warning',
        }
      ).then(() => {
        this.list = this.list.filter(item => item.id !== id);
        this.$emitter.emit('updateProductList');  // 触发商品更新事件
        ElMessage({
          type: 'success',
          message: 'Deleted successfully',
        });
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: 'Undelete',
        });
      });
    },

    handleChangeBoy() {
      this.checkedBoy = true
      this.checkedGirl = false
      this.list = this.listboy
      this.formInline = {
        id: '',
        title: ''
      }
    },
    handleChangeGirl() {
      this.checkedBoy = false
      this.checkedGirl = true
      this.list = this.listgirl
      this.formInline = {
        id: '',
        title: ''
      }
    },
    handleSearch() {
      if (this.formInline.id && this.formInline.title) {
        ElMessage.error('Mixed queries are not supported')
        return
      }
      if (this.formInline.id === '' && this.formInline.title === '') {
        this.checkedBoy ? this.list = this.listboy : this.list = this.listgirl
        return
      }
      if (this.formInline.id) {
        this.list = this.list.filter(item => this.formInline.id === item.id)
      } else {
        this.list = this.list.filter(item => item.title.indexOf(this.formInline.title) !== -1)
      }
    }
  }
}
</script>
