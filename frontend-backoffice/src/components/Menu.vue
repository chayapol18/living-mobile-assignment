<template>
  <div>
    <div style="display: flex; justify-content: space-between;">
      <p class="topic">Menu</p>
      <div class="add-button">
         <VueJsonToCsv
          :json-data="menuData" :csv-title="'menu'">
          <el-button type="info" round style="margin-right: 10px;">
            <i class="el-icon-download"></i> Download Menu Data
          </el-button>
        </VueJsonToCsv>
        <el-button @click="dialogVisible = true" class="size" type="primary">+ Add New Menu</el-button>
      </div>
    </div>
    <div class="menuTable">
      <data-tables :data="menuData" :total="10" >
        <div slot="empty" style="color: red">Menus is empty</div>
        <el-table-column prop="id" label="Id" width="100" sortable>
        </el-table-column>
        <el-table-column prop="catagoryId" label="Category Id" width="300" sortable>
        </el-table-column>
        <el-table-column prop="name" label="Name" width="300" sortable>
        </el-table-column>
        <el-table-column prop="price" label="Price" width="200" sortable>
        </el-table-column>
        <el-table-column fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="swap(scope.row)"><i class="el-icon-edit"></i></el-button>
            <el-button type="text" size="small" @click="copyMenu(scope.row)"><i class="el-icon-copy-document"></i></el-button>
            <el-button type="text" size="small" @click="openDialogDelete(scope.row)"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </data-tables>
    </div>
    <el-dialog class="add-menu-topic" title="Add Menu" :visible.sync="dialogVisible" width="612px">
      <el-form class="add-menu-form" :model="menuList" :rules="rules" ref="menuList">
        <el-form-item class="dialog-data" label="Category ID" prop="catagoryId">
            <el-select v-model="menuList.catagoryId" placeholder="">
              <el-option v-for="item in categoryData" :key="item.value" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="dialog-data" label="Menu name" prop="name">
          <el-input v-model="menuList.name"></el-input>
        </el-form-item>
        <el-form-item class="dialog-data" label="Menu price" prop="price">
          <el-input v-model="menuList.price"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addMenu('menuList')">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Edit Menu" :visible.sync="editMenuDialog" width="612px">
      <p class="dialog-data">Current Menu Data</p>
      <ol>
        <li class="dialog-data">Current Category ID : {{menuEdit.catagoryId}}</li>
        <li class="dialog-data">Current Menu Name : {{menuEdit.name}}</li>
        <li class="dialog-data">Current Menu Price : {{menuEdit.price}}</li>
      </ol>
      <br>
      <el-form :model="menuList" :rules="rules" ref="menuList">
        <el-form-item class="dialog-data" label="Category ID" prop="catagoryId">
            <el-select v-model="menuList.catagoryId" placeholder="Category ID">
              <el-option v-for="item in categoryData" :key="item.value" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="dialog-data" label="Menu name" prop="name">
          <el-input v-model="menuList.name"></el-input>
        </el-form-item>
        <el-form-item class="dialog-data" label="Menu price" prop="price">
          <el-input v-model="menuList.price"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editMenuDialog = false">Cancel</el-button>
        <el-button type="primary" @click="editMenu(menuEdit.id,'menuList')">Confirm
        </el-button>
      </span>
    </el-dialog>

    <el-dialog class="dialog-topic" title="Are you sure to delete menu ?" :visible.sync="deleteMenuDialog" width="30%" >
      <p class="dialog-data">Menu info</p>
      <br>
      <ol>
        <li class="dialog-data">Category ID : {{menuDelete.catagoryId}}</li>
        <li class="dialog-data">Menu Name : {{menuDelete.name}}</li>
        <li class="dialog-data">Menu Price : {{menuDelete.price}}</li>
      </ol>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteMenuDialog = false">Cancel</el-button>
        <el-button type="primary" @click="deleteMenuDialog = false;deleteMenu(menuDelete)">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import VueJsonToCsv from 'vue-json-to-csv'
export default {
  components: {
    VueJsonToCsv
  },
  data() {
    return {
      menuData: [],
      categoryData: [],
      menuEdit: [],
      menuDelete: [],
      dialogVisible: false,
      editMenuDialog: false,
      deleteMenuDialog: false,
      menuList: {
        name: '',
        price: '',
        catagoryId: '',
      },
      rules: {
        catagoryId: [
          { required: true, message: 'Please select Category name', trigger: 'blur' }
        ],
        name: [
          { required: true, message: 'Please input Menu name', trigger: 'blur' }
        ],
        price: [
          { required: true, message: 'Please input Menu price', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    async openDialogDelete(menuId){
       this.menuDelete = menuId
       this.deleteMenuDialog = true;
    },
    async swap(menuId){
      this.menuEdit = menuId
      this.editMenuDialog = true;
    },
    async fetchData() {
      try {
        let res = await axios.get('http://localhost:8888/menu')
        this.menuData = res.data.menu
      } 
      catch (error) {
        console.log(error);
      }
    },
    async fetchCategory(){
      try {
        let res = await axios.get('http://localhost:8888/category')
        this.categoryData = res.data.categories
      } 
      catch (error) {
        console.log(error);
      }
    },
    async editMenu(menuId, menuList) {
      this.$refs[menuList].validate((valid) => {
        if (valid) {
          this.editMenuDialog = false;
          this.$notify({
            title: 'สำเร็จ',
            message: 'แก้ไขข้อมูลเรียบร้อย',
            type: 'success'
          });
        } else {
          return
        }
      });
      console.log(menuId, menuList);
      try {
        await axios.put(`http://localhost:8888/menu/${menuId}`, this.menuList)
        this.menuList = {
          catagoryId: '',
          name: '',
          price: ''
        }
        this.fetchData();
      } 
      catch (error) {
        console.log(error);
        this.fetchData();
        this.$notify({
          title: 'ผิดพลาด',
          message: 'ข้อมูลที่ใส่ไม่ถูกต้อง',
          type: 'error'
        });
      }
    },
    async deleteMenu(menuId){
      console.log(menuId)
      try {
        await axios.delete(`http://localhost:8888/menu/${menuId.id}`)
        this.fetchData();
        this.$notify({
						title: 'สำเร็จ',
						message: 'ลบข้อมูลสำเร็จ',
						type: 'success'
				});
      } 
      catch (error) {
        this.fetchData();
        this.$notify({
						title: 'ผิดพลาด',
						message: 'ข้อมูลที่ลบไม่ถูกต้อง',
            type: 'error'
				});
      }
    },
    async copyMenu(menuList){
      try {
        await axios.post('http://localhost:8888/menu',menuList)
        this.$notify({
          title: 'สำเร็จ',
          message: 'คัดลอกข้อมูลสำเร็จ',
          type: 'success'
          });
        this.fetchData();
      } 
      catch (error) {
        console.log(error)
        this.$notify({
          title: 'ผิดพลาด',
          message: 'คัดลอกข้อมูลไม่สำเร็จ',
          type: 'error'
          });
        this.fetchData();
      }
    },
    async addMenu(menuList){
      this.$refs[menuList].validate((valid) => {
          if (valid) {
          this.dialogVisible = false;
          this.$notify({
          title: 'สำเร็จ',
          message: 'บันทีกข้อมูลเรียบร้อย',
          type: 'success'
          });
          }
          else {
            return 
          }
        });
      try {
        await axios.post('http://localhost:8888/menu',this.menuList)
        this.menuList = {
          catagoryId: '',
          name: '',
          price: ''
        }
        this.fetchData();
      } 
      catch (error) {
        console.log(error)
        this.fetchData();
      }
    },
  },
  created() {
      this.fetchData();
      this.fetchCategory();
    },
}
</script>

<style scope>
.menuTable{
  margin: 0px 172px;
  
}
.topic{
  margin-top: 8px;
  margin-left: 171px;
  font-weight: 500;
  font-size: 34px;
}
.add-button{
  margin-top: 5px;
  margin-right: 171px;
}
.size{
  width: 188px;
  height: 44px;
  background: #28B7FF;
  border-radius: 100px;
  color: white;
}
.add-menu-form{
  margin: 5%;
}
.dialog-topic{
  font-size: 20px;
}
.dialog-data{
  font-size: 15px;
}
</style>