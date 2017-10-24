import { fetchAddResource,fetchZiYuanNum,fetchDeleteZiYuan } from '../../fetch/api'

const state = {
    AddResource: {
        resultData: {}
    },
    ZiYuanNum: {
    	resultData: {}
    },
    DeleteZiYuan: {
    	resultData: {}
    }
    
}

const actions = {
    ADDRESOURCE: ({ commit, state }, opt) => {
        return fetchAddResource(opt).then(addResources => commit('GET_ADDRESOURCE_DATA', { addResources }))
    },
    ZIYUANNUM: ({ commit, state }, opt) => {
        return fetchZiYuanNum(opt).then(ziYuanNums => commit('GET_ZIYUANNUM_DATA', { ziYuanNums }))
    },
    DELETEZIYUAN: ({ commit, state }, opt) => {
        return fetchDeleteZiYuan(opt).then(deleteZiYuans => commit('GET_DELETEZIYUAN_DATA', { deleteZiYuans }))
    }
}
const mutations = {
    GET_ADDRESOURCE_DATA: (state, { addResources }) => {
        state.AddResource.resultData = addResources.data;
    },
    GET_ZIYUANNUM_DATA: (state, { ziYuanNums }) => {
        state.ZiYuanNum.resultData = ziYuanNums.data;
    },
    GET_DELETEZIYUAN_DATA: (state, { deleteZiYuans }) => {
        state.DeleteZiYuan.resultData = deleteZiYuans.data;
    }
}

const getters = {
    AddResourceData (state) {
        console.log('getters state');
        return state.AddResource
    },
    ZiYuanNumData (state) {
        return state.ZiYuanNum
    },
    DeleteZiYuanData (state) {
        return state.DeleteZiYuan
    }
    
}

export default {
    state,
    actions,
    mutations,
    getters
}