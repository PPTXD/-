<template>
<div id="Applyroom">
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

  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '3']"><!-- 这里需要router-->
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-search"></i>搜索</template>
          <el-menu-item-group>
            <template slot="title" ></template>

            <el-submenu index="1-1">
              <template slot="title">会议室编号</template>
              <p v-for="(item,i) in roomid">
<!--                i是键名-->
              <el-menu-item @click="demo1(item)">{{item}}</el-menu-item>
              </p>
            </el-submenu>
            <el-submenu index="1-2">
              <template slot="title">时间</template>
              <p v-for="(item,i) in daytime">
                <el-menu-item @click="demo2(item)">{{item}}</el-menu-item>
              </p>
            </el-submenu>
            <el-submenu index="1-3">
              <template slot="title">时间段</template>
              <p v-for="(item,i) in timerange">
                <el-menu-item @click="demo3(item)">{{item}}</el-menu-item>
              </p>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>


    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-button type="info" class=" background-color: #B3C0D1" @click="submit()">
          提交 <i class="el-icon-upload2" ></i>
        </el-button>
      </el-header>

      <el-main >

        <el-table :data="applyroom1" >
          <el-table-column prop="dex" label="序列号" width="110">
          </el-table-column>
          <el-table-column prop="roomid" label="会议室编号" width="110">
          </el-table-column>
          <el-table-column prop="daytime" label="时间" width="110">
          </el-table-column>
          <el-table-column prop="timerange" label="时间段" width="110">
          </el-table-column>
          <el-table-column label="选择" width="110"><!-- 按钮-->
            <template slot-scope="scope">
              <el-checkbox  @change="point(scope.$index,scope.row.dex)" :checked="box"></el-checkbox>
            </template>>
          </el-table-column >
        </el-table>

      </el-main>

    </el-container>
  </el-container>

  <!--<p v-for="a in applyroom1" v-if="todayvalue<a.valuetime&!a.bool" >

    {{a.dex}},{{a.roomid}},{{a.timerange}},{{a.daytime}}

  -->
</div>
</template>

<script>

  import App from "../../App";
    import axios from "axios";

    const Method={//时间戳
      getTimestamp(time) { //把时间日期转成时间戳
        return (new Date(time)).getTime()
      }
    }

      export default {

        name: "Applyroom",
      inject:['reload'],
        data(){
          return{

            box:false,
            loading:true,
            checkList:[],
            applyroom1:[],//获取

            roomid:[],
            daytime:[],
            timerange:[],

            todayvalue:"",
            roomAskmsg:{//传
              userid:"",//申请者的工号
              name:"",//申请者的名字
              department:"",//申请者的部门
              dex:"",//会议室请求编号
              timerange:'',
              daytime:'',//当日的日期
              roomid:'',
              bool:false,
              bool2:false,

            },
            time:'',
            // pickerOptions: {
            //   shortcuts: [{
            //     text: '最近一周',
            //     onClick(picker) {
            //       const end = new Date();
            //       const start = new Date();
            //       end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
            //       picker.$emit('pick', [start, end]);
            //
            //     }
            //   }]
            // },

          }
    },
      created() {
        //this.savedaytime();//好像不应该放在这里!!!!//在判断的时候应该在开发者哪里设一个bool来判定
        this.time=this.$moment().format('YYYY-MM-DD');
        this.todayvalue=Method.getTimestamp(this.time);
        if(App.common!=='no'){//commom是公共存储数据的，roomid，daytime，timerange
          console.log(1+App.common);
          this.showget1();
        }else {
          console.log(2+App.common);
          this.showget();
        }

      },
      methods: {
        demo1(item){
          App.common=item;
          App.type="roomid";
          console.log(App.common);
          this.reload()
        },
        demo2(item){
          App.common=item;
          App.type="daytime";
          console.log(App.common);
          this.reload()
        },
        demo3(item){
          App.common=item;
          App.type="timerange";
          console.log(App.common);
          console.log(App.type);
          this.reload()
        },
          getstaff(){
            var that=this;//这里一定要的！！！！
            axios.get('http://localhost:8888/user/staff').then(function (resp) {
              that.roomAskmsg.userid=resp.data[0].userid;
              that.roomAskmsg.name=resp.data[0].name;
              that.roomAskmsg.department=resp.data[0].department;

            })
          },
          showget1(){
            var that=this;//这里一定要的！！！！

              axios.get('http://localhost:8888/user/getroommsg/2',{
                params:{
                  todayvalue: that.todayvalue,
                  type: App.type,
                 common: App.common
                }}).then(function (resp) {
                that.applyroom1=resp.data;
                //获取 daytime，timerange，roomid的值
                axios.get('http://localhost:8888/user/getroommsg/roomid').then(function (resp) {
                  that.roomid=resp.data;
                  console.log(resp.data)
                  axios.get('http://localhost:8888/user/getroommsg/daytime',{params:{
                      todayvalue: that.todayvalue,
                      roomid: App.common
                    }}).then(function (resp) {
                    that.daytime=resp.data;
                    console.log(resp.data)
                    axios.get('http://localhost:8888/user/getroommsg/timerange').then(function (resp) {
                      that.timerange=resp.data;
                      console.log(resp.data)
                    })
                  })
                })
                that.getstaff();
              })
          },
          showget(){
            var that=this;//这里一定要的！！！！
            axios.get('http://localhost:8888/user/getroommsg',{params:{
              todayvalue: that.todayvalue
            }}).then(function (resp) {
              that.applyroom1=resp.data;
              //获取 daytime，timerange，roomid的值
              axios.get('http://localhost:8888/user/getroommsg/roomid').then(function (resp) {
                that.roomid=resp.data;
                axios.get('http://localhost:8888/user/getroommsg/daytime',{params:{
                    todayvalue: that.todayvalue
                  }}).then(function (resp) {
                  that.daytime=resp.data;
                  axios.get('http://localhost:8888/user/getroommsg/timerange').then(function (resp) {
                    that.timerange=resp.data;
                  })
                })
              })
              that.getstaff();
            })
          },
          postapplyroom(){//上传申请请求
            var that=this;

            console.log(that.checkList);
            if(that.checkList.length===0){
              alert("请选择");
            }
            else {
              for(var i=0;i<that.checkList.length;i++){
                if(that.checkList[i]!=undefined)
                {
                  axios.post('http://localhost:8888/governor/postroommsg',that.applyroom1[i]).then((function (resp) {
                    console.log(that.applyroom1[i]);

                  }))
                }
              }
              alert("上传完成");
              this.reload();
            }


          },
        point:function(t){
            console.log(this.todayvalue);
            if(this.applyroom1[t].userid===null){
              this.applyroom1[t].userid=this.roomAskmsg.userid;
              this.applyroom1[t].name=this.roomAskmsg.name;
              this.applyroom1[t].department=this.roomAskmsg.department;
              this.applyroom1[t].todayvalue=this.todayvalue;
              this.checkList[t]=t;
            }else {
              this.applyroom1[t].userid=null;
              this.applyroom1[t].name=undefined;
              this.applyroom1[t].department=undefined;
              this.applyroom1[t].todayvalue=null;
              this.checkList[t]=undefined;
            }

        },
          submit:function(){
            this.postapplyroom();
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
