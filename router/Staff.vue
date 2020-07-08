<template>
<div id="Staff">
  <el-menu router  class="el-menu-demo" mode="horizontal"
           background-color="#3366FF"
           text-color="#FFFFFF"
           active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template slot="title">个人信息</template>
    <el-menu-item index="/Staff">个人信息</el-menu-item>
      <el-menu-item @click="dialogFormVisible = true,point()">修改密码</el-menu-item>
    </el-submenu>
    <el-menu-item index="/AttendanceIquiry">我的考勤</el-menu-item>
    <el-submenu index="2" >
      <template slot="title">请求申请</template>
      <el-menu-item index="/Applyday">请假申请</el-menu-item>
      <el-menu-item index="/Applyroom">会议室申请</el-menu-item>
    </el-submenu>
    <el-menu-item index="/Staff/RequestCheck/Boardroom" >请求查询</el-menu-item>
    <el-menu-item index="/login" @click="quit()">退出</el-menu-item>
  </el-menu>

   <el-container style="height: 600px; border: 1px solid #eee">
    <el-container>
    <el-main>
      <el-row>
        <el-col :span="18">
    <el-table :data="staff" border >
    <el-table-column prop="userid" label="工号" >
    </el-table-column>
      <el-table-column prop="name" label="姓名" >
      </el-table-column>
      <el-table-column  label="年龄" >{{age}}
      </el-table-column>

    </el-table>
    <el-table :data="staff" border>
      <el-table-column prop="sex" label="性别" >
      </el-table-column>
      <el-table-column prop="functions" label="职务" >
      </el-table-column>
      <el-table-column prop="idcard" label="身份证" >
      </el-table-column>
    </el-table>
        </el-col>
        <el-col :span="6">
          <div class="demo-basic--circle">
            <div class="block"><el-avatar shape="square" :size="190"  class="el-upload" :src="url"></el-avatar></div>
          </div>
        </el-col>

      </el-row>
      <el-col :span="18">
      <el-table :data="staff" border>
        <el-table-column prop="juguan" label="籍贯" >
        </el-table-column>
        <el-table-column prop="marriage" label="婚姻状况" >
        </el-table-column>
        <el-table-column prop="politics" label="政治面貌" >
        </el-table-column>
      </el-table>
      <el-table :data="staff" border>
        <el-table-column prop="email" label="电子邮箱" >
        </el-table-column>
        <el-table-column prop="address" label="家庭住址" >
        </el-table-column>
        <el-table-column prop="tel" label="电话号码" >
        </el-table-column>
      </el-table>
      <el-table :data="staff" border style="width: 66.6666%">
        <el-table-column prop="birthday" label="出生日期" >
        </el-table-column>
        <el-table-column prop="worktime" label="入职时间" >
        </el-table-column>
      </el-table>
      </el-col>
    </el-main>
    </el-container>
    </el-container>

  <el-dialog title="修改密码" :visible.sync="dialogFormVisible" >
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input type="password" v-model="ruleForm.oldpassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-input type="password" v-model="ruleForm.newpassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checknewpassword">
        <el-input type="password" v-model="ruleForm.checknewpassword" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>

<!--
  <h2 v-show="istoday">{{signmes1}}{{time1}}</h2>-->

<!--  <img src="../assets/p1.jpg" >-->
<!--  <img src="../assets/uf10rr.jpg" >-->
<!--  <img :src="url">-->

  <router-view/>
</div>

</template>

<script>
  import axios from "axios";
  import moment from 'moment';
    export default {
        name: "Staff",
      inject:['reload'],
      data(){

        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入新密码'));
          } else if(value === this.login.password){
            callback(new Error('新旧密码不能一样'));
          } else {
            if (this.ruleForm.checknewpassword !== '') {//先把确认密码输入了，在输新密码的情况验证
              this.$refs.ruleForm.validateField('checknewpassword');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.newpassword) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };

        var validatePass3 = (rule, value, callback) => {
          if(value==='') {
            callback(new Error('请输入原密码'));
          }else if(value!==this.login.password){
            callback(new Error('原密码错误'));
          } else {
            callback();
          }
        };
          return{
            formLabelWidth: '120px',
            dialogTableVisible: false,
            dialogFormVisible: false,
            ruleForm: {
              oldpassword:'',
              newpassword: '',
              checknewpassword: '',
            },
            rules: {
              newpassword: [
                { validator: validatePass, trigger: 'blur' }//validator:验证器
              ],
              checknewpassword: [
                { validator: validatePass2, trigger: 'blur' }
              ],
              oldpassword:[
                { validator: validatePass3, trigger: 'blur' }
              ]

            },

            login:[],

            oldpassword:'',
            newpassword1:'',
            newpassword2:'',

            url:"",
            squareUrl:"/static/img/p1.jpg",
            mes:"第二页",
            a:"",
            b:"",
            isnewyear:false,//是新的年（和不同两样）
            isnewmonth:false,
            istoday:false,//是否是不一样的一天
            isnew:false,
            staff:[],

            //两个问题：一个数据库存的时间拿出来是怎么样的，可以.ymd吗？
            //第二个我存过去是从String到date类型，这里需要转换吗？
            time1:'0',
            time2:'',//用来记录签到的时间
            hour:'0',//用来获取现在的时间
            year:'0',//用来获取现在的时间
            month:'0',//用来获取现在的时间
            day:'0',//用来获取现在的时间

            today:'',
            year1:'',//是用来与现在的时间比对判断是否是今天的时间:也可以说是签到时间//数据库时间
            month1:'',
            day1:'',
            age:'',
            ontime:'',
            number:"0",//签到次数
            latennumber:"0",//迟到数
            finish:false,

            Attendance:{
              userid:'',
              number:0,
              latenumber:0,
              name:"",
              today:"2000-01-01 01:01:01",
              year:0,
              month:0,
              day:0,
              istoday:0,
            },

          }
    },

      created() {//生命周期开始前就运行。
        //this.time2=this.$moment().format('MM YYYY, h:mm:ss a'); // 七月 17日 2018, 10:47:33 晚上
        //this.$moment().format('dddd');                    // 星期二
        //this.$moment().format("MMM Do YY");               // 7月 17日 18
        //this.$moment().format('YYYY [escaped] YYYY');     // 2018 escaped 2018
        //this.time1=this.$moment().format('H:mm:ss Do MM YYYY');
        this.time1=this.$moment().format('YYYY-MM-DD hh:mm:ss');
        this.hour=this.$moment().format('H');
        this.day=this.$moment().format('D');
        this.year=this.$moment().format('YYYY');
        this.month=this.$moment().format('MM');
        //将时间转化为时间截过程！！！！1
        console.log('+1',this.$moment().add(1,'days'));//123
        this.time2=this.$moment().add(1,'days');
        console.log(this.time2);//先拿到今天的+1天//123
        console.log(this.time2.format('YYYY-MM-DD')+"在这里");//在把+1天转化或YYYYMMMMDDD
        console.log(this.time2.valueOf());//在把YYYYMMDD转化为时间戳
        //先获取该账号的信息
        this.getstaff()
      },

      beforeDestroy() {
        if (this.Time1) {
          clearInterval(this.Time1); // 在Vue实例销毁前，清除我们的定时器
          console.log("定时器清除完毕");
        }
      },
      methods:{
          point(){
            var that=this;
            axios.get('http://localhost:8888/user/login').then(function (resp) {
              that.login=resp.data;
            })
          },
          formDate(time){
            const thisTime = time.replace(/ /g, '/')
            var nowTime = new Date(thisTime)
            nowTime = nowTime.getTime()
            return nowTime
          },

        savenumber(){//上传全部的记录到数据库保存,再细分一下//其中还需要传today的值(今天签到的时间)
            axios.post('http://localhost:8888/user/savenumber',
              {number:Number(this.number),
              latenumber:Number(this.latenumber),
              today:(this.time1)}).then(function (resp) {
            })
          },
          settimes(){//先获取数据库的天数次数存储
            var _this=this;
            var that=this;
            var _that=this;
            var __this=this;
            axios.get('http://localhost:8888/user/getnumber').then(function (resp) {
              _this.number=resp.data;//
              __this.a=resp.data;
              axios.get('http://localhost:8888/user/getlatenumber').then(function (resp) {
                that.latenumber=resp.data;//
                __this.b=resp.data;//
                axios.get('http://localhost:8888/developer/getontime').then(function (resp) {
                  that.ontime=resp.data;
                  console.log(resp.data+"shizheli");

                  //首先年月不同，置零处理再计算
                  if(__this.isnewyear!==true&&__this.isnewmonth!==true){//如果同一个月同一个年
                    console.log("同年月");
                    if (__this.istoday ===false){//如果不同天
                      _that.number=Number(__this.a)+1;
                      if(Number(__this.ontime)<Number(__this.hour)){//如果当前时间，比规定时间要大，算为迟到，latenumber累加
                        that.latenumber=Number(__this.b)+1;
                        __this.savenumber();//保存
                      }else {
                        console.log("没迟到");
                        __this.savenumber();//保存
                      }
                    }else {
                      console.log("同天");
                      __this.savenumber();//保存
                    }
                  }
                  else{//不同年月
                    _this.isnewyear=false;
                    _this.isnewmonth=false;
                    _this.number=1;
                    _this.latenumber=0;
                    console.log("不同年月置零");
                    //还需要判断当天的考勤是否迟到情况
                    console.log("dd");
                    // _that.number=Number(__this.a)+1;
                    if(Number(__this.ontime)<Number(__this.hour)){//如果当前时间，比规定时间要大，算为迟到，latenumber累加
                      that.latenumber=1;
                      // console.log(Number(__this.b));
                      // console.log(that.latenumber);
                      console.log(__this.hour+"hour");
                      console.log(__this.ontime+"ontime");
                      console.log("2");
                      __this.savenumber();//保存
                    }else {
                      console.log("3");
                      console.log("没迟到");
                      __this.savenumber();//保存
                    }
                  }
                })
              })
            })
          },
          getymd(){//考勤签到入口
            var _this=this;
            var that=this;
            var _that=this;
            axios.get('http://localhost:8888/user/gettoday').then(function (resp) {//应该获取today来得到ymd，这个today是数据库中用来记录每天签到时刻的时间
              //_this.year1=resp.data;//
              _this.today=resp.data;//
             // console.log(_this.today.substring(8,10)+"111");
              that.Attendance.userid=Number(that.staff[0].userid);
              that.Attendance.name=that.staff[0].name;
              console.log(that.staff[0].name);
              console.log(resp.data);
              if(resp.data===1){//1 是没有签到信息，需要创建
                axios.post('http://localhost:8888/user/createAttendance',that.Attendance).then(function (resp) {
                  console.log(resp.data);//新建用户签到信息条成功-400
                  if(resp.data.code===400){
                    console.log("获取年");
                   //直接再次刷新
                    that.getstaff();//理论上直接自身调用就行了。
                  }
                })
              }
              else {//存在已签到信息条
                _this.year1=Number(_this.today.substring(0,4));//存储上次签到时间的年月日，为了下面的判断
                that.month1=Number(_this.today.substring(5,7));
                _that.day1=Number(_this.today.substring(8,10));
                                                                                      //下面好像没有意义啊！！？？？？
                // if(_that.day1!==_that.day){//day是签到时的
                //   _that.istoday=false;
                //   _that.sign();
                // }else {
                //   _that.istoday=true;
                //   _that.sign();
                // }
                _that.sign();
              }
            })
          },

        sign:function(){
            if(Number(this.year)===this.year1)
            {
              if(Number(this.month)===this.month1)
              {
                if(Number(this.day)===this.day1)
                {
                  this.istoday=true;
                  this.settimes();
                  //****需要从数据库拿已签到时间****
                }
                else//日期不一致，记录签到时间
                {
                  this.day1=this.day;
                  this.istoday=false
                  this.isnew=true;
                  console.log("日");
                  this.settimes();
                }
              }
              else//登录月份不一致,记录签到时间
              {
                this.month1=this.month;
                this.day1=this.day;
                this.istoday=false;
                this.isnew=true;
                this.isnewmonth=true;//判断是不同的月份
                console.log("月");
                this.settimes();
              }
            }
            else//登录年份不一致,记录签到时间
            {
              this.year1=this.year;
              this.month1=this.month;
              this.day1=this.day;
              this.istoday=false;
              this.isnew=true;//判断是否是不同的一天
              this.isnewyear=true;//判断是不同的一年
              console.log("年");
              this.settimes();
            }
        },
        getstaff(){
          var that=this;
          axios.get('http://localhost:8888/user/staff').then(function (resp) {
            that.staff=resp.data;//拿去staff的内容信息
            that.url=that.staff[0].imgurl;
//转换时间格式
            that.staff[0].worktime=moment(that.staff[0].worktime).format('YYYY-MM-DD');
            that.staff[0].birthday=moment(that.staff[0].birthday).format('YYYY-MM-DD');
            //判断是否过了生日
            var year=moment(that.staff[0].birthday).format('YYYY'),
            month=moment(that.staff[0].birthday).format('MM'),
            day=moment(that.staff[0].birthday).format('DD');//生日的
            if(month<that.month){//月份已过生日已过
              that.age=that.year-year+1;//周岁现年减当年+1
            }else if(month===that.month){
              if(day<that.day){//周岁
                that.age=that.year-year+1;
              }else {//没过周岁
                that.age=that.year-year;
              }
            }else {//没过周岁
              that.age=that.year-year;
            }
            //console.log(that.age+"年龄");
            // if(that.staff.worktime<that.staff.birthday){
            //   console.log(that.staff[0].worktime);
            //   console.log("that.staff.worktime1");
            // }
            // else {
            //   console.log(that.staff[0].birthday);
            //   console.log("that.staff.worktime2");
            // }
            if(that.staff!==null){
              that.getymd();//转入考勤签到流程
            }
          })
        },
        submitForm(formName) {
            var that=this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.post('http://localhost:8888/user/update/password',{password:that.ruleForm.newpassword}).then(function (resp) {
                alert('submit!');
                that.dialogFormVisible = false;
                that.reload()
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        Applyday:function () {
          this.$router.push("/Applyday");//跳转请假
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

  .el-aside {
    color: #333;
  }
  .el-row {
    margin-bottom: 20px;
  }
  :last-child {
     margin-bottom: 0;
   }

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #66CCFF;

  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-upload {
    border-style: groove;
    border-radius: 6px;
    cursor: auto;
    position: relative;
    overflow: hidden;

  }

</style>
