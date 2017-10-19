import { fetchLinkData, fetchProducts, fetchGetTaskInfoLists, fetchBatchScheduleDatas } from '../../fetch/api'

const state = {
    lineData: {},
    productInfo: {},
    taskInfoLists: {},
    batchSchedules: {}
}

const actions = {
    GET_LINE_DATAS: ({ commit, state }, opt) => {
        return fetchLinkData(opt).then(linedata => commit('GET_LINE_PRO_DATAS', { linedata }))
    },
    GET_PRODUCTS: ({ commit, state }, opt) => {
        return fetchProducts(opt).then(proinfo => commit('GET_PRODUCT_INFOS', { proinfo }))
    },
    GET_TASK_INFO_LISTS: ({ commit, state }, opts) => {
        return fetchGetTaskInfoLists(opts).then(tasklists => commit('GET_TASK_LIST',  { tasklists }));
    },
    GET_BATCH_SCHEDULE: ({ commit, state }, opts) => {
        return fetchBatchScheduleDatas(opts).then(batchlist => commit('GET_BATCH_LISTS', { batchlist }))
    }
}
const mutations = {
    GET_LINE_PRO_DATAS: (state, { linedata }) => {
        state.lineData = linedata.data;
    },
    GET_PRODUCT_INFOS: (state, { proinfo }) => {
        state.productInfo = proinfo.data;
    },
    GET_TASK_LIST: (state, { tasklists }) => {
        state.taskInfoLists = tasklists.data;
    },
    GET_BATCH_LISTS: ( state, { batchlist }) => {
        state.batchSchedules = batchlist.data;
    }
}

const getters = {
    getPrincipalLine (state) {
        console.log('getters state');
        return state.lineData;
    },
    getPrincipalNames (state) {
        console.log('getters state');
        return state.productInfo;
    },
    getTakInfoLists(state) {
        return state.taskInfoLists;
    },
    getBatchSchedules(state) {
        return state.batchSchedules;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}