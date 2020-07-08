<template>
    <div id="AddStaff">
      <h2>增加员工</h2><br>

      <el-row>
        <el-col :span="11"><!-- span 是他的框框的长度-->
      <el-form :model="staff" :rules="rules" ref="staff" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="staff.name"></el-input>
        </el-form-item>

        <el-form-item label="家庭住址" prop="address">
          <el-input v-model="staff.address"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idcard">
          <el-input v-model="staff.idcard"></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="juguan">
          <el-input v-model="staff.juguan"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="tel">
          <el-input v-model="staff.tel"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="staff.email"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
        <el-select v-model="staff.education" placeholder="请选择">
          <el-option label="大专以下" value="大专以下"></el-option>
          <el-option label="大专" value="大专"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
          <el-option label="博士" value="博士"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="出生日期" required>
            <el-form-item prop="birthday">
              <el-date-picker type="date" placeholder="选择日期" v-model="staff.birthday" style="width: 100%;"
                              format="yyyy 年 MM 月 dd 日"
                              ></el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="staff.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="政治面貌" prop="politics">
          <el-radio-group v-model="staff.politics">
            <el-radio label="共青团员"></el-radio>
            <el-radio label="共产党员"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="婚姻状况" prop="marriage">
          <el-radio-group v-model="staff.marriage">
            <el-radio label="未婚 可撩"></el-radio>
            <el-radio label="已婚 勿扰"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门" prop="department">
        <el-select v-model="staff.department" placeholder="请选择">
          <el-option v-for="a in department" :key="a" :value="a" :label="a"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="职务" prop="functions">
          <el-select v-model="staff.functions" placeholder="请选择">

            <el-option label="干事" value="干事"></el-option>
            <el-option label="主管" value="主管"></el-option>
            <el-option label="经理" value="经理"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入职时间" required>
            <el-form-item prop="worktime">
              <el-date-picker type="date" placeholder="选择日期" v-model="staff.worktime" style="width: 100%;"
                              format="yyyy 年 MM 月 dd 日"
                             ></el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('staff')">立即增加</el-button>
          <el-button @click="resetForm('staff')">重置</el-button>
        </el-form-item>
      </el-form>
        </el-col>
        <el-col :span="11">
          <el-upload
            class="el-upload "
            action="http://localhost:8888/user/covers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">

            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

          </el-upload>
        </el-col>
      </el-row>
    <router-view/>
    </div>
</template>

<script>
  import axios from "axios";
    export default {
        name: "AddStaff",
      data() {
        return {
          department:[],//用来获取部门
          login:{
            userid:'',
            password:'123456789',
            roleid:'1',
            username:'',
          },


          salary:{
            userid:'',
            name:'',
            department:'',
            functions:'',
            basesalary:'',
            salarydate:'',
            fine:'',
            salary:'',
          },
          staff: {
            name:"",
            //age:"",
            address:"",
            department:"",
            sex:"",
            idcard:"",
            juguan:"",
            politics:"",
            marriage:"",
            tel:"",
            email:"",
            birthday:"",
            education:"",
            worktime:"",
            roleid:'1',
            functions:'',
            imgurl:'',
          },
          rules: {//规则，要求,prop 对应的属性，里面的requird是标注是否是必须的**
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' },
            ],

            address:[
              { required: true, message: '请输入家庭住址', trigger: 'blur' },
            ],
            juguan:[
              { required: true,message: '请输入籍贯', trigger: 'blur' },
            ],
            tel:[
              { required: true, message: '请输入电话号码', trigger: 'blur' },
              { min: 11, max: 11, message: '电话号码长度是11', trigger: 'blur' }
            ],
            email:[
              { required: true, message: '请输入电子邮箱', trigger: 'blur' },
            ],
            idcard:[
              { required: true, message: '请输入身份证', trigger: 'blur' },
            ],
            education:[
              { required: true, message: '请选择学历', trigger: 'change' }
            ],
            department:[
              { required: true, message: '请选择部门', trigger: 'change' }
            ],
           functions:[
             {required:true,message:"请选择职务",trigger:'change'}
           ],
            birthday: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            worktime: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            sex: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            politics: [
              { required: true, message: '请选择政治面貌', trigger: 'change' }
            ],
            marriage: [
              { required: true, message: '请选择婚姻状况', trigger: 'change' }
            ],
          },
          imageUrl: '',

        };
      },
      created() {
          //获取已有部门
        this.getdepartment();
        //console.log(this.login.username+this.login.password)
      },
      methods:{
          //上传头像
        handleAvatarSuccess(res, file) {
          console.log(res);
          this.staff.imgurl=res;
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
          getdepartment(){
            var that=this;
            axios.get('http://localhost:8888/governor/getdepartment').then(function (resp) {
              that.department=resp.data;
              console.log(resp.data);
            })
          },

        submitForm(staff) {
            var that=this;
          this.$refs[staff].validate((valid) => {
            if (valid) {//先创建账号信息
              axios.post('http://localhost:8888/user/Addlogin',that.login).then(function (resp) {
                console.log(resp.data);
                that.login.username=resp.data+that.staff.tel;
                that.login.userid=resp.data;
                console.log(that.login.username);
                axios.post('http://localhost:8888/user/createusername',{username:(that.login.username),userid:(that.login.userid)}).then(function (resp) {
                  console.log("username提交完成");
                  console.log(that.staff);
                  axios.post('http://localhost:8888/user/Addstaff',that.staff).then(function (resp) {
                    alert('提交完成！');
                    //.log(resp.data);
                    //在这里增加完员工之后，要相应的创建他的工资条信息
                    that.salary.userid=resp.data;
                    that.salary.name=that.staff.name;
                    that.salary.department=that.staff.department;
                    that.salary.functions=that.staff.functions;
                    console.log(that.salary);
                    axios.post('http://localhost:8888/governor/create',that.salary).then(function (resp) {
                      alert('工资条创建完成！');
                      that.$router.push("/Governor");
                    })
                  })
                })
              })
            } else {
              alert('请填写必要信息！！');
              return false;
            }
          });
        },
        resetForm(staff) {
          this.$refs[staff].resetFields();
        }

      }

    }
</script>

<style scoped>
  .el-upload {
    border-style: groove;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
