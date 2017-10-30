<template>
    <el-row class="pro-plan-box">
        <el-breadcrumb separator="/" class="resource-box">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :span="23" class="pro-content">
            <el-tabs v-model="activeName2" type="card" @tab-click="resourceClick">
                <el-tab-pane label="育苗床" name="info">
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
import _j from 'jquery'
import bus from './../eventBus'
import ResourceGrow from './../components/resourceYuMiao'
import ResourcePlant from './../components/resourceZhongZhi'
import TaskSendHarvest from './../components/resourceCaiShou'
import store from './../store/index'
export default {
	store,
    components: {
        ResourceGrow,
        ResourcePlant,
        TaskSendHarvest
    },
    data() {
        return {
            activeName2: 'info',
            ziYuanDate:{
		        AllzyType: '',
		        AllzyName: '',
		        AllzyColumid: '',
		        AllzyStatus: '',
				AllzyPage: 1,
				AllzyPageSize: ''
	        }
        };
    },
    methods: {
         resourceClick(tab) {
        	if(tab.index == 0){
        		bus.$emit('yuMiaoList', this.ziYuanDate)
        	}else if(tab.index == 1){
        		bus.$emit('zhongZhiList', this.ziYuanDate)
        	}else if(tab.index == 2){
        		bus.$emit('caiShouList', this.ziYuanDate)
        	}
        	
        	
        }
    }
};
</script>
<style lang="scss">
.el-table td{
    background-color: #fff;
}

.pro-plan-box {
    height: 60px;
}

.resource-box {
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