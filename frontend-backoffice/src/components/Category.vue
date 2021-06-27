<template>
  <div>
    {{this.categoryId}}
    <div class="head-category">
      <p style="font-size: 34px; font-weight: 700;">Category</p>
      <el-button type="primary" round @click="addDialogVisible = true"><i class="el-icon-plus" style="margin-right: 9px"></i> Add New Category</el-button>
    </div>

    <data-tables :data="tableData" :total="10">
      <div slot="empty" style="color: red">Data is empty</div>
      <el-table-column prop="id" label="ID" width="200" sortable>
      </el-table-column>
      <el-table-column prop="Store.name" label="Store" width="400" sortable>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="400" sortable>
      </el-table-column>
      <el-table-column fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="large" @click="editDialogVisible = true; getCategoryData(scope.row)"><i class="el-icon-edit"></i></el-button>
          <el-button type="text" size="large" @click="deleteDialogVisible = true; getCategoryData(scope.row)"><i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </data-tables>

    <!-- Modal Add -->
    <el-dialog
      title="Add Category"
      :visible.sync="addDialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form :model="formAdd" :rules="rules" ref="formAdd">
        <el-form-item label="Name" prop="name">
          <el-input v-model="formAdd.name"></el-input>
        </el-form-item>
        <el-form-item label="Store" prop="storeId">
          <el-select v-model="formAdd.storeId" placeholder="Please select store">
            <el-option
            v-for="item in storeData"
            :key="item.value"
            :label="item.name"
            :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addCategory('formAdd'); ">Save</el-button>
      </span>
    </el-dialog>

    <!-- Modal Edit -->
    <el-dialog
      title="Edit Category"
      :visible.sync="editDialogVisible"
      width="50%"
      :before-close="handleEditClose">
      <el-form :model="formEdit" :rules="rules" ref="formEdit">
        <el-form-item label="Name" prop="name">
          <el-input v-model="formEdit.name"></el-input>
        </el-form-item>
        <el-form-item label="Store"  prop="storeId">
          <el-select v-model="formEdit.storeId" placeholder="Please select store">
            <el-option
            v-for="item in storeData"
            :key="item.value"
            :label="item.name"
            :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editCategory('formEdit')">Edit</el-button>
      </span>
    </el-dialog>

    <!-- Modal Delete -->
    <el-dialog
      title="Delete Category"
      :visible.sync="deleteDialogVisible"
      width="30%"
      :before-close="handleDeleteClose">
      <span>Are you sure to delete this Category ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="deleteData">Delete</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible: false,
      formAdd: {
        name: '',
        storeId: ''
      },
      formEdit: {
        id: '',
        name: '',
        storeId: ''
      },
      storeData: [],
      categoryId: '',
      rules: {
        name: [
          { required: true, message: 'Please input category name', trigger: 'blur' },
        ],
        storeId: [
          { required: true, message: 'Please choose store', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('Are you sure to close add dialog?')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleEditClose(done) {
      this.$confirm('Are you sure to close edit dialog?')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleDeleteClose(done) {
      this.$confirm('Are you sure to close delete dialog?')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    async fetchData() {
      try {
        const response =  await axios.get('http://localhost:8888/category')
        const data = await axios.get('http://localhost:8888/store')
        console.log(response)
				this.tableData = response.data.categories
        // const store = data.map()
        this.storeData = data.data.stores
      } catch (err) {
        console.log('error fetchData', err);
      }
    },
    async addCategory (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDialogVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });

      try {
        await axios.post('http://localhost:8888/category', this.formAdd)
        this.formAdd = {
          name: '',
          storeId: ''
        },
        this.fetchData()
      } catch (err) {
        console.log(err);
      }
    },
    getCategoryData (row) {
      this.formEdit = {
        id: row.id,
        name: row.name,
        storeId: row.Store.id
      }
    },

    async editCategory(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editDialogVisible = false
        } else {
          console.log('error edit!!');
          return false;
        }
      });

      try {
        await axios.put(`http://localhost:8888/category/${this.formEdit.id}`, this.formEdit)
        this.editDialogVisible = false
        this.fetchData()
      } catch (err) {
        console.log(err)
      }
    },

    async deleteData() {
      try {
        await axios.delete(`http://localhost:8888/category/${this.formEdit.id}`)
        this.deleteDialogVisible = false
        this.fetchData()
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>
.head-category {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 17px;
}

</style>