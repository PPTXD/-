import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Staff from './Staff'
import Index from './Index.vue'
import Governor from './governor/Governor'
import Alter from "./staff/Alter"
import Applyday from "./staff/Applyday"
import Applyroom from "./staff/Applyroom"
import Attendance from "./governor/Attendance";
import Department from "./governor/Department";
import Calendar from "./staff/Calendar"
import AttendanceIquiry from "./staff/AttendanceIquiry";
import Search from "./governor/Search";
import RequestRoomFalse from "./governor/RequestRoomFalse";
import RequestRoomTrue from "./governor/RequestRoomTrue";
import RequestDay from "./governor/RequestDay";
import App from "../App";
import Manager from "./Manager";
import Forget from "./Forget";
import AddStaff from "./governor/AddStaff";
import AddDepartment from "./governor/AddDepartment";
import AddBoardroom from "./manager/AddBoardroom";
import RequestCheckBoardroom from "./staff/RequestCheckBoardroom";
import RequestCheckDay from "./staff/RequestCheckDay";
import RDayComplete from "./governor/RDayComplete";
import Salary from "./governor/Salary";

Vue.use(Router)

export default new Router({
  mode:'history',
  //  proxyTable: {
  //    '/api': {
  //      target: 'http://localhost:8888',
  //      changeOrigin: true,
  //      // pathRewrite: {
  //      //   '^/api': ''
  //      // }
  //   }
  // },

  routes: [
    {
      path: '/',
      redirect:'/login',//这里之前是/router/index是只能在桌面的谷歌打开，不能点run出来的端口，这里改成login就好了，注意下
      meta: {
        requireAuth: true
      }

    },

    {
      path:'/Staff',
      name:'Staff',
      component: Staff,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/Staff/RequestCheck/Boardroom',
      name: 'RequestCheckBoardroom',
      component: RequestCheckBoardroom,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/Staff/RequestCheck/Day',
      name:'RequestCheckDay',
      component: RequestCheckDay,
      meta: {
        requireAuth: true
      }
    },

    {
      path:'/login',
      name:'Index',
      component: Index,
    },
    {
      path:'/Governor',
      name:'Governor',
      component: Governor,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/Manager',
      name:'Manager',
      component: Manager,
      meta: {
        requireAuth: true
      }

    },
    {
      path:'/Forget',
      name:'Forget',
      component: Forget,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/Alter',
      name:'Alter',
      component: Alter,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/Applyday',
      name:'Applyday',
      component: Applyday,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/Applyroom',
      name:'Applyroom',
      component: Applyroom,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/Attendance',
      name:'Attendance',
      component: Attendance,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/Department',
      name:'Department',
      component: Department,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/Calendar',
      name:'Calendar',
      component: Calendar,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/AttendanceIquiry',
      name:'AttendanceIquiry',
      component: AttendanceIquiry,
      meta: {
        requireAuth: true
      }

    },
    {
      path:'/Search',
      name:'Search',
      component: Search,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/RequestRoomFalse',
      name:'RequestRoomFalse',
      component: RequestRoomFalse,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/RequestRoomTrue',
      name:'RequestRoomTrue',
      component: RequestRoomTrue,
      meta: {
        requireAuth: true
      }
    },

    {
      path:'/RequestDay',
      name:'RequestDay',
      component: RequestDay,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/RDayComplete',
      name:'RDayComplete',
      component: RDayComplete,
      meta: {
        requireAuth: true
      }
    },

    {
      path:'/AddStaff',
      name:'AddStaff',
      component: AddStaff,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/AddDepartment',
      name:'AddDepartment',
      component: AddDepartment,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/AddBoardroom',
      name:'AddBoardroom',
      component: AddBoardroom,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/Salary',
      name:'Salary',
      component: Salary,
      meta: {
        requireAuth: true
      }
    }



  ]
})
