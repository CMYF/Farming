import { fetchAllRoles, fetchDelByIds, fetchAddRole, fetchGetRoleById, fetchUpdateById } from './../../fetch/api'

let state = {
    roleDatas: {},
    delRoleData: {},
    addRole: {},
    getRoleById: {},
    updateRoleById: {}
}

let actions = {
    GET_ALL_ROLES: ({ commit, state }, opts) => {
        return fetchAllRoles(opts).then(roles => commit('GET_ALL', { roles }))
    },
    DELETE_ROLE_BY_ID: ({ commit, state }, opts) =>　{
        return fetchDelByIds(opts).then( roles => commit ('Del_ROLES_BYID', { roles }) )
    },
    ADD_ROLES: ( { commit, state }, opts ) => {
        return fetchAddRole(opts).then(role => commit('ADD_ROLE', { role }))
    },
    GET_ROLE_BY_ID: ({ commit, state }, opts) => {
        return fetchGetRoleById(opts).then(role => commit ('GET_ROLE_BYID', { role }))
    },
    UPDATE_BY_ID: ({ commit, state }, opts) => {
        return fetchUpdateById(opts).then(role => commit ('UPDATE_ROLE_BY_ID', { role }))
    }
}

let mutations = {
    GET_ALL: (state, { roles }) => {
        state.roleDatas = roles.data;
    },
    Del_ROLES_BYID: ( state, { roles }) => {
        state.delRoleData = roles.data;
    },
    ADD_ROLE: ( state, { role } ) => {
        state.addRole =  role.data;
    },
    GET_ROLE_BYID: ( state, { role }) => {
        state.getRoleById = role.data;
    },
    UPDATE_ROLE_BY_ID: (state, { role }) => {
        state.updateRoleById = role.data;
    }
}

let getters = {
    getAllRoles(state) {
        return state.roleDatas;
    },
    delRoles(state){
        return state.delRoleData;
    },
    addRoles( state ){
        return state.addRole;
    },
    getRoleById(state) {
        return state.getRoleById;
    },
    updateData(state) {
        return state.updateRoleById;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}