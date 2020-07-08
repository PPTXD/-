<template>
    <div id="RequestDay">
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


      <el-container style="height: 700px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu router :default-openeds="['1', '3']"><!-- 这里需要router-->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>导航栏</template>
              <el-menu-item-group>
                <template slot="title" ></template>
                <el-menu-item index="/RequestDay">处理申请</el-menu-item>
                <el-menu-item index="/RDayComplete">已处理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>


        <el-container>
          <el-header style="text-align: right; font-size: 12px">

          </el-header>

          <el-main >
            <el-table :data="Applyday" >
              <el-table-column prop="applyid" label="序列号" width="110">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="110">
              </el-table-column>
              <el-table-column prop="userid" label="工号" width="110">
              </el-table-column>
              <el-table-column prop="department" label="部门" width="110">
              </el-table-column>
              <el-table-column prop="starttime" label="开始日期" width="110">
              </el-table-column>
              <el-table-column prop="finishtime" label="结束日期" width="110">
              </el-table-column>
              <el-table-column prop="count" label="天数" width="110">
              </el-table-column>
              <el-table-column prop="type" label="请假类型" width="110">
                <template slot-scope="scope">
                  <i v-if="scope.row.type<2">事假</i>
                  <i v-if="scope.row.type<3&scope.row.type>1">年假</i>
                  <i v-if="scope.row.type>2">调休</i>
                </template>
              </el-table-column>

              <el-table-column width="110">
                <template slot-scope="scope">
                  <el-button type="text" @click="open(scope.$index)">查看</el-button>
                </template>
              </el-table-column>

              <el-table-column label="允许" width="110"><!-- 按钮-->
                <template slot-scope="scope">
                  <el-button type="success" icon="el-icon-check" circle  @click="allow(scope.$index)"></el-button>
                </template>>
              </el-table-column >

              <el-table-column width="110" label="拒绝"><!-- 按钮-->
                <template slot-scope="scope">
                  <el-button type="info" icon="el-icon-close" circle  @click="refuse(scope.$index)"></el-button>
                </template>>
              </el-table-column>


            </el-table>
          </el-main>

        </el-container>
      </el-container>

      <router-view/>
    </div>
</template>

<script>
  import axios from 'axios';
  import Applyday from "../staff/Applyday";
    export default {
        name: "RequestDay",
      inject:['reload'],
      data(){
          return{
            Applyday:[],

          }
      },
      created() {
          this.getapplyday();

      },
      methods:{

          getapplyday(){
            var that=this;
            axios.get('http://localhost:8888/user/getapplyday').then(function (resp) {
              that.Applyday=resp.data;
            })
          },
        allow(a){//需要高bool和bool2
            var that=this;
            that.Applyday[a].bool2=1;
            axios.post('http://localhost:8888/user/applyday/allow',{applyid:(that.Applyday[a].applyid)}).then(function (resp) {
              that.reload()
            })
        },
        refuse(a){//只要bool2
          var that=this;
          that.Applyday[a].bool2=1;
          axios.post('http://localhost:8888/user/applyday/refuse',{applyid:(that.Applyday[a].applyid)}).then(function (resp) {
            that.reload()
          })
        },
        open(a) {
          this.$alert(this.Applyday[a].mes, '请假原由', {
            confirmButtonText: '确定',
          }).catch(()=>{
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
