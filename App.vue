<template>
  <div id="app">

    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
  //设置全局变量
  var common='no';//Applyroom
  var type='no';//Applyroom

  var userid=null;//Governor
  var Name=null;
  var departmentsearch=null;

  var tablename=null;//Manager
export default {
  common,//数据公共存储地方
  type,

  userid,
  Name,
  departmentsearch,

  tablename,

  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
  }}

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
