import { fetchGetProducts, fetchKuaidials } from './../../fetch/api'

const state = {
    productInfos: {},
    kuaidialInfos: {}
}

const actions = {
    GET_PRODUCT_INFO: ({ commit, state }, opts) => {
        return fetchGetProducts(opts).then( productinfo => commit('PRODUCT_INFOS', { productinfo }))
    },
    GET_KUAIDIALS: ({ commit, state }, opts) => {
        return fetchKuaidials(opts).then(kuaidials => commit('KUAIDIAL_INFOS', { kuaidials }))
    }
}

const mutations = {
    PRODUCT_INFOS: ( state, { productinfo }) => {
        state.productInfos = productinfo.data;
    },
    KUAIDIAL_INFOS: ( state, { kuaidials }) => {
        state.kuaidialInfos = kuaidials.data;
    }
}

const getters = {
    getProductInfos(state) {
        return state.productInfos;
    },
    getKuaidialInfos(state){
        return state.kuaidialInfos;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}