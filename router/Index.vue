<template>
  <div  id="index">
    <el-form :model="login" ref="login">
      <h1>{{headline}}</h1><br>
      <i class="el-icon-user-solid"></i>

      <el-input type="text" v-model="login.username" size="mini"style="width: 160px; border: black"></el-input>
      <br><br>
      <i class="el-icon-lock"></i>

      <el-input type="text" v-model="login.password" show-password size="mini" style="width: 160px; border: black"
      ></el-input>

      <h2 v-show="istrue">{{headline}}</h2><br><br><!--测试-->

    类别：
      <select v-model="people">
        <option v-for="a in type2">{{a.rolename}}</option>
      </select><br> <br>                                     <!--下拉框-->
    <!--<input type="button" value="登录"  @click="getup(user1,psw1,people)">-->
      <input type="button" value="登录" @click="login2()"  class="inputbtn">

    <router-view/>
    </el-form>
  </div>
</template>

<script>
  import axios from "axios";

  const Method={//时间戳
    getTimestamp(time) { //把时间日期转成时间戳
      return (new Date(time)).getTime()
    }
  }
    export default {
      name: "Index",
      data() {
        return {
          headline: "企业人事管理系统",
          staff:[],
          // forget:"忘记密码",
          login: {
            username:"",
            password:"",
            roleid:1,
          },
          istrue: false,
          type: [
            "普通职员", "人事管理员", "管理者"
          ],
          type2:[],
          people: "普通职员",//默认登陆者类别为职员!!!!这里实现不了

          //以下是会议室申请创建
          applyroom1:[],
          applyroom:{
            userid:"",//申请者的工号
            name:"",//申请者的名字
            department:"",//申请者的部门
            timerange:'',
            daytime:'',
            valuetime:'',
            roomid:'',
            bool:'',
          },
          value:'',
          value1:'',
          value2:'',
          startTime: '',
          endTime: '',
          s:"",
          timerange:[
            '08:30-10.00','10:00-11:30','13:00-14:30','14:30-16:00','16:00-17:30'
          ],
          firsttime:'',//用来设置是否是第一次启动系统，设置可选取会议室的数据条。//开发者,有个是否是不同的一天的判定
          daytime:[],//用来存储传过去的年月日时间
          valuetime:[],//存储时间戳
          time:"",
          time2:"",
          room:[],//存储可以申请的房间号
          i:0,//循环存储日期
          j:0,//存储时间段timerange
          t:0,
          todayvalue1:"",//用来获取今日的时间戳



        }
      },
      created() {//应该放在这里，//在这里需要建立会议室可申请信息
        this.roleget();
        this.todayvalue1=this.$moment().format('YYYY-MM-DD');
        //先来个getfirsttime再savedaytime

        this.getfirsttime();

      },

      methods: {
        settodayvalue(){
          //var that=this;
          var v=Method.getTimestamp(this.todayvalue1);
          console.log(v);
          axios.post('http://localhost:8888/developer/settodayvalue',{todayvalue:(v)}).then(function (resp) {

            console.log("会议室申请信息创建完成！");
          })
        },
        gettodayvalue(){
          var that=this;
          axios.get('http://localhost:8888/developer/gettodayvalue').then(function (resp) {
            //that.todayvalue=resp.data;
            if(Method.getTimestamp(that.todayvalue1)>resp.data){//今天的时间戳比数据库里的要大，说明不是同一天,否则就不去savedaytime了
              that.savedaytime();
              that.settodayvalue();
              console.log("可以比");
            }
          })
        },
        setfirsttime(){
          var that=this;
          axios.post('http://localhost:8888/developer/setfirsttime',{firsttime:(that.firsttime)}).then(function (resp) {
            //that.firsttime=resp.data;
            //that.savedaytime();
          })

        },
        getfirsttime(){
          var that=this;
          axios.get('http://localhost:8888/developer/getfirsttime').then(function (resp) {
            that.firsttime=resp.data;
            console.log(that.firsttime);
            if(that.firsttime===true){
              that.savedaytime();
            }else {//不是第一天，那就要去拿todayvalue判断
              that.gettodayvalue();
            }

          })
        },
        post2(){//timerange
          var _that=this;
          if(_that.j<5){//因为有5个时间段
            _that.applyroom.timerange=_that.timerange[_that.j];
            //console.log(_that.timerange[_that.j]);
            axios.post('http://localhost:8888/user/post',_that.applyroom).then(function (resp) {
              //console.log("GUO L ");
              //console.log(_this.room[_this.i].roomid);
              //console.log(_this.timerange[_this.j]);
              //console.log("2");
              _that.j=_that.j+1;
              _that.post2();     //重调自身
            })
          }else {//一个会议室房间的五个时间段已经存储完毕，J在房间里置0
            _that.i=_that.i+1;
            _that.post1();
          }
        },//i是roomid,j是时间段,t第几天
        post1(){//要用递归,roomid//房间号
          var that=this;
          if(that.room[that.i]!==undefined){//nice!!!!   如果会议室room[]里面有已经存储的会议室信息
            that.applyroom.roomid=that.room[that.i].roomid;
            //console.log(that.room[that.i].roomid);
            that.j=0;  //时间段次序置0
            that.post2();
          }else if(that.room[that.i]===undefined){//初始使用，需要轮回七天，初次和不初次都会调用这个
            that.t=that.t+1;
            that.posttime();
          }
          // else {//不是初始，不需要累计天数,增加完新的记录后直接show
          //   //that.t=that.t+1;
          //   //that.posttime();
          //   //showget();
          //   //that.showget();
          // }
        },
        posttime(){
          var that=this;
          if(that.t<7&&that.firsttime===true){//因为是第一次，所以要放数据进去
            that.applyroom.valuetime=that.valuetime[that.t];//时间戳
            that.applyroom.daytime=that.daytime[that.t];//所选择的日期
            that.i=0;//房间次序置0
            that.post1();
          }else if(that.firsttime===false&& that.i===0){//不是第一次，而且
            that.applyroom.valuetime=that.valuetime[7];
            that.applyroom.daytime=that.daytime[7];
            that.i=0;
            that.post1();
            //that.showget();
          }else{//初始完成后，设置f为false,还需要将firsttime表中的todayvalue设置为当日的时间戳
            //that.showget();
            that.i=0;//不是很清楚在服务器上面，定义的变量的赋值方式
            that.firsttime=false;
            that.setfirsttime();
            that.settodayvalue();
          }
        },

        getroom(){//还需要从数据库拿会议室房间的数据
          var that=this;
          axios.get('http://localhost:8888/user/getboradroom').then(function(resp){
            that.room=resp.data;
            console.log("here");
            console.log(resp.data.length);
            if(resp.data.length!==0){
              that.posttime();
            }
            else {
              console.log("没有会议室信息，无法创建！");
            }
          })
        },
        changetime:function(){
          var _that=this;
          //_that.time2=_that.time.format('YYYY-MM-DD');//在把+i天转化或YYYYMMMMDDD
          //_that.time=_that.time2;
          _that.valuetime[7]=_that.time.valueOf();//在把YYYYMMDD转化为时间戳存储
          //console.log(_that.time2);
          //console.log( _that.time);
        },

        savedaytime:function(){
          var that=this;
          var _that=this;

          this.time=this.$moment().format('YYYY-MM-DD');//获取当日的年月日格式时间
          //this.todayvalue=this.time.valueOf();//保存今日的时间戳值                                              !!!!!!!!
         // console.log(this.time);

          if(that.firsttime===true){//第一次使用系统，存储七日
            for(var i=0;i<7;i++){
              console.log("savedaytime ");
              //console.log(_that.time.format('YYYY-MM-DD'));
              console.log(i+1+"day");

              _that.daytime[i]=_that.time;//存储年月日
              _that.valuetime[i]=Method.getTimestamp(_that.time);//在把YYYYMMDD转化为时间戳存储,这里转化，是以时间戳的形式保存
              //console.log(_that.time.valueOf());
              _that.time=_that.$moment().add(i+1,'days');//先拿到今天的+ i+1天//123
              _that.time=_that.time.format('YYYY-MM-DD');//在把+i天转化或YYYYMMMMDDD
              //_that.time=_that.time2;
              //_that.time.format('YYYY-MM-DD');//在把+i天转化或YYYYMMMMDD
            }
          }else{//前面已经判定了，先是不是初始天，然后todayvalue为max，所以直接增加一天的数据
            _that.time=_that.$moment().add(6,'days');//每次都是吧当日后的第七天存储
            _that.time2=_that.time.format('YYYY-MM-DD');//在把+i天转化或YYYYMMMMDDD
            _that.time=_that.time2;
            _that.daytime[7]=_that.time;                                                                       //气死了！！！
            _that.valuetime[7]=Method.getTimestamp(_that.time);//在把YYYYMMDD转化为时间戳存储
          }
          //需要在获取会议室房间的信息
          _that.getroom();

        },
        //以上是会议室创建

        roleget() {//去后端拿权限类别名称
          var that=this;
          // console.log("role1");
          axios.get('http://localhost:8888/user/role').then(function (resp) {
            // console.log("role2");
            // console.log(resp.data);
            that.type2=resp.data;
            //that.people1=that.type2[rolename];
            //console.log(that.people1);
            // console.log(that.type2);
          })
        },

        login2() {
          let _this=this;//好像这里不同层别的，this的作用域会报错
          let that=this;
          if (this.people === "普通员工") {
            this.login.roleid=1;
          } else if (this.people === "人事管理员") {
            this.login.roleid=2;
          } else {
            this.login.roleid=3;
          }
          axios.post('http://localhost:8888/user/getlogin',that.login).then(function (resp) {
            console.log(resp);
            if (resp.data.code===400) {
              alert('欢迎登陆');
              _this.$store.commit('login', _this.login)
              var path =that.$route.query.redirect
             // this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})

              if (_this.people === "普通员工") {
                that.$router.replace({path: path === '/' || path === undefined ? '/Staff' : path})//跳转指定路由
                //that.$router.push("/Staff");
              }
              else if (_this.people === "人事管理员")
              {
                that.$router.replace({path: path === '/' || path === undefined ? '/Governor' : path})
               // that.$router.push("/Governor");
              }
              else {
                that.$router.replace({path: path === '/' || path === undefined ? '/Manager' : path})
                //that.$router.push("/Manager");
              }
            }
            else if(resp.data.code ===201){
              console.log(resp.data);
              alert("账号错误");
            }
            else if(resp.data.code ===202){
              console.log(resp.data);
              alert("密码错误");
            }
            else if(resp.data.code ===203){
              console.log(resp.data);
              alert("权限错误");
            }
          });
        },


      }
    }
</script>

<style scoped>
#index{
  width: 250px;
  height: 200px;
  /*background: pink;*/
  margin: 0 auto;
  margin-top: 150px;
  padding: 40px;
  border: 1px solid #ccc;
  box-shadow: 0 8px 16px 0 rgba(28, 31, 33, .2);
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
</style>
