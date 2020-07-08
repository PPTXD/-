<template>
    <div id="Manager">
      <h2>管理者</h2>

      <el-menu router  class="el-menu-demo" mode="horizontal"
               background-color="#3366FF"
               text-color="#FFFFFF"
               active-text-color="#ffd04b">

        <el-menu-item @click="dialogRoleVisible = true">权限设置</el-menu-item>

        <el-menu-item @click="dialogSignVisible = true">考勤设置</el-menu-item>
        <el-menu-item index="/login" @click="quit()">退出</el-menu-item>
<!--        <el-menu-item style="text-align: left">选取前一个月</el-menu-item>-->
      </el-menu>

      <el-dialog title="权限设置" :visible.sync="dialogRoleVisible" >
        <el-form  label-width="100px" class="demo-ruleForm">

          <el-form-item label="工号" prop="userid">
            <el-select v-model="value1" @change="change" placeholder="请选择">
              <el-option  v-for="item in userid"
                          :key="item"
                          :label="item"
                          :value="item"
                          ></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="权限" prop="role">
            <el-select v-model="value2" placeholder="请选择">
              <el-option  v-for="item in role"
                          :key="item"
                          :label="item"
                          :value="item"
              ></el-option>

            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style=" text-align: center;">
          <el-button @click="dialogRoleVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">修改</el-button>
        </div>
      </el-dialog>

      <el-dialog title="考勤设置" :visible.sync="dialogSignVisible" >
        <el-form :model="time" label-width="100px" class="demo-ruleForm">

          <el-form-item label="签到时间" >
            <el-input v-model="time.signtime" placeholder="请设置">
            </el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style=" text-align: center;">
          <el-button @click="dialogSignVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitFormSign()">修改</el-button>
        </div>
      </el-dialog>

      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu router :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-search"></i>搜索</template>
              <el-menu-item-group>
               <template slot="title"><i class="el-icon-user-solid"></i>员工</template>
               <el-menu-item @click="alter('staff')">员工表</el-menu-item>
                <el-menu-item @click="alter('attendance')">考勤表</el-menu-item>
                <el-menu-item @click="alter('applyday')">请假表</el-menu-item>
                <el-menu-item @click="alter('applyroom')">会议室申请表</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <template slot="title"><i class="el-icon-s-custom"></i>人事管理</template>
                <el-menu-item @click="alter('login')">用户表</el-menu-item>
                <el-menu-item @click="alter('department')">部门表</el-menu-item>
                <el-menu-item @click="alter('salary')">工资表</el-menu-item>
                <el-menu-item @click="alter('boardroom')">会议室表</el-menu-item>
                <el-menu-item @click="alter('roomaskmsg')">会议室申请请求表</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <template slot="title"><i class="el-icon-s-check"></i>管理者</template>
                <el-menu-item @click="alter('developer')">管理员表</el-menu-item>
                <el-menu-item @click="alter('role')">角色表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>

<!--          <el-container>-->
            <el-main>

              <p v-if="tablename === 'staff'">
              <el-table :data="TableData"   stripe  style="width:100%">

                <el-table-column prop="roleid" label="角色ID" width="70">
                </el-table-column>
                <el-table-column prop="userid" label="工号" width="60">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="80">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="50">
                </el-table-column>
                <el-table-column prop="education" label="学历" width="80">
                </el-table-column>
                <el-table-column prop="department" label="部门">
                </el-table-column>
                <el-table-column prop="functions" label="职务">
                </el-table-column>
                <el-table-column prop="idcard" label="身份证">
                </el-table-column>
                <el-table-column prop="juguan" label="籍贯">
                </el-table-column>
                <el-table-column prop="marriage" label="婚姻状况">
                </el-table-column>
                <el-table-column prop="politics" label="政治面貌">
                </el-table-column>
                <el-table-column prop="email" label="电子邮箱">
                </el-table-column>
                <el-table-column prop="address" label="家庭住址">
                </el-table-column>
                <el-table-column prop="tel" label="电话号码">
                </el-table-column>
                <el-table-column prop="birthday" label="出生日期">
                </el-table-column>
                <el-table-column prop="worktime" label="入职日期">
                </el-table-column>
                <el-table-column prop="imgurl" label="图片路径">
                </el-table-column>
                <el-table-column width="40">
                  <el-button icon="el-icon-menu" size="mini" circle></el-button>
                </el-table-column>
              </el-table>
              </p>
              <p v-if="tablename === 'attendance'">
                <el-table :data="TableData"   stripe  style="width:100%">
                  <el-table-column prop="userid" label="工号"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="number" label="签到次数"></el-table-column>
                  <el-table-column prop="latenumber" label="迟到次数"></el-table-column>
                  <el-table-column prop="today" label="签到时间"></el-table-column>
                </el-table>
              </p>
              <p v-if="tablename === 'applyday'">
                <el-table :data="TableData"   stripe  style="width:100%">
                  <el-table-column prop="applyid" label="请假序列号"></el-table-column>
                  <el-table-column prop="userid" label="工号"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="department" label="部门"></el-table-column>
                  <el-table-column prop="type" label="请假类型"></el-table-column>
                  <el-table-column prop="starttime" label="开始日期"></el-table-column>
                  <el-table-column prop="finishtime" label="结束日期"></el-table-column>
                  <el-table-column prop="count" label="请假天数"></el-table-column>
                  <el-table-column prop="mes" label="请假原由"></el-table-column>
                </el-table>
              </p>
<!--              applyroom的按钮-->
              <p v-if="tablename === 'applyroom'">
                <el-header style="height: 30px; " >
                  <el-row >
                    <el-col :span="30" style="background: yellow;margin-left: 850px">
                  <el-button type="danger" size="mini"  @click="Del">删除</el-button>
                    </el-col>
                    <el-col :span="4">
                  <el-button style="height: 30px;text-align: center;background: #42b983;"
                             size="mini" type="info"
                             @click="KeyDel">一键</el-button></el-col>
                  </el-row>
                </el-header>
              </p>

              <p v-if="tablename === 'applyroom'">
                <el-table :data="TableData"   stripe  style="width:100%"
                          ref="multipleTable"
                          @selection-change="SelectionChange" >

                  <el-table-column type="selection" width="55" v-if="tablename === 'applyroom'" :key="1"></el-table-column>

                  <el-table-column prop="dex" label="申请序列号" ></el-table-column>
                  <el-table-column prop="userid" label="工号"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="department" label="部门"></el-table-column>
                  <el-table-column prop="daytime" label="所申请日期"></el-table-column>
                  <el-table-column prop="roomid" label="会议室ID"></el-table-column>
                  <el-table-column prop="timerange" label="时间段"></el-table-column>
                  <el-table-column prop="valuetime" label="时间戳"></el-table-column>
                  <el-table-column prop="bool" label="是否申请成功"></el-table-column>
                </el-table>
              </p>
              <p v-if="tablename === 'login'">
                <el-table :data="TableData"   stripe  style="width:100%">
                  <el-table-column prop="userid" label="工号"></el-table-column>
                  <el-table-column prop="roleid" label="角色ID"></el-table-column>
                  <el-table-column prop="username" label="用户名"></el-table-column>
                  <el-table-column prop="password" label="密码"></el-table-column>
                </el-table>
              </p>
              <p v-if="tablename === 'department'">
                <el-table :data="TableData"   stripe  style="width:100%">
                  <el-table-column prop="deptid" label="部门ID"></el-table-column>
                  <el-table-column prop="deptname" label="部门名称"></el-table-column>
                  <el-table-column prop="deptaddress" label="地址"></el-table-column>
                  <el-table-column prop="deptmanager" label="部长"></el-table-column>
                  <el-table-column prop="depttel" label="部门电话"></el-table-column>
                </el-table>
              </p>
              <p v-if="tablename === 'salary'">
                <el-table :data="TableData"   stripe  style="width:100%">
                  <el-table-column prop="userid" label="工号"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="department" label="部门"></el-table-column>
                  <el-table-column prop="functions" label="职位"></el-table-column>
                  <el-table-column prop="basesalary" label="基础工资"></el-table-column>
                  <el-table-column prop="fine" label="罚款"></el-table-column>
                  <el-table-column prop="salarydate" label="工资日期"></el-table-column>
                  <el-table-column prop="salary" label="实际薪水"></el-table-column>
                </el-table>
              </p>
              <p v-if="tablename === 'boardroom'">
                <el-table :data="TableData"   stripe  style="width:100%">
                  <el-table-column prop="roomid" label="会议室ID"></el-table-column>
                  <el-table-column prop="roomname" label="会议室名称"></el-table-column>
                  <el-table-column>
                    <template slot-scope="scope" v-if="tablename === 'boardroom'">
                    <!--                      template不受父元素约束-->
                      <el-button type="danger" @click="Delete(scope.$index)" circle icon="el-icon-delete"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </p>
              <!--              roomaskmsg的按钮     按照applyroom dex最低为标准，之前得请求都是旧的没必要了-->
              <p v-if="tablename === 'roomaskmsg'">
                <el-header style="height: 30px; " >
                  <el-row >
                    <el-col :span="30" style="background: yellow;margin-left: 850px">
                      <el-button type="danger" size="mini"  @click="Del2">删除</el-button>
                    </el-col>
                    <el-col :span="4">
                      <el-button style="height: 30px;text-align: center;background: #42b983;"
                                 size="mini" type="info"
                                 @click="KeyDel2">一键</el-button></el-col>
                  </el-row>
                </el-header>
              </p>
              <p v-if="tablename === 'roomaskmsg'">
                <el-table :data="TableData"   stripe  style="width:100%"
                          tooltip-effect="dark"
                          ref="multipleTable2"
                          @selection-change="SelectionChange">
                  <el-table-column type="selection" width="55" v-if="tablename === 'roomaskmsg'" :key="2"></el-table-column>
                  <el-table-column prop="raid" label="申请信息ID"></el-table-column>
                  <el-table-column prop="userid" label="工号"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="department" label="部门"></el-table-column>
                  <el-table-column prop="dex" label="申请序列号"></el-table-column>
                  <el-table-column prop="timerange" label="时间段"></el-table-column>
                  <el-table-column prop="roomid" label="会议室ID"></el-table-column>
                  <el-table-column prop="daytime" label="所申请日期"></el-table-column>
                  <el-table-column prop='bool' label="是否成功"></el-table-column>
                  <el-table-column prop="bool2" label="是否处理"></el-table-column>
                </el-table>
              </p>
              <p v-if="tablename === 'developer'">
                <el-table :data="TableData"   stripe  style="width:100%">
                  <el-table-column prop="id" label="id"></el-table-column>
                  <el-table-column prop="firsttime" label="初始状态"></el-table-column>
                  <el-table-column prop="todayvalue" label="今日时间戳"></el-table-column>
                  <el-table-column prop="ontime" label="签到时间"></el-table-column>
                </el-table>
              </p>
              <p v-if="tablename === 'role'">
                <el-table :data="TableData"   stripe  style="width:100%">
                  <el-table-column prop="roleid" label="角色ID"></el-table-column>
                  <el-table-column prop="rolename" label="角色名称"></el-table-column>
                  <el-table-column prop="rolepower" label="权利编号"></el-table-column>
                </el-table>
              </p>

            </el-main>
<!--          </el-container>-->
      </el-container>
      <router-view/>
    </div>

</template>

<script>
  import App from "../App";
    import axios from "axios";
    import moment from "moment";

    export default {
        name: "Manager",
      inject:['reload'],
      data(){
          return{
            formLabelWidth: '120px',
            dialogRoleVisible: false,
            dialogSignVisible: false,

            value1:'',
            value2:'',
            //userid:'',
            time:{
              signtime:'',
            },
            login:[],
            userid:[],
            role:[
              1,2,3
            ],

            TableData:[],
            // DataTable:{
            //   applyday:[],
            //   applyroom:[],
            //   attendance:[],
            //   boardroom:[],
            //   department:[],
            //   developer:[],
            //   login:[],
            //   role:[],
            //   roomaskmsg:[],
            //   salary:[],
            //   staff:[],
            // },
            tablename:'',
            multipleSelection:[],
            // checkbox1:[],
            Selection:[],//可以说是用来完成点了又点操作所需的数组
          }
      },
      created() {
          this.getontime();
          //console.log(App.tablename);
      },
      methods:{
          Del2(){//删的操作应该一样
            var that=this;
            var raid=[];
            for(var i=0;i<this.multipleSelection.length;i++){
              raid[i]=this.multipleSelection[i].raid;
            }
            axios.post('http://localhost:8888/governor/raid/delete',{name:window.JSON.stringify(raid)}).then(function (resp) {
              if(resp.data===1){
                // console.log(1);
                alert("删除成功！");
                that.multipleSelection.length=0;
                that.reload();
              }
            })

          },
          KeyDel2(){//根据dex来选择数据，只是获取数据的方式不同，后面的东西是一样的
            var that=this;
            var min;
            var k=0;
            axios.get('http://localhost:8888/user/dex/min').then(function (resp) {
              console.log(resp.data);
              min=resp.data;
              console.log(1);
              for (var i=0;i<that.TableData.length;i++){
                if(that.TableData[i].dex<min){
                  that.multipleSelection[k]=that.TableData[i];
                  k++;
                }
              }//获取前一个月的数据放在mS中

              if(that.multipleSelection!==that.Selection&&that.Selection.length===0){
                // this.Selection=this.multipleSelection;
                that.multipleSelection.forEach(row=>{//将这些行设置为true
                  that.$refs.multipleTable2.toggleRowSelection(row,true);//是把每一行数据都执行一遍这个而且会调用下面的SelectionChange（
                  // console.log("1");
                  that.Selection=that.multipleSelection;//存储这个到Selection，为了之后点了又点的操作实现。
                })
              }
              else {
                that.Selection=that.multipleSelection;
                that.multipleSelection.forEach(row=>{//将这些行设置为false
                  that.$refs.multipleTable2.toggleRowSelection(row,false);//是把每一行数据都执行一遍这个
                  // console.log("2");
                })
                that.Selection.length=0;
              }
            })
            // console.log(2);

            console.log(this.multipleSelection);

          },
          Del(){//把所勾选的applyroom数据删除
            var that=this;
            var Deldex=[];
            // console.log(window.JSON.stringify(that.multipleSelection));//头铁，数组传过去要先转为JSON格式，在后端以字符串格式接收，再转为数组。
            //   axios.post('http://localhost:8888/user/applyroom/delete',window.JSON.stringify(that.multipleSelection)).then(function (resp) {
            //
            //   })
            for(var i=0;i<this.multipleSelection.length;i++){
              Deldex[i]=this.multipleSelection[i].dex;
            }
            console.log(Deldex);
               axios.post('http://localhost:8888/user/applyroom/delete',{name: window.JSON.stringify(Deldex)}).then(function (resp) {
                 if(resp.data===1){
                   // console.log(1);
                   alert("删除成功！");
                   that.multipleSelection.length=0;
                   that.reload();
                 }
               })
          },
           KeyDel(){//自动选取前一个月的数据
             var that=this;
            var timeval=moment().valueOf();//这是当前的时间戳
            console.log(timeval);
            var timeval2=timeval-2592000000;//这是前一个月的时间戳
            console.log(timeval2);
            var k=0;

              for(var i=0;i<this.TableData.length;i++){
                if(this.TableData[i].valuetime<=timeval2){
                   this.multipleSelection[k]=this.TableData[i];
                   k++;
                }
              }//获取前一个月的数据行存储在multipleSelection
             // var
             if(this.multipleSelection!==this.Selection&&this.Selection.length===0){
               // this.Selection=this.multipleSelection;
               this.multipleSelection.forEach(row=>{//将这些行设置为true
                 that.$refs.multipleTable.toggleRowSelection(row,true);//是把每一行数据都执行一遍这个而且会调用下面的SelectionChange（
                 // console.log("1");
                 this.Selection=this.multipleSelection;//存储这个到Selection，为了之后点了又点的操作实现。
               })
              }
             else {
               this.Selection=this.multipleSelection;
               this.multipleSelection.forEach(row=>{//将这些行设置为false
                 that.$refs.multipleTable.toggleRowSelection(row,false);//是把每一行数据都执行一遍这个
                 // console.log("2");
               })
                 this.Selection.length=0;
             }

          },
          SelectionChange(val){
            // console.log(val);
            this.multipleSelection=val;
            // console.log("here");
            // console.log(this.multipleSelection);
          },
          Delete(index){
            // console.log("干");
             var that=this;
             console.log(that.TableData[index].roomid);
             axios.post('http://localhost:8888/user/boardroom/delete',that.TableData[index]).then(function (resp) {

               alert("删除成功！");
             })

             this.reload();
          },
          alter(name){
            this.tablename=name;
            App.tablename=name;
            console.log(this.tablename);
            var that=this;
            switch (name) {
              case 'staff':
                axios.get('http://localhost:8888/user/staff/all').then(function (resp) {
                  that.TableData=resp.data;
                  console.log(resp.data);
                })
                    break;
              case 'attendance':
                axios.get('http://localhost:8888/user/attendance/all').then(function (resp) {
                  that.TableData=resp.data;
                  console.log(resp.data);
                })
                break;
              case 'applyday':
                axios.get('http://localhost:8888/user/getapplyday/all').then(function (resp) {
                  that.TableData=resp.data;
                  console.log(resp.data);
                })
                break;
              case 'applyroom':
                axios.get('http://localhost:8888/user/getroommsg/all').then(function (resp) {
                  that.TableData=resp.data;
                  console.log(resp.data);
                })
                this.multipleSelection.length=0;
                this.Selection.length=0;
                break;
              case 'department':
                axios.get('http://localhost:8888/governor/getdepartment/all').then(function (resp) {
                  that.TableData=resp.data;
                  console.log(resp.data);
                })
                break;
              case 'boardroom':
                axios.get('http://localhost:8888/user/getboardroom/all').then(function (resp) {
                  that.TableData=resp.data;
                  console.log(resp.data);
                })
                break;
              case 'login':
                axios.get('http://localhost:8888/user/login/set').then(function (resp) {
                  that.TableData=resp.data;
                  console.log(resp.data);
                })
                break;
              case 'role':
                axios.get('http://localhost:8888/user/role/all').then(function (resp) {
                  that.TableData=resp.data;
                  console.log(resp.data);
                })
                break;
              case 'salary':
                axios.get('http://localhost:8888/governor/getsalary').then(function (resp) {
                  that.TableData=resp.data;
                  console.log(resp.data);
                })
                break;
              case 'roomaskmsg':
                axios.get('http://localhost:8888/governor/getroomaskmsg/all').then(function (resp) {

                  for (var i=0;i<resp.data.length;i++){
                    if (resp.data[i].bool===true){
                      resp.data[i].bool =1;
                    }else if (resp.data[i].bool===false){
                      resp.data[i].bool =0;
                    }
                    if (resp.data[i].bool2===true){
                      resp.data[i].bool2 =1;
                    }else if (resp.data[i].bool2===false){
                      resp.data[i].bool2 =0;
                    }
                  }
                  that.TableData=resp.data;
                  console.log(resp.data);
                })
                // console.log(this.multipleSelection.length);
                this.multipleSelection.length=0;
                this.Selection.length=0;
                // console.log(this.multipleSelection.length);
                break;
              case 'developer':
                axios.get('http://localhost:8888/developer/getdeveloper').then(function (resp) {
                  that.TableData=resp.data;
                  console.log(resp.data);
                })
                break;
            }

          },
        submitFormSign(){
          var that=this;
          axios.post('http://localhost:8888/developer/setontime',{ontime:that.time.signtime}).then(function (resp) {
            that.dialogSignVisible = false;
            that.reload()
          })
        },
        submitForm(){
          var that=this;
          axios.post('http://localhost:8888/user/login/update',{userid:that.value1,roleid:that.value2}).then(function (resp) {
            that.dialogRoleVisible = false;
            that.reload()
          })
        },
          change(value){
            for(var i=0;i<this.userid.length;i++) {
             if(this.userid[i]===value){
              this.value2=this.login[i].roleid;
              break;
             }
            }
          },
        getontime(){
          var that=this;
          axios.get('http://localhost:8888/developer/getontime').then(function (resp) {
            that.time.signtime=resp.data;
            that.getlogin();

          })
        },
          getlogin(){
            var that=this;
            axios.get('http://localhost:8888/user/login/set').then(function (resp) {
              that.login=resp.data;

              for(var i=0;i<that.login.length;i++){
                that.userid[i]=that.login[i].userid;
              }
              //console.log( that.userid);

            })
            if(App.tablename!==null){//刷新数据是根据tablename来指向刷新方向
              this.tablename=App.tablename;
              this.alter(this.tablename);
            }
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

</style>
