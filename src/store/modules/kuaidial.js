import {
    fetchAddKuaidial,
    fetchModifyKuaidial,
    fetchDelKuaidial
}
    from './../../fetch/api'

const state = {
    addKuaiData: {},
    modifyKuailData: {},
    delKuaiData: {}
}

const actions = {
    ADD_KUAIDIAL: ({ commit, state }, opts) => {
        return fetchAddKuaidial(opts).then(addkuai => commit('Add_KUAIDIAL_BY_ID', { addkuai }))
    },
    MODIFY_KUAIDIAL: ({ commit, state }, opts) => {
        return fetchModifyKuaidial(opts).then(modifykuai => commit('MODIFY_KUAIDAL_BY_ID', { modifykuai }))
    },
    DEL_KUAIDIAL: ({ commit, state }, opts) => {
        return fetchDelKuaidial(opts).then(delkuai => commit('DEL_KUAIDIAL_BY_ID', { delkuai }))
    }
}

const mutations = {
    Add_KUAIDIAL_BY_ID: (state, { addkuai }) => {
        state.addKuaiData = addkuai.data;
    },
    MODIFY_KUAIDAL_BY_ID: (state, { modifykuai }) => {
        state.modifyKuailData = modifykuai.data;
    },
    DEL_KUAIDIAL_BY_ID: (state, { delkuai }) => {
        state.delKuaiData = delkuai.data;
    }
}

const getters = {
    addKuaidial(state) {
        return state.addKuaiData;
    },
    modifyKuaidial(state){
        return state.modifyKuailData;
    },
    delKuaidial(state) {
        return state.delKuaiData
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}