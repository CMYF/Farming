import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import HomePage from '@/views/HomePage'
import Login from '@/views/Login'
import Principal from '@/views/principal'
import RoleManagement from '@/views/RoleManagement'
import AddMenu from '@/views/addMenu'
import UserAdmin from '@/views/userAdmin'
import SetProduct from '@/views/setproduct'
import TaskList from '@/views/TaskList'
import GetTasks from '@/views/TaskGet'
import ProductAdmin from '@/views/productAdmin'
import NewPlanTask from '@/views/newPlan'
import ResourceConfig from '@/views/resourceConfig'
Vue.use(Router)
export default new Router({
  base: '/html/agriculture/',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        Login: '',
        Home: HomePage
      },
      children: [
         {
          path: '/',
          name: 'User',
          components: {
            rightContent: Principal
          }
        },
         {
          path: '/useradmin',
          name: 'User',
          components: {
            rightContent: UserAdmin
          }
        },
         {
          path: '/rolemanagement',
          name: 'User',
          components: {
            rightContent: RoleManagement
          }
        },
         {
          path: '/addmenu',
          name: 'User',
          components: {
            rightContent: AddMenu
          }
        },
         {
          path: '/setproduct',
          name: 'Product',
          components: {
            rightContent: SetProduct
          }
        },
        {
          path: '/tasklists',
          name: 'Task',
          components: {
            rightContent: TaskList
          }
        },
        {
          path: '/gettasks',
          name: 'Task',
          components: {
            rightContent: GetTasks
          }
        },
        {
          path: '/productadmin',
          name: 'Product',
          components: {
            rightContent: ProductAdmin
          }
        },
        {
          path: '/newPlan',
          name: 'Plan',
          components: {
            rightContent: NewPlanTask
          }
        },
        {
          path: '/resourceConfig',
          name: 'Resource',
          components: {
            rightContent: ResourceConfig
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        Login: Login,
        Home: '',
        rightContent: ''
      }
      
    },

  ]
})
