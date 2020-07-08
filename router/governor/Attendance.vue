<template>
    <div id="Attendance">
  <h2>考勤管理</h2><br>
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
            <el-table :data="attendance" border stripe>
              <el-table-column prop="userid" label="工号">
              </el-table-column>
              <el-table-column prop="name" label="姓名" >
              </el-table-column>
              <el-table-column prop="number" label="签到次数">
              </el-table-column>
              <el-table-column prop="latenumber" label="迟到次数" >
              </el-table-column>
              <el-table-column label="今日是否签到">
                <template slot-scope="scope">
                <p v-if="attendance[scope.$index].istoday===1">是</p>
                <p v-if="attendance[scope.$index].istoday!==1">否</p>
                </template>
              </el-table-column>
              <el-table-column prop="today" label="今日签到时间" >
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

      <el-dialog title="考勤管理" :visible.sync="dialogFormVisible" >
      <el-form :model="attendance1"  ref="attendance1" label-width="100px" class="demo-ruleForm">

        <el-row>
          <el-col :span="11">
            <el-form-item label="签到天数 ：" prop="number" :label-width="formLabelWidth">
              <span>{{attendance1.number}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-input-number v-model="num" @change="handleChange" :min="0" :max="7" ></el-input-number>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="迟到天数 ：" prop="latenumber" :label-width="formLabelWidth">
              <span>{{attendance1.latenumber}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-input-number v-model="latenum" @change="handleChange"  :min="-attendance1.latenumber" :max="0" ></el-input-number>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('attendance1')">修改</el-button>
      </div>
    </el-dialog>


      <router-view/>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Attendance",
      inject:['reload'],
      data(){
        return{
          num:0,
          latenum:1,

          attendance:[],
          attendance1:[],

          formLabelWidth: '120px',
          dialogTableVisible: false,
          dialogFormVisible: false,

        }
      },
      created() {
        this.day=Number(this.$moment().format('D'));
        this.year=Number(this.$moment().format('YYYY'));
        this.month=Number(this.$moment().format('MM'));
        console.log(this.day);
        console.log(this.year);
        console.log(this.month);
        this.getAttendance();
      },
      methods:{
        handleChange(value) {
          console.log(value);
        },
          point(index){
            this.attendance1=JSON.parse(JSON.stringify(this.attendance[index]));
          },
        Delete(index){
          var that=this;
          this.attendance1=JSON.parse(JSON.stringify(this.attendance[index]));
          axios.post('http://localhost:8888/user/attendance/delete',{userid:that.department1.userid}).then(function (resp) {
            that.reload();
          })

        },
        getAttendance(){
          var that=this;
          axios.get('http://localhost:8888/user/attendance/all').then(function (resp) {
            that.attendance=resp.data;
            console.log(resp.data);
            for(var i=0;i<that.attendance.length;i++){//这里是判断今天是否已经完成签到，并把数据存在istoday里面，用作数据展示
                var Y=0,M=0,D=0;
                Y=that.attendance[i].today.substring(0,4);
                M=that.attendance[i].today.substring(5,7);
                D=that.attendance[i].today.substring(8,10);
              if(that.year===Number(Y)&&that.month===Number(M)&&that.day===Number(D)){
                  that.attendance[i].istoday=1;//在拿取用户签到表中所记录的年月日的数据比对，在全相同情况下，用户是完成了今天的签到。
                  // console.log("here1");
                }else {
                  that.attendance[i].istoday=0;//今日未完成签到。
                   that.attendance[i].today="无";
                  // console.log("here2");
                }
            }
            console.log(resp.data);

          })
        },
        submitForm(attendance1) {
          var that=this;
          that.attendance1.number=that.attendance1.number+that.num;
          that.attendance1.latenumber=that.attendance1.latenumber+that.latenum;

          this.$refs[attendance1].validate((valid) => {
            if (valid) {
              axios.post('http://localhost:8888/user/attendance/update',{number:(that.attendance1.number),latenumber:(that.attendance1.latenumber),userid:(that.attendance1.userid)}).then(function (resp) {
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
