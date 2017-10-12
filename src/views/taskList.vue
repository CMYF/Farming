<template>
    <el-row class="pro-box">
        <el-breadcrumb separator="/" class="bread-box">
            <el-breadcrumb-item>任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>任务列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :span="20" :offset="3" class="pro-content">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="待派发任务" name="TaskSendType">
                	<TaskSendList></TaskSendList>
                </el-tab-pane>
                <el-tab-pane label="已派发任务" name="info">
                    <TaskListInfo> </TaskListInfo>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>
<script>
import TaskListInfo from './../components/TaskListInfo'
import TaskSendList from './../components/TaskSendList'
export default {
    components: {
        TaskListInfo,
        TaskSendList
    },
    data() {
        return {
            activeName2: 'info'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style lang="scss">
.el-table td{
    background-color: #fff;
}

.pro-box {
    height: 60px;
}

.bread-box {
    height: 60px;
    line-height: 60px;
    padding-left: 14%;
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