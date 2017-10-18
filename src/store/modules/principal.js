import { fetchLinkData, fetchProducts } from '../../fetch/api'

const state = {
    lineData: {},
    productInfo: {}
}

const actions = {
    GET_LINE_DATAS: ({ commit, state }, opt) => {
        return fetchLinkData(opt).then(linedata => commit('GET_LINE_PRO_DATAS', { linedata }))
    },
    GET_PRODUCTS: ({ commit, state }, opt) => {
        return fetchProducts(opt).then(proinfo => commit('GET_PRODUCT_INFOS', { proinfo }))
    },
}
const mutations = {
    GET_LINE_PRO_DATAS: (state, { linedata }) => {
        state.lineData = linedata.data;
    },
    GET_PRODUCT_INFOS: (state, { proinfo }) => {
        state.productInfo = proinfo.data;
    }
}

const getters = {
    getPrincipalLine (state) {
        console.log('getters state');
        return state.lineData
    },
    getPrincipalNames (state) {
        console.log('getters state');
        return state.productInfo
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}