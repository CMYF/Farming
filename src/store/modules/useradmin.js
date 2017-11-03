import { fetchAllUsers, fetchUserById, fetchUpateUserById,fetchAddUsers ,fetchDelUsers} from './../../fetch/api'

let state = {
    UserLists: {},
    user: {},
    upUser: {},
    AddUser:{},
    delUser:{}
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
    },
    ADD_USER: ({ commit, state }, opts) => {
        return fetchAddUsers(opts).then(addUsers => commit ('GET_ADD_USER',{ addUsers }))
    },
    DEL_USER: ({ commit, state }, opts) => {
        return fetchDelUsers(opts).then(delUsers => commit ('GET_DEL_USER',{ delUsers }))
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
    },
    GET_ADD_USER: (state, { addUsers }) => {
        state.AddUser = addUsers.data;
    },
    GET_DEL_USER: (state, { delUsers }) => {
        state.delUser = delUsers.data;
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
    },
    getAddUser(state) {
        return state.AddUser;
    },
    getDelUser(state) {
        return state.delUser;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}