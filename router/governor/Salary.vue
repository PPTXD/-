<template>
    <div id="Salary">
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

      <el-container style="height: 700px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

        </el-aside>
        <el-container>
          <el-header style="text-align: right; font-size: 12px">

          </el-header>

          <el-main >
            <el-table :data="salary" border stripe>
              <el-table-column prop="userid" label="工号">
              </el-table-column>
              <el-table-column prop="name" label="姓名" >
              </el-table-column>
              <el-table-column prop="salarydate" label="日期">
              </el-table-column>
              <el-table-column prop="salary" label="实发工资" >
              </el-table-column>


              <el-table-column width="110" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="dialogFormVisible = true , point(scope.$index)">编辑</el-button>

                </template>
              </el-table-column>


            </el-table>
          </el-main>
        </el-container>
      </el-container>
<b>
      <el-dialog title="员工工资" :visible.sync="dialogFormVisible" >
        <el-form :model="salary1"  ref="salary1" label-width="100px" class="demo-ruleForm">

          <el-row :gutter="20">
            <el-col :span=11>
              <b><el-form-item label="工号：" prop="userid" :label-width="formLabelWidth">
                <span>{{salary1.userid}}</span>
              </el-form-item></b>
            </el-col>
            <el-col :span=11>
              <b><el-form-item label="姓名：" prop="name" :label-width="formLabelWidth">
                <span>{{salary1.name}}</span>
              </el-form-item></b>
             </el-col>
          </el-row>
          <el-row :gutter="20">
            <b><el-col :span=11>
              <el-form-item label="部门：" prop="userid" :label-width="formLabelWidth">
                <span>{{salary1.department}}</span>
              </el-form-item>
            </el-col></b>
            <el-col :span=11>
              <b><el-form-item label="职务：" prop="name" :label-width="formLabelWidth">
                <span>{{salary1.functions}}</span>
              </el-form-item></b>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span=11>
              <b><el-form-item label="基本工资：" prop="userid" :label-width="formLabelWidth">
                <el-input v-model="salary1.basesalary"></el-input>
              </el-form-item></b>

            </el-col>
            <el-col :span=11>
             <b> <el-form-item label="扣考核：" prop="name" :label-width="formLabelWidth">
               <span>{{salary1.fine}}</span>
             </el-form-item> </b>

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span=11>
             <b> <el-form-item label="工资日期：" prop="userid" :label-width="formLabelWidth">
                <el-date-picker type="date" placeholder="选择日期" v-model="salary1.salarydate" style="width: 100%;"></el-date-picker>
              </el-form-item></b>
            </el-col>
            <el-col :span=11>
             <b><el-form-item label="实发工资：" prop="name" :label-width="formLabelWidth">
               <el-input v-model="salary1.salary"></el-input>
            </el-form-item></b>
            </el-col>
          </el-row>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('salary1')">修改</el-button>
        </div>
      </el-dialog>
</b>

      <router-view/>
    </div>
</template>

<script>
  import axios from "axios";
  import moment from "moment";
    export default {
        name: "Salary",
      inject:['reload'],
      data(){
          return{

            salary:[],
            salary1:[],

            formLabelWidth: '120px',
            dialogTableVisible: false,
            dialogFormVisible: false,

          }
      },
      created() {
          this.getsalary();

      },
      methods:{
        point(index){
          this.salary1=JSON.parse(JSON.stringify(this.salary[index]));
          var that=this;
          axios.get('http://localhost:8888/user/getlatenumber2',{params:{
              userid:that.salary1.userid,
            }}).then(function (resp) {
              if(resp.data===''){
                that.salary1.fine=0;
              }else {
                that.salary1.fine=(resp.data)*50;
              }


          })
        },
          getsalary(){
            var that=this;
            axios.get('http://localhost:8888/governor/getsalary').then(function (resp) {
              that.salary=resp.data;
              console.log(resp.data);
              for(var i=0;i<that.salary.length;i++){
                that.salary[i].salarydate=moment(that.salary[i].salarydate).format('YYYY-MM-DD');
              }
            })
          },
        submitForm(salary1) {
          var that=this;

          this.$refs[salary1].validate((valid) => {
            if (valid) {
              axios.post('http://localhost:8888/governor/salary/update',that.salary1).then(function (resp) {
                // console.log(that.attendance1);
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
      }
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
