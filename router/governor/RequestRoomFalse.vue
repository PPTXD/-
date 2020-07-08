<template>
    <div id="RequestRoomFalse">
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

      <el-container style="height: 100%; border: 1px solid #eee">
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
            <div>
              <el-col :span=23 >
                <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true"></el-button>
              </el-col>
            </div>
          </el-header>

          <el-main>
            <el-table :data="roomAskmsgf">
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
                <template slot-scope="scope">
                  <el-button :disabled="scope.row.bool2" @click="allow(scope.$index)">准许</el-button>
                </template>>
              </el-table-column>

            </el-table>
          </el-main>

        </el-container>
      </el-container>

      <el-dialog title="增加会议室" :visible.sync="dialogFormVisible" >
        <el-form :model="boardroom" :rules="rules" ref="boardroom" label-width="100px" class="demo-ruleForm">

          <el-form-item label="会议室名称 " prop="roomname">
            <el-col :span="15"><!-- span 是他的框框的长度-->
              <el-input v-model="boardroom.roomname"></el-input>
            </el-col>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('boardroom')">创建</el-button>
          <el-button @click="resetForm('boardroom')">重置</el-button>
        </div>
      </el-dialog>

      <router-view/>
    </div>
</template>

<script>
  import axios from "axios";
    export default {
        name: "RequestRoomFalse",
      inject:['reload'],
      data(){
        return{
          roomAskmsgf:[],
          boolean:[],

          formLabelWidth: '120px',
          dialogFormVisible: false,

          boardroom:{
            roomid:'',
            roomname:'',
          },
          rules:{
            roomname:[
              { required: true, message: '请输入会议室名称', trigger: 'blur' },
            ]
          }
        }
      },
      created() {
          this.getroomAskmsgfalse();
      },
      methods:{
          Add(){

          },
          getroomAskmsgfalse(){
            var that=this;
            axios.get('http://localhost:8888/governor/getroomAskmsg/false').then(function(resp){
              that.roomAskmsgf=resp.data;
              console.log(that.roomAskmsgf);
            })
          },
        allow(a){//这里处理上传被准许的请求,同时把申请同一时段的同一会议室的申请也一起处理掉，同意的只需要bool改1，然后同dex的不变为0但是bool2全改1（raid是改bool，dex是改bool2 ）
          var that=this;
          axios.post('http://localhost:8888/governor/postroomAskmsg/true/raid',{raid:(that.roomAskmsgf[a].raid)}).then(function (resp) {
            axios.post('http://localhost:8888/governor/postroomAskmsg/true/dex',{dex:(that.roomAskmsgf[a].dex)}).then(function (resp) {
              that.reload();
            })
          })

        },
        submitForm(boardroom) {
          var that=this;
          this.$refs[boardroom].validate((valid) => {
            if (valid) {
              axios.post('http://localhost:8888/user/addboardroom',that.boardroom).then(function (resp) {
                alert('提交完成！');
                that.dialogFormVisible = false;
                that.reload()
              })

            } else {
              alert('请填写必要信息！！');
              return false;
            }
          });
        },
        resetForm(boardroom) {
          this.$refs[boardroom].resetFields();
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
