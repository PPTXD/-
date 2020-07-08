<template>
    <div id="RequestCheckDay">
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
      <el-container style="height: 820px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu router :default-openeds="['1', '3']"><!-- 这里需要router-->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>导航栏</template>
              <el-menu-item-group>
                <template slot="title" ></template>
                <el-menu-item index="/Staff/RequestCheck/Boardroom">会议室申请</el-menu-item>
                <el-menu-item index="/Staff/RequestCheck/Day">请假申请</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>


        <el-container>
          <el-header style="text-align: right; font-size: 12px">
          </el-header>

          <el-main>
            <el-table :data="Applyday">
              <el-table-column prop="applyid" label="序列号" width="140">
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
              <el-table-column prop="bool" label="结果" width="140"><!-- 按钮-->
                <template slot-scope="scope"><!-- 流程是：先判断是否已经处理过了再判断是否准许-->
                  <i v-if="scope.row.bool2 >0"><!-- 这里处理过了-->
                    <i v-if="scope.row.bool >0" class="el-icon-check"><!-- 这里是准许了--></i>
                    <i v-if="scope.row.bool <1" class="el-icon-close"><!-- 这里是不准许--></i>
                  </i>
                  <i v-if="scope.row.bool2 <1">待处理</i>
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
  import axios from 'axios';
    export default {
        name: "RequestCheckDay",
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
            axios.get('http://localhost:8888/user/applyday/check').then(function (resp) {
              that.Applyday=resp.data;

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
