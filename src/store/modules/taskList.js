import { fetchTask,fetchSendTask,fetchTaskCircle,fetchTaskZiyuan,fetchPlanList } from '../../fetch/api'

const state = {
    Tasklist: {
        resultData: {}
    },
    
    SendTaskList:{
       resultData: {}
    },
    
    TaskCircle:{
      resultData: {}
    },
    
    TaskZiyuan:{
      resultData: {}
    }
    
    
}

const actions = {
    TASKLIST: ({ commit, state }, opt) => {
        return fetchTask(opt).then(taskLists => commit('GET_TASKLIST_DATA', { taskLists }))
    },
    SENDTASKLIST: ({ commit, state }, opt) => {
        return fetchSendTask(opt).then(sendTaskLists => commit('GET_SENDTASKLIST_DATA', { sendTaskLists }))
    },
    TASKCIRCLE: ({ commit, state }, opt) => {
        return fetchTaskCircle(opt).then(taskCircles => commit('GET_TASKCIRCLE_DATA', { taskCircles }))
    },
    TASKZIYUAN: ({ commit, state }, opt) => {
        return fetchTaskZiyuan(opt).then(taskZiyuans => commit('GET_TASKZIYUAN_DATA', { taskZiyuans }))
    }
}
const mutations = {
    GET_TASKLIST_DATA: (state, { taskLists }) => {
        state.Tasklist.resultData = taskLists.data;
    },
    GET_SENDTASKLIST_DATA: (state, { sendTaskLists }) => {
    	console.log("成功")
        state.SendTaskList.resultData = sendTaskLists.data;
    },
    GET_TASKCIRCLE_DATA: (state, { taskCircles }) => {
    	console.log("成功")
        state.TaskCircle.resultData = taskCircles.data;
    },
    GET_TASKZIYUAN_DATA: (state, { taskZiyuans }) => {
    	console.log("成功1")
        state.TaskZiyuan.resultData = taskZiyuans.data;
    },
}

const getters = {
    TaskListData (state) {
        console.log('getters state');
        return state.Tasklist
    },
    
    SendTaskListData (state) {
    	return state.SendTaskList
    },
    
    TaskCircleData (state) {
    	return state.TaskCircle
    },
    TaskZiyuanData (state) {
    	return state.TaskZiyuan
    }
    
}

export default {
    state,
    actions,
    mutations,
    getters
}