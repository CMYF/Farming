import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import HomePage from './modules/homepage'
import Login from './modules/login'
import UserAdmin from './modules/useradmin'
import RoleManagement from './modules/rolemanagement'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        navData: {},
        subNavData: {},
        isShowDialog: null,
        menuData: {},
        upMenuDatas: {},
        addMenuDatas: {},
        delMenuDatas: {}
    },
    actions,
    mutations,
    getters,
    modules: {
       HomePage,
       Login,
       UserAdmin,
       RoleManagement
    }
})
