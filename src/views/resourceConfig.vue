<template>
    <el-row class="pro-box">
        <el-breadcrumb separator="/" class="bread-box">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :span="20" :offset="3" class="pro-content">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="育苗盘" name="info">
                	<ResourceGrow></ResourceGrow>
                </el-tab-pane>
                <el-tab-pane label="种植架" name="">
                    <ResourcePlant> </ResourcePlant>
                </el-tab-pane>
                <el-tab-pane label="采收筐" name="">
                	<TaskSendHarvest></TaskSendHarvest>
                </el-tab-pane>
                
            </el-tabs>
            
        </el-col>
    </el-row>
</template>
<script>
import ResourceGrow from './../components/resourceYuMiao'
import ResourcePlant from './../components/resourceZhongZhi'
import TaskSendHarvest from './../components/resourceCaiShou'
export default {
    components: {
        ResourceGrow,
        ResourcePlant,
        TaskSendHarvest
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