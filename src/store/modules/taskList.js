import { fetchTask } from '../../fetch/api'

const state = {
    Tasklist: {
        resultData: {}
    }
}

const actions = {
    TASKLIST: ({ commit, state }, opt) => {
        return fetchTask(opt).then(taskLists => commit('GET_TASKLIST_DATA', { taskLists }))
    }
}
const mutations = {
    GET_TASKLIST_DATA: (state, { taskLists }) => {
        console.log('数据不见了？');
        console.log(state)
        console.log(taskLists);
        state.Tasklist.resultData = taskLists.data;
    }
}

const getters = {
    TaskListData (state) {
        console.log('getters state');
        return state.Tasklist
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}