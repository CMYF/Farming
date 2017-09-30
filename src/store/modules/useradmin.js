import { fetchAllUsers, fetchUserById, fetchUpateUserById } from './../../fetch/api'

let state = {
    UserLists: {},
    user: {},
    upUser: {}
}

let actions = {
    GET_ALL_USERS: ({ commit, state }, opts) => {
        return fetchAllUsers(opts).then(users => commit ('GET_ALL_USERS', { users }));
    },
    GET_USER_BY_ID: ({ commit, state }, opts) => {
        return fetchUserById(opts).then(user => commit ('GET_USER_BYID', { user }))
    },
    UPDATE_USER_BY_ID: ({ commit, state }, opts) => {
        return fetchUpateUserById(opts).then(updateUser => commit ('UPDATE_USER_BYID',{ updateUser }))
    }
}

let mutations = {
    GET_ALL_USERS: (state, { users }) => {
        state.UserLists = users.data;
    },
    GET_USER_BYID: (state, { user }) => {
        state.user = user.data;
    },
    UPDATE_USER_BYID: (state, { updateUser }) => {
        state.upUser = updateUser.data;
    }
}

let getters = {
    getUserDatas(state) {
        return state.UserLists;
    },
    getUserInfoById(state) {
        return state.user
    },
    getUpdateUserInfo(state) {
        return state.upUser;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}