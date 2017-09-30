import { fetchHomePage, fetchGetNav } from '../../fetch/api'

const state = {
    HomePage: {
        resultData: {}
    },
    NavData: {}
}

const actions = {
    GET_HOMEPAGE: ({ commit, state }) => {
        return fetchHomePage().then(homepage => commit('GET_HOMEPAGE_DATA', { homepage }))
    }
}
const mutations = {
    GET_HOMEPAGE_DATA: (state, { homepage }) => {
        console.log('数据不见了？');
        console.log(homepage);
        state.HomePage.resultData = homepage.data.pageData;
    }
}

const getters = {
    homeData (state) {
        console.log('getters state');
        return state.HomePage
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}