import { fetchPlanList,fetchPlanNew,fetchProductList,fetchOwnLand,fetchDelPlan } from '../../fetch/api'

const state = {
    PlanList: {
        resultData: {}
    },
    PlanNew: {
        resultData: {}
    },
    ProductList: {
    	resultData: {}
    },
    OwnLand: {
    	resultData: {}
    },
    DelPlan: {
    	resultData: {}
    }
}

const actions = {
    GETPLAN: ({ commit, state }, opt) => {
        return fetchPlanList(opt).then(planlists => commit('GET_PLAN_DATA', { planlists }))
    },
    GETPLANNEW: ({ commit, state }, opt) => {
        return fetchPlanNew(opt).then(planNews => commit('GET_GETPLANNEW_DATA', { planNews }))
    },
    PRODUCTLIST: ({ commit, state }, opt) => {
        return fetchProductList(opt).then(productNames => commit('GET_PRODUCTLIST_DATA', { productNames }))
    },
    GETOWBLAND : ({ commit, state }, opt) => {
        return fetchOwnLand(opt).then(ownLands => commit('GET_GETOWBLAND_DATA', { ownLands }))
    },
    DELPLAN : ({ commit, state }, opt) => {
        return fetchDelPlan(opt).then(delPlans => commit('GET_DELPLAN_DATA', { delPlans }))
    }
}
const mutations = {
    GET_PLAN_DATA: (state, { planlists }) => {
        console.log('数据不见了？');
        console.log(state)
        state.PlanList.resultData = planlists.data;
    },
    GET_GETPLANNEW_DATA: (state, { planNews }) => {
        state.PlanNew.resultData = planNews.data;
    },
    GET_PRODUCTLIST_DATA: (state, { productNames }) => {
        state.ProductList.resultData = productNames.data;
    },
    GET_GETOWBLAND_DATA: (state, { ownLands }) => {
        state.OwnLand.resultData = ownLands.data;
    },
    GET_DELPLAN_DATA: (state, { delPlans }) => {
        state.DelPlan.resultData = delPlans.data;
    }
}

const getters = {
    PlanData (state) {
        console.log('getters state');
        return state.PlanList
    },
    NewPlanData (state) {
        console.log('getters state');
        return state.PlanNew
    },
    
    ProductListData (state) {
        console.log('getters state');
        return state.ProductList
    },
    OwnLandData (state) {
        console.log('getters state');
        return state.OwnLand
    },
    DelPlanData (state) {
        console.log('getters state');
        return state.DelPlan
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}