<template >
  <div id="Applyday">
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

    <div class="inputbox">
      <el-container>
        <el-main >
          <el-form :label-position="position" label-width="80px" class="ghbox">
            <h2 >工号：{{applyday.userid}}</h2>
            <div style="height: 10px"></div>
            <h2 >姓名：{{applyday.name}}</h2>
            <div style="height: 10px"></div>
            <h2>部门：{{applyday.department}}</h2>
            <div style="height: 10px"></div>
            <h2 >开始时间：{{value1[0]}}</h2>
            <div style="height: 10px"></div>
            <h2>结束时间：{{value1[1]}}</h2>
          </el-form>
        </el-main>
      </el-container>

      <div  class="block">
        <h2 style="display: inline-block; text-indent: 20px;text-align: left;">开始时间：</h2><span class="demonstration"></span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div style="height: 10px"></div>
      <div style="float: left; margin-left: 40px; clear: both;">
        <h2 style="display: inline;">请假类型：</h2>
        <select v-model="type2">
          <option v-for="a in type1">{{a}}</option>
        </select>
      </div>
      <div style="height: 20px;"></div>
      <div style="float: left; margin-left: 40px; clear: both;">
        <div style="height: 10px"></div>
        <div>
          <h2 style="float: left; clear: both;">请假原由：</h2>
          <div style="display: inline"><el-input
            type="text"
            maxlength="100"
            size="small"
            show-word-limit
            value="请假原由" v-model="applyday.mes" :label="mes" style="display: inline"/></div>
        </div>
        <div style="height: 30px"></div>
      </div>
      <div style="float: left; margin-left: 40px; clear: both;">
        <h2 style="float: left; clear: both;">请假天数：</h2>
        <div style="display: inline">
          <el-input type="text"
                    maxlength="2"
                    size="small"
                    show-word-limit
                    value="请假天数" v-model="applyday.count"/><br>
        </div>
      </div>
      <div style="height: 200px"></div>
      <input type="button" value="提交" @click="submit" class="inputbtn">

    </div>
    <router-view/>
  </div>

</template>

<script>
  import axios from "axios";
    export default {
        name: "Applyday",
      data(){
          return{
            mes:"qingjiayuanyou:",
            //value:"",
            applyday: {
              userid:"",
              name:"",
              department:"",
              starttime:'',
              finishtime:'',
              type:"",
              mes:"",
              count:"",
              bool:false,
              bool2:false,
            },
            type1:[
              "事假", "年假", "调休"
            ],
            type2:"事假",
            value1: '',
            value2: '',
            position:'right'

          }
      },
      created() {
          this.getuserid();//获取员工基本信息//在填写完必要信息后，上传请假条信息

      },
      methods:{//还需要有个和人事那边对接处理请求的操作，查询，有个请假序列号

          getuserid(){
            var that=this;
            axios.get('http://localhost:8888/user/staff').then(function (resp) {
              console.log(resp.data[0]);
              that.applyday.userid=resp.data[0].userid;
              that.applyday.name=resp.data[0].name;
              that.applyday.department=resp.data[0].department;
              console.log(that.applyday);
            })
          },
        postmessage(){
          var that=this;
          var _that=this;
          _that.applyday.starttime=that.value1[0];
          _that.applyday.finishtime=that.value1[1];
          if(that.type2==="事假"){
            _that.applyday.type='1';
          }else if(that.type2==="年假"){
            _that.applyday.type='2';
          }else {
            _that.applyday.type='3';
          }
            axios.post('http://localhost:8888/user/postmessage',that.applyday).then((function (resp) {
            }))
        },
          submit:function () {
            //var res = moment(this.value1[1]).format('YYYY-MM-DD HH:mm:ss');
            console.log(this.applyday.starttime);
            if(this.applyday.count===11){
              alert("信息请填写完整");
            }
            else {
              this.postmessage();
              alert("提交成功");
              this.$router.push("/Staff");
            }
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
#Applyday{
  text-align: center;
}

  .inputbox {
    width: 500px;
    height: 700px;
    /*background: #66CCFF;*/
    margin: 0 auto;
    margin-top: 100px;
    border-radius: 10px;
    border: 2px solid #ccc;
  }

  .ghbox h2{
     text-align: left;
     text-indent: 20px;
  }
.inputbtn {
  height: 30px;
  width: 60px;
  color: #fff;
  background: #abcdef;
  border-radius: 10px;
  line-height: 30px;
  margin: 0 auto;
}

  .clearfix:after{
    visibility:hidden;display:block;font-size:0;content: " ";clear:both;height:0;}
</style>
