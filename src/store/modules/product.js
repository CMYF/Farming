import {
    fetchGetProducts,
    fetchKuaidials,
    fetchSaveProductLinks,
    delProductInfo,
    fetchLinkTemp,
    fetchLinkNames,
    fetchProductLists,
    fetchProductDetail
} from './../../fetch/api'

const state = {
    productInfos: {},
    kuaidialInfos: {},
    saveProLink: {},
    linkTemp: {},
    linkNameObj: {},
    delProductInfo: {},
    proList: {},
    proDetail: {}
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
    },
    // 生产管理
    GET_PRODUCT_List: ({ commit, state }, opts) =>　{
        return fetchProductLists(opts).then( productList => commit('GET_PRODUCT_LISTS', { productList }) );
    },
    GET_PRODUCT_BY_NO: ( { commit, state }, opts ) => {
        return fetchProductDetail(opts).then( proDetail => commit ( 'GET_PRO_DETAIL_BY_NO', { proDetail }))
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
    },
    // 生产管理
    GET_PRODUCT_LISTS: ( state, { productList }) => {
        state.proList = productList.data;
    },
    GET_PRO_DETAIL_BY_NO: ( state, { proDetail }) => {
        state.proDetail = proDetail.data;
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
    },
    // 生产管理
    getProductLists(state) {
        return state.proList;
    },
    getProductDetail(state) {
        return state.proDetail;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}