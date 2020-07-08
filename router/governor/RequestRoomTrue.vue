<template>
    <div id="RequestRoomTrue">
      <h2>请求处理</h2><br>

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
      <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu router :default-openeds="['1', '3']"><!-- 这里需要router-->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>导航栏</template>
              <el-menu-item-group>
                <template slot="title" ></template>
                <el-menu-item index="/RequestRoomFalse">处理申请</el-menu-item>
                <el-menu-item index="/RequestRoomTrue">已处理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>


        <el-container>
          <el-header style="text-align: right; font-size: 12px">

          </el-header>

          <el-main>
            <el-table :data="roomAskmsgt">
              <el-table-column prop="raid" label="序列号" width="140">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="140">
              </el-table-column>
              <el-table-column prop="department" label="部门" width="140">
              </el-table-column>
              <el-table-column prop="roomid" label="会议室编号" width="140">
              </el-table-column>
              <el-table-column prop="daytime" label="日期" width="140">
              </el-table-column>
              <el-table-column prop="timerange" label="时间段" width="140">
              </el-table-column>
              <el-table-column><!-- 按钮-->
                <template ><i class="el-icon-check"/>
                </template>
              </el-table-column>


            </el-table>
          </el-main>

        </el-container>
      </el-container>



      <router-view/>
    </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "RequestRoomTrue",
    data(){
      return{

        roomAskmsgt:[],

      }
    },
    created() {
      this.getroomAskmsgtrue();

    },
    methods:{
      getroomAskmsgtrue(){
        var that=this;
        axios.get('http://localhost:8888/governor/getroomAskmsg/true').then(function(resp){
          that.roomAskmsgt=resp.data;
          console.log(that.roomAskmsgt);
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
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
