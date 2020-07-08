<template>
    <div id="AddDepartment">
      <h2>增加部门</h2><br>
      <el-form :model="department" :rules="rules" ref="department">
        <el-form-item label="部门名称 " prop="deptname">
          <el-col :span="11"><!-- span 是他的框框的长度-->
            <el-input v-model="department.deptname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="部门电话" prop="depttel">
          <el-col :span="11"><!-- span 是他的框框的长度-->
            <el-input v-model="department.depttel"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="部门管理员" prop="deptmanager">
          <el-col :span="12"><!-- span 是他的框框的长度-->
            <el-input v-model="department.deptmanager"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="部门地址 " prop="deptaddress">
          <el-col :span="11"><!-- span 是他的框框的长度-->
            <el-input v-model="department.deptmanager"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('department')">立即增加</el-button>
          <el-button @click="resetForm('department')">重置</el-button>
        </el-form-item>

      </el-form>
      <router-view/>
    </div>
</template>

<script>
  import axios from "axios";
    export default {
        name: "AddDepartment",
      data(){
          return{
            department:{
              deptid:"",
              deptname:"",
              deptaddress:"",
              deptmanager:"",
              depttel:"",
            },
            rules:{

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
            }

          }
      },
      created() {

      },
      methods:{//
        submitForm(department) {
          var that=this;
          this.$refs[department].validate((valid) => {
            if (valid) {
              axios.post('http://localhost:8888/governor/AddDepartment',that.department).then(function (resp) {
                alert('提交完成！');
                //that.$router.push("/Department");
              })

            } else {
              alert('请填写必要信息！！');
              return false;
            }
          });
        },
        resetForm(department) {
          this.$refs[department].resetFields();
        }

      }
    }
</script>

<style scoped>

</style>
