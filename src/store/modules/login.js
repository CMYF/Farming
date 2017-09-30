import { fetchLogin } from '../../fetch/api'

const state = {
    LoginPage: {
        resultData: {}
    }
}

const actions = {
    LOGIN: ({ commit, state }, opt) => {
        return fetchLogin(opt).then(loginpage => commit('GET_LOGIN_DATA', { loginpage }))
    }
}
const mutations = {
    GET_LOGIN_DATA: (state, { loginpage }) => {
        console.log('数据不见了？');
        console.log(loginpage);
        state.LoginPage.resultData = loginpage.data;
    }
}

const getters = {
    LoginData (state) {
        console.log('getters state');
        return state.LoginPage
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}