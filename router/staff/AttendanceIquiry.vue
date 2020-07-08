<template>
  <div id="AttendanceIquiry">
    <el-menu router  class="el-menu-demo" mode="horizontal"
             background-color="#3366FF"
             text-color="#FFFFFF"
             active-text-color="#ffd04b"
    >
      <el-menu-item index="/Staff">个人信息</el-menu-item>
      <el-menu-item index="/AttendanceIquiry">我的考勤</el-menu-item>
      <el-submenu index="2" >
        <template slot="title">请求申请</template>
        <el-menu-item index="/Applyday">请假申请</el-menu-item>
        <el-menu-item index="/Applyroom">会议室申请</el-menu-item>
      </el-submenu>
      <el-menu-item index="/Staff/RequestCheck/Boardroom" >请求查询</el-menu-item>
      <el-menu-item index="/login" @click="quit()">退出</el-menu-item>
    </el-menu>
    <el-form >
    <el-table :data="attendance">
      <el-table-column prop="userid" label="工号" >
      </el-table-column>
      <el-table-column prop="name" label="姓名" >
      </el-table-column>
      <el-table-column prop="today" label="今天签到时间" >
      </el-table-column>
      <el-table-column prop="number" label="本月签到次数" >
      </el-table-column>
      <el-table-column prop="latenumber" label="本月迟到次数" >
      </el-table-column>
    </el-table>
    </el-form>


  <router-view/>
  </div>
</template>

<script>
  import axios from "axios";
    export default {
        name: "AttendanceIquiry",
      data(){
          return{
            attendance:[],

        }
      },
      created() {
          this.getAttendance();
      },
      methods:{
          getAttendance(){
            var that=this;
            axios.get('http://localhost:8888/user/today').then(function (resp) {
              that.attendance=resp.data;

              console.log(resp.data);

            })
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

</style>
