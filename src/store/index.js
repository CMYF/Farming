import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import HomePage from './modules/homepage'
import Login from './modules/login'
import UserAdmin from './modules/useradmin'
import RoleManagement from './modules/rolemanagement'
import WorksList from './modules/worksList'
import WorksGet from './modules/worksGet'
import Product from './modules/product'
import Resourceconfig from './modules/resourceconfig'
import Kuaidial from './modules/kuaidial'
import Principal from './modules/principal'
import NewPlans from './modules/newPlans'
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
       RoleManagement,
       WorksList,
       WorksGet,
       Product,
       Resourceconfig,
       Kuaidial,
       Principal,
       NewPlans
    }
})
