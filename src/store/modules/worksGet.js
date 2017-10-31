import { fetchTask } from '../../fetch/api'

const state = {
    Taskget: {
        resultData: {}
    }
}

const actions = {
    TASKGET: ({ commit, state }, opt) => {
        return fetchTask(opt).then(taskGets => commit('GET_TASKGET_DATA', { taskGets }))
    }
}
const mutations = {
    GET_TASKGET_DATA: (state, { taskGets }) => {
        console.log('数据不见了？');
        console.log(state)
        console.log(taskGets);
        state.Taskget.resultData = taskGets.data;
    }
}

const getters = {
    TaskGetData (state) {
        console.log('getters state');
        return state.Taskget
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}