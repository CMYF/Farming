<template>
    <el-row class="pro-box">
        <el-breadcrumb separator="/" class="bread-box">
            <el-breadcrumb-item>任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>任务接收</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :span="20" :offset="3" class="pro-content">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="待处理任务" name="TaskSendType">
                	<TaskGetPending></TaskGetPending>
                </el-tab-pane>
                <el-tab-pane label="已完成任务" name="info">
                    <TaskGetComplete> </TaskGetComplete>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>
<script>
import TaskGetComplete from './../components/TaskGetComplete'
import TaskGetPending from './../components/TaskGetPending'
export default {
    components: {
        TaskGetComplete,
        TaskGetPending
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