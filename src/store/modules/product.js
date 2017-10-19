import { fetchGetProducts, fetchKuaidials, fetchSaveProductLinks, fetchLinkTemp } from './../../fetch/api'

const state = {
    productInfos: {},
    kuaidialInfos: {},
    saveProLink: {},
    linkTemp: {}
}

const actions = {
    GET_PRODUCT_INFO: ({ commit, state }, opts) => {
        return fetchGetProducts(opts).then( productinfo => commit('PRODUCT_INFOS', { productinfo }))
    },
    GET_KUAIDIALS: ({ commit, state }, opts) => {
        return fetchKuaidials(opts).then(kuaidials => commit('KUAIDIAL_INFOS', { kuaidials }))
    },
    SAVE_PRODUCT_LINKS: ({ commit, state }, opts) => {
        return fetchSaveProductLinks(opts).then(saveProLink=> commit('SAVE_PRO_LINKS', { saveProLink }))
    },
    GET_LINK_TEMP: ({ commit, state }, opts) => {
        return fetchLinkTemp(opts).then(linkTemp => commit('GET_LINK_TEMPLATE', { linkTemp }))
    }
}

const mutations = {
    PRODUCT_INFOS: ( state, { productinfo }) => {
        state.productInfos = productinfo.data;
    },
    KUAIDIAL_INFOS: ( state, { kuaidials }) => {
        state.kuaidialInfos = kuaidials.data;
    },
    SAVE_PRO_LINKS: ( state, { saveProLink }) => {
        state.saveProLink = saveProLink.data;
    },
    GET_LINK_TEMPLATE: ( state, { linkTemp }) => {
        state.linkTemp = linkTemp.data;
    }
}

const getters = {
    getProductInfos(state) {
        return state.productInfos;
    },
    getKuaidialInfos(state){
        return state.kuaidialInfos;
    },
    getSaveProLink(state){
        return state.saveProLink;
    },
    getLnikTemps(state) {
        return state.linkTemp;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}