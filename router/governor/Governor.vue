<template>
  <div id="Governor">
    <h2>人事管理</h2><br>
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
      <el-menu-item index="/login">退出</el-menu-item>
    </el-menu>

    <el-container style="height: 870px; border: 1px solid #eee">

        <el-header style="text-align: right; font-size: 12px">
          <div >
            <el-row :gutter="20" >
            <el-col :span="3" >
            <el-input
              placeholder="请输入工号"
              prefix-icon="el-icon-search"
              v-model="userid"
              clearable>
            </el-input>
            </el-col>

            <el-col :span="3" >
              <el-input
                placeholder="请输入姓名"
                prefix-icon="el-icon-search"
                v-model="Name"
                clearable>
              </el-input>
            </el-col>

            <el-col :span="3" >
              <el-select v-model="departmentsearch" clearable placeholder="请选择部门">
                <el-option
                  prefix-icon="el-icon-search"
                  v-for="item in department"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-col>

              <el-col :span="2" >
                <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
              </el-col>
              <el-col :span=12 >
                <el-button type="primary" icon="el-icon-plus" @click="Add()"></el-button>
              </el-col>
            </el-row>
          </div>
        </el-header>

      <el-container>

        <el-main>
          <el-table :data="staff" border stripe>
            <el-table-column prop="userid" label="工号">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="sex" label="性别" >
            </el-table-column>
            <el-table-column prop="department" label="部门" >
            </el-table-column>
            <el-table-column prop="functions" label="职务">
            </el-table-column>

            <el-table-column  width="110" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="dialogFormVisible = true,point(scope.$index)">编辑</el-button><!--有个小问题，在点了两次之后，前面一次改动没有保存的，还是在一样存在-->
                <el-button type="text" @click="Delete(scope.$index)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog title="员工信息" :visible.sync="dialogFormVisible" width="70%">

        <el-form :model="staff1" :rules="rules" ref="staff1" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="18">
          <el-form-item label="姓名" prop="name":label-width="formLabelWidth">
            <el-input v-model="staff1.name" ></el-input>
          </el-form-item>

          <el-form-item label="家庭住址" prop="address":label-width="formLabelWidth">
            <el-input v-model="staff1.address"></el-input>
          </el-form-item>
              <el-form-item label="身份证" prop="idcard":label-width="formLabelWidth">
                <el-input v-model="staff1.idcard"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-upload
                class="el-upload "
                action="http://localhost:8888/user/covers"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">

                <img v-if="staff1.imgurl" :size="190" :src="staff1.imgurl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>

              </el-upload>
            </el-col>
          </el-row>

          <el-form-item label="籍贯" prop="juguan":label-width="formLabelWidth">
            <el-input v-model="staff1.juguan"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="tel":label-width="formLabelWidth">
            <el-input v-model="staff1.tel"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email":label-width="formLabelWidth">
            <el-input v-model="staff1.email"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="staff1.education" placeholder="请选择">
              <el-option label="大专以下" value="大专以下"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" required>
            <el-form-item prop="birthday">
              <el-date-picker type="date" placeholder="选择日期" v-model="staff1.birthday" style="width: 100%;"
                              format="yyyy 年 MM 月 dd 日"
                             ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="staff1.sex" label="staff[index].sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="政治面貌" prop="politics">
            <el-radio-group v-model="staff1.politics">
              <el-radio label="共青团员"></el-radio>
              <el-radio label="共产党员"></el-radio>
              <el-radio label="其他"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="婚姻状况" prop="marriage">
            <el-radio-group v-model="staff1.marriage">
              <el-radio label="未婚 可撩"></el-radio>
              <el-radio label="已婚 勿扰"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-select v-model="staff1.department" placeholder="请选择">
              <el-option v-for="a in department" :key="a" :value="a" :label="a"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务" prop="functions">
            <el-select v-model="staff1.functions" placeholder="请选择">
              <el-option label="干事" value="干事"></el-option>
              <el-option label="主管" value="主管"></el-option>
              <el-option label="经理" value="经理"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入职时间" required>
            <el-form-item prop="worktime">
              <el-date-picker type="date" placeholder="选择日期" v-model="staff1.worktime" style="width: 100%;"
                              format="yyyy 年 MM 月 dd 日"
                              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-form>

      <div slot="footer" class="dialog-footer" style=" text-align: center;">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('staff1')">修改</el-button>
      </div>

    </el-dialog>

      <router-view/>
  </div>
</template>


<script>
  import App from "../../App";
import axios from "axios";
    export default {
        name: "Governor",
      inject:['reload'],
      data(){
        return{
          userid:'',
          Name:'',
          departmentsearch:'',//用来获取部门

          department:[],//用来获取部门
          staff:[],
          staff1:{},
          index:0,

          formLabelWidth: '120px',
          dialogTableVisible: false,
          dialogFormVisible: false,

          rules: {//规则，要求,prop 对应的属性，里面的requird是标注是否是必须的**
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' },
            ],

            address:[
              { required: true, message: '请输入家庭住址', trigger: 'blur' },
            ],
            juguan:[
              { required: true, type:'string', message: '请输入籍贯', trigger: 'blur' },
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
              { required: true, message: '请选择职务', trigger: 'change' }
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
        }
      },
      created() {
            //获取已有部门
        // console.log(App.userid);
        // console.log(App.Name);
        // console.log(App.departmentsearch);
            this.getdepartment();

      },
      methods:{
          //头像
        handleAvatarSuccess(res, file) {
          console.log(res);
          this.staff1.imgurl=res;
          //this.imageUrl = URL.createObjectURL(file.raw);
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
          //
          Add(){
            this.$router.push("/AddStaff");
          },
          search(){
            if(this.userid!==undefined){
              App.userid=this.userid;
            }
            if(this.Name!==undefined){
              App.Name=this.Name;
            }
            if(this.departmentsearch!==undefined){
              App.departmentsearch=this.departmentsearch;
            }

            this.reload()
          },
        getdepartment(){//这里需要先有创建部门的功能
          var that=this;
          axios.get('http://localhost:8888/governor/getdepartment').then(function (resp) {
            that.department=resp.data;
            //that.departmentsearch=resp.data;
            if(App.departmentsearch===null&&App.Name===null&&App.userid===null){
              that.getstaff();
            }else {
              that.getstaff1();
            }

          })
        },
          point(index){

            this.staff1=JSON.parse(JSON.stringify(this.staff[index]));
            this.staff1.birthday=new Date(this.staff1.birthday);
            this.staff1.worktime=new Date(this.staff1.worktime);
            console.log(this.staff1);
            //this.index=index;
          },
        Delete(index){
          var that=this;
          this.staff1=JSON.parse(JSON.stringify(this.staff[index]));
          axios.post('http://localhost:8888/user/staff/delete',that.staff1).then(function (resp) {
            that.reload();
          })

        },
        getstaff1(){
          var that=this;
          console.log(App.userid);
          console.log(App.Name);
          console.log(App.departmentsearch);
          axios.get('http://localhost:8888/user/staff/condition',{
            params:{
              userid:App.userid,
              Name:App.Name,
              departmentsearch:App.departmentsearch
            }}).then(function (resp) {
              that.userid=App.userid;
              that.Name=App.Name;
              that.departmentsearch=App.departmentsearch;
              App.userid=null;
              App.Name=null;
              App.departmentsearch=null;
            that.staff=resp.data;
          })
        },
          getstaff(){
            var that=this;
            axios.get('http://localhost:8888/user/staff/all').then(function (resp) {
              that.staff=resp.data;
            })
          },
        submitForm(staff1) {
          var that=this;
          this.$refs[staff1].validate((valid) => {
            if (valid) {
                  axios.post('http://localhost:8888/user/staff/update',that.staff1).then(function (resp) {
                    console.log(that.staff1);
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
  .el-upload {
    border-style: groove;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
