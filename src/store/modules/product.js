import { fetchGetProducts, fetchKuaidials, fetchSaveProductLinks, delProductInfo, fetchLinkTemp, fetchLinkNames } from './../../fetch/api'

const state = {
    productInfos: {},
    kuaidialInfos: {},
    saveProLink: {},
    linkTemp: {},
    linkNameObj: {},
    delProductInfo: {}
}

const actions = {
    GET_PRODUCT_INFO: ({ commit, state }, opts) => {
        return fetchGetProducts(opts).then(productinfo => commit('PRODUCT_INFOS', { productinfo }))
    },
    GET_KUAIDIALS: ({ commit, state }, opts) => {
        return fetchKuaidials(opts).then(kuaidials => commit('KUAIDIAL_INFOS', { kuaidials }))
    },
    SAVE_PRODUCT_LINKS: ({ commit, state }, opts) => {
        return fetchSaveProductLinks(opts).then(saveProLink => commit('SAVE_PRO_LINKS', { saveProLink }))
    },
    GET_LINK_TEMP: ({ commit, state }, opts) => {
        return fetchLinkTemp(opts).then(linkTemp => commit('GET_LINK_TEMPLATE', { linkTemp }))
    },
    GET_LINK_NAMES: ({ commit, state }) => {
        return fetchLinkNames().then(linkNames => commit('GET_LNAMES', { linkNames }))
    },
    DELETE_PRODUCT_INFO: ({ commit, state }, opts) => {
        return delProductInfo(opts).then(delProduct => commit('DEL_PRO_INFO', { delProduct }));
    }
}

const mutations = {
    PRODUCT_INFOS: (state, { productinfo }) => {
        state.productInfos = productinfo.data;
    },
    KUAIDIAL_INFOS: (state, { kuaidials }) => {
        state.kuaidialInfos = kuaidials.data;
    },
    SAVE_PRO_LINKS: (state, { saveProLink }) => {
        state.saveProLink = saveProLink.data;
    },
    GET_LINK_TEMPLATE: (state, { linkTemp }) => {
        state.linkTemp = linkTemp.data;
    },
    GET_LNAMES: (state, { linkNames }) => {
        state.linkNameObj = linkNames.data;
    },
    DEL_PRO_INFO: (state, { delProduct }) => {
        state.delProductInfo = delProduct.data;
    }
}

const getters = {
    getProductInfos(state) {
        return state.productInfos;
    },
    getKuaidialInfos(state) {
        return state.kuaidialInfos;
    },
    getSaveProLink(state) {
        return state.saveProLink;
    },
    getLinkTemps(state) {
        return state.linkTemp;
    },
    getLinkNames(state) {
        return state.linkNameObj;
    },
    delProductInfo(state) {
        return state.delProductInfo;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}