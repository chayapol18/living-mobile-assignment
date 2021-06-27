<template>
  <div class="store">
    <!-- table -->

    <div class="topic">
      <div class="title">Store</div>
      <div class="addNewStore">
        <el-button class="btn-add" @click="showDialogAddStore"><i class="el-icon-plus"></i>Add New Store</el-button>
      </div>
    </div>
    <div class="contents">
      <data-tables :data="dataFromApi" :total="10" @sort-change="sortChange" @current-page="currentPage"
        @size-change="sizeChange" :header-cell-style="{ background: 'blue' }">
        <div slot="empty" style="color: red">Users is empty</div>
        <el-table-column prop="id" label="ID" width="200" sortable>
        </el-table-column>
        <el-table-column prop="name" label="Name" width="400" sortable>
        </el-table-column>
        <el-table-column prop="description" label="Description" width="200" sortable>
        </el-table-column>
        <el-table-column prop="rating" label="Rating" width="200" sortable>
        </el-table-column>
        <el-table-column fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showEditdataToForm(scope.row)"><img src="@/assets/Edit.png"></el-button>
            <el-button type="text" size="small" @click="copyData(scope.row)"><img src="@/assets/Copy.png"></el-button>
            <el-button type="text" size="small" @click="deleteData(scope.row)"><img src="@/assets/Delete.png"></el-button>
          </template>
        </el-table-column>
      </data-tables>
    </div>
    <!-- dialog addStore -->
    <el-dialog class="dialog-add" title="Add Store" :visible.sync="dialogFormVisible">
      <!-- <el-form class="form" :model="form">

        <el-form-item label="Store Name" prop="age" :rules="[{ required: true, message: 'store name is required'}]">
          <div class="m-g-t-17">
            <el-input class="m-g-t-6" v-model="form.name" autocomplete="off"></el-input>
          </div>
        </el-form-item>

        <div class="m-g-t-17">
          <span class="form-title">Description</span>
          <el-input class="m-g-t-6" v-model="form.description" autocomplete="off"></el-input>
        </div>
        <div class="m-g-t-17">
          <div>Description</div>
          <el-select v-model="form.rating" placeholder="Select">
            <el-option v-for="item in rate" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </el-form> -->
      <!-- <span slot="footer" class="dialog-footer p-d-r-85">
        <button class="btn bg-white color-blue" @click="dialogFormVisible = false">Cancel</button>
        <button class="btn bg-blue color-white" v-if="showEditBtn == true" @click="editData()" >Edit Store</button>
        <button class="btn bg-blue color-white" v-if="showSaveBtn == true" @click="createData">Add Store</button>
      </span> -->
      <!--  -->
      <el-form class="form" :model="form" status-icon :rules="rules" ref="form">

        <el-form-item label="Store Name" prop="name">
          <div class="m-g-t-17">
            <el-input class="m-g-t-6" v-model="form.name" autocomplete="off"></el-input>
          </div>
        </el-form-item>

        <div class="m-g-t-17">
          <span class="form-title">Description</span>
          <el-input class="m-g-t-6" v-model="form.description" autocomplete="off"></el-input>
        </div>
        <div class="m-g-t-17">
          <span class="form-title">Rating</span>
          <el-select v-model="form.rating" placeholder="Select">
            <el-option v-for="item in rate" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer p-d-r-85">
        <button class="btn bg-white color-blue" @click="dialogFormVisible = false">Cancel</button>
        <button class="btn bg-blue color-white" v-if="showEditBtn == true" @click="editData()">Edit Store</button>
        <button class="btn bg-blue color-white" v-if="showSaveBtn == true" @click="createData('form')">Add Store</button>
      </span>
      </el-dialog>

      <!-- dialog delete comfrim -->
      <el-dialog title="Delete Store" :visible.sync="DialogVisibleConfirmDelete" width="30%" center>
        <div class="flex-center">
          Are you sure you want to delete this Store ?
        </div>
        <span slot="footer" class="dialog-footer">
          <button class="btn bg-white color-blue" @click="DialogVisibleConfirmDelete = false">Cancel</button>
          <button class="btn bg-blue color-white" @click="confirmToDelete">Confirm</button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    // 
    var validateStoreName = ( rule, value, callback)=>{
      console.log(value);
      if(value === ''){
        callback(new Error('Please input the Store Name'));
      }
      else {
          callback();
      }
    }
    // 
    return {
      form: {
        name: '',
        description: '',
        rating: ''
      },
      rules:{
        name:[
          {required: true ,validator: validateStoreName, trigger: 'blur' }
        ],
      },
      // 
      showEditBtn: false,
      showSaveBtn: false,
      DialogVisibleConfirmDelete: false,
      Deletecomfirm: false,
      id:'',
      dataFromApi: [],
      dialogFormVisible: false,
      rate:[
        {
          value:1,
          lable: 1,
        },{
          value:2,
          lable:2,
        },{
          value:3,
          lable:3,
        },{
          value:4,
          lable:4,
        },{
          value:5,
          lable:5,
        },{
          value:6,
          lable:6,
        },{
          value:7,
          lable:7,
        },{
          value:8,
          lable:8,
        },{
          value:9,
          lable:9,
        },{
          value:10,
          lable: 10,
        },
      ],
      
    }
  },
  methods: {
    showDialogAddStore() {
      this.dialogFormVisible = true;
      this.showEditBtn = false;
      this.showSaveBtn = true;
    },
    submitNewStore() {
      this.dialogFormVisible = false;
      console.log(this.form);
    },
    async fetchData() {
      try {
        let res = await axios.get("http://localhost:8888/store");
        console.log(res);
        this.dataFromApi = res.data.stores;
      } catch (error) {
        console.log(error);
      }
    },
    async createData(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log(valid);
        if (valid) {
          let res = await axios.post("http://localhost:8888/store", this.form);
          console.log(res);
          this.dialogFormVisible = false;
          this.fetchData();
          console.log(this.form);
          this.form = {
            name: '',
            description: '',
            rating: ''
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async copyData(data) {
      console.log(data);
      this.form = {
        name: data.name,
        description: data.description,
        rating: data.rating
      }
      let res = await axios.post("http://localhost:8888/store", this.form);
      console.log(res);
      this.dialogFormVisible = false;
      this.fetchData();
      console.log(this.form);
      this.form = {
        name: '',
        description: '',
        rating: ''
      }
    },
    deleteData(dataFromApi){
      console.log(dataFromApi);
      this.DialogVisibleConfirmDelete = true;
      this.id = dataFromApi.id;
    },
    async confirmToDelete(){
      await axios.delete(`http://localhost:8888/store/${this.id}`);
        this.DialogVisibleConfirmDelete = false;
        this.fetchData();
        this.id='';
    },
    showEditdataToForm(data){
      console.log(data);
      this.showSaveBtn = false;
      this.showEditBtn = true;
      this.id = data.id;
      this.form = {
        name: data.name,
        description: data.description,
        rating: data.rating
      }
      this.dialogFormVisible = true;

      this.fetchData();
    },

    async editData(){
      console.log(this.form);
      console.log(this.id);
      await axios.put(`http://localhost:8888/store/${this.id}`,this.form);
      this.id = '';
      this.dialogFormVisible = false;
      this.fetchData();
      this.form = {
        name: '',
        description: '',
        rating: ''
      }
    }

  },
  mounted () {
    this.fetchData();
  },
  computed:{
    comfirm(){
      return this.Deletecomfirm
    }
  }

}
</script>

<style>

.store{
  margin-left: 171px;
  margin-right: 171px;
}

.topic{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
}

.el-icon-plus{
  margin-right: 9px;
}

.btn-add{
  width: 188px;
  height: 44px;
  border-radius: 100px;
  border: none;
  background-color: #28B7FF;
  color: #ffff;
}

.dialog-add{
  border-radius: 8px;
}

.el-dialog{
  border-radius: 8px;
}

.el-dialog__body{
  padding: 0px;
  border-top: 1px solid #D9D9D9;
}

.form{
  margin-left: 85px;
  margin-right: 85px;
}

.flex-center{
  display: flex;
  justify-content: center;
}

.m-g-t-17{
  margin-top: 17px;
}

.m-g-t-6{
  margin-top: 6px;
}

.m-g-t-34{
  margin-top: 34px;
}

.p-d-r-85{
  padding-right: 85px;
}

.btn{
  width: 124px;
  height: 44px;
  border-radius: 100px;
  border: none;
}

.bg-white{
  background-color: #fff;
}

.bg-blue{
  background-color: #28B7FF;
}

.color-white{
  color: #fff;
}

.color-blue{
  color: #28B7FF;
}

/* .el-dialog__footer{
  padding-right: 85px;
} */

.form-title{
  font-size: 14px;
  font-weight: 500;
}

/* arrow dropdown */
.el-icon-arrow-up:before{ 
  color: #28B7FF;
  /* border: 2px solid #28B7FF */
}

.el-input__inner{
  border-radius: 8px;
}

.el-select{
  width: 100%;
}

.el-dialog__footer{
  margin-top: 34px;
}




</style>