<template>
    <el-row class="pro-task1">
        <el-breadcrumb separator="/" class="task-box1">
            <el-breadcrumb-item>任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>任务接收</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :span="23" class="pro-content">
            <el-tabs v-model="activeName2" type="card" @tab-click="taskGetClick">
                <el-tab-pane label="待处理任务" name="info">
                	<TaskGetPending></TaskGetPending>
                </el-tab-pane>
                <el-tab-pane label="已完成任务" name="">
                    <TaskGetComplete> </TaskGetComplete>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>
<script>
import _j from 'jquery'
import bus from './../eventBus'
import TaskGetComplete from './../components/TaskGetComplete'
import TaskGetPending from './../components/TaskGetPending'
import store from './../store/index'
export default {
	store,
    components: {
        TaskGetComplete,
        TaskGetPending
    },
    data() {
        return {
            activeName2: 'info',
            page:{
        		page_number: 1,
                page_size: 10,
                taskStates: '',
                page_pici: '',
                page_operater: '',
                page_proName: ''
        	}
        };
    },
    methods: {
        taskGetClick(tab) {
            if(tab.index == 0){
        		bus.$emit('getPengding', this.page)
        	}else{
        		console.log('1234')
        		bus.$emit('getComplete', this.page)
        	}
        }
    }
};
</script>
<style lang="scss">
.el-table td{
    background-color: #fff;
}

.pro-task1 {
    height: 60px;
}

.task-box1 {
    height: 60px;
    line-height: 60px;
    padding-left: 2%;
    font-size: 16px;
    background-color: #fff;
}

.pro-content {
    margin-top: 10px;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    background-color: #fff;
}

.info {
    padding-top: 20px;
}
</style>