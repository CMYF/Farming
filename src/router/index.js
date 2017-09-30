import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import HomePage from '@/views/HomePage'
import Login from '@/views/Login'
import About from '@/views/about'
import RoleManagement from '@/views/RoleManagement'
import AddMenu from '@/views/addMenu'
import UserAdmin from '@/views/userAdmin'

Vue.use(Router)

export default new Router({
 // base: '/html/agriculture/',
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
            rightContent: About
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
