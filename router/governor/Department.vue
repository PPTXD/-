<template>
  <div id="Department">
    <h2>部门管理</h2><br>
    <el-menu router  class="el-menu-demo" mode="horizontal"
             background-color="#3366FF"
             text-color="#FFFFFF"
             active-text-color="#ffd04b"
    >
      <el-menu-item index="/Governor">人事管理</el-menu-item>
      <el-menu-item index="/Department">部门管理</el-menu-item>
      <el-submenu index="2" >
        <template slot="title">请求处理</template>
        <el-menu-item index="/RequestRoomFalse">会议室预约</el-menu-item>
        <el-menu-item index="/RequestDay">请假处理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/Attendance" >考勤管理</el-menu-item>
      <el-menu-item index="/Salary" >工资管理</el-menu-item>
      <el-menu-item index="/login" @click="quit()">退出</el-menu-item>
    </el-menu>

    <el-container style="height: 870px; border: 1px solid #eee">

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
         <div>
           <el-col :span=23 >
             <el-button type="primary" icon="el-icon-plus" @click="dialogAddVisible = true"></el-button>
           </el-col>
         </div>

        </el-header>
        <el-main>
          <el-table :data="department" border>
            <el-table-column prop="deptid" label="部门编号" >
            </el-table-column>
            <el-table-column prop="deptname" label="部门名称">
            </el-table-column>
            <el-table-column prop="deptaddress" label="部门地址">
            </el-table-column>
            <el-table-column prop="depttel" label="部门电话">
            </el-table-column>
            <el-table-column prop="deptmanager" label="部门主管" >
            </el-table-column>

            <el-table-column width="110" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="dialogFormVisible = true , point(scope.$index)">编辑</el-button>
                <el-button type="text" @click="Delete(scope.$index)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-main>

      </el-container>
    </el-container>


    <el-dialog title="部门信息" :visible.sync="dialogFormVisible" >
      <el-form :model="department1" :rules="rules" ref="department1" label-width="100px" class="demo-ruleForm">

        <el-form-item label="部门名称" prop="deptname" :label-width="formLabelWidth">
          <el-input v-model="department1.deptname" ></el-input>
        </el-form-item>
        <el-form-item label="部门地址" prop="deptaddress" :label-width="formLabelWidth">
          <el-input v-model="department1.deptaddress" ></el-input>
        </el-form-item>
        <el-form-item label="部门电话" prop="depttel" :label-width="formLabelWidth">
          <el-input v-model="department1.depttel" ></el-input>
        </el-form-item>
        <el-form-item label="部门主管" prop="deptmanager" :label-width="formLabelWidth">
          <el-input v-model="department1.deptmanager" ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('department1')">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="增加部门" :visible.sync="dialogAddVisible" >
      <el-form :model="departmentAdd" :rules="rulesAdd" ref="departmentAdd" label-width="100px" class="demo-ruleForm">

        <el-form-item label="部门名称 " prop="deptname">
          <el-col :span="15"><!-- span 是他的框框的长度-->
            <el-input v-model="departmentAdd.deptname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="部门电话" prop="depttel">
          <el-col :span="15"><!-- span 是他的框框的长度-->
            <el-input v-model="departmentAdd.depttel"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="部门管理员" prop="deptmanager">
          <el-col :span="15"><!-- span 是他的框框的长度-->
            <el-input v-model="departmentAdd.deptmanager"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="部门地址 " prop="deptaddress">
          <el-col :span="15"><!-- span 是他的框框的长度-->
            <el-input v-model="departmentAdd.deptmanager"></el-input>
          </el-col>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormAdd('departmentAdd')">创建</el-button>
        <el-button @click="resetFormAdd('departmentAdd')">重置</el-button>
      </div>
    </el-dialog>


    <router-view/>
  </div>
</template>

//1、先要有个从数据库拿取有哪些部门操作
//2、再根据部门展示内容

<script>
  import axios from "axios";
    export default {
        name: "Department",
      inject:['reload'],
        data(){
          return{
            departmentAdd:{
              deptid:"",
              deptname:"",
              deptaddress:"",
              deptmanager:"",
              depttel:"",
            },
            rulesAdd:{

              deptname:[
                { required: true, message: '请输入部门名称', trigger: 'blur' },
                { min: 3, max: 11, message: '长度为3-11', trigger: 'blur' }
              ],
              deptaddress:[
                { required: false, message: '请输入部门地址', trigger: 'blur' },
              ],
              deptmanager:[
                { required: false, message: '请填写部门管理员', trigger: 'blur' },
              ],
              depttel:[
                { required: false, message: '请填写部门电话', trigger: 'blur' },
              ],
            },

            //以上Add
            department:[],
            department1:{},

            formLabelWidth: '120px',
            dialogFormVisible: false,
            dialogAddVisible: false,
            rules:{
              deptname:[
                { required: true, message: '请输入部门名称', trigger: 'blur' },
              ],
           },

          }
    },
      created() {
          this.getdepartment();
      },
      methods:{
          // Add(){
          //   this.$router.push("/AddDepartment");
          // },
          point(index){
            //this.department1=this.department[index];     这里是引用传递，不是值传递
            this.department1=JSON.parse(JSON.stringify(this.department[index]));
            console.log(this.department1);
          },
        Delete(index){
          var that=this;
          this.department1=JSON.parse(JSON.stringify(this.department[index]));
          axios.post('http://localhost:8888/governor/department/delete',{deptid:that.department1.deptid}).then(function (resp) {
            that.reload();
          })

        },
          getdepartment(){
            var that=this;
            axios.get('http://localhost:8888/governor/getdepartment/all').then(function (resp) {
              that.department=resp.data;
              console.log(that.department);
            })
          },

        submitFormAdd(departmentAdd) {
          var that=this;
          this.$refs[departmentAdd].validate((valid) => {
            if (valid) {
              axios.post('http://localhost:8888/governor/AddDepartment',that.departmentAdd).then(function (resp) {
                alert('提交完成！');
                that.dialogAddVisible = false;
                that.reload()
              })

            } else {
              alert('请填写必要信息！！');
              return false;
            }
          });
        },
        resetFormAdd(departmentAdd) {
          this.$refs[departmentAdd].resetFields();
        },


        submitForm(department1) {
          var that=this;
          this.$refs[department1].validate((valid) => {
            if (valid) {
              axios.post('http://localhost:8888/governor/department/update',that.department1).then(function (resp) {
                console.log(that.department1);
                alert('修改完成！');
                that.dialogFormVisible = false;
                that.reload()
              })
            } else {
              alert('请填写必要信息！！');
              return false;
            }
          });
        },
        quit:function () {
          // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
          window.onbeforeunload = function (e) {
            var storage = window.localStorage;
            storage.clear();
          }
        }
      },
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
