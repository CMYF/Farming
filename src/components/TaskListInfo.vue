<template >
    <el-row class="info-box">
    	<el-col  class="product-box">
            <el-form :inline="true" :model="screenForm" class="screen-form">
                <el-form-item>
                    <el-input v-model="screenForm.no" placeholder="请输入批次号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="screenForm.name" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="screenForm.state" placeholder="请选择计划状态">
                        <el-option v-for="(opt, index) in this.taskStates" :key="index" :label="opt.label" :value="opt.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="screen-btn" @click="screenTask">筛选</el-button>
                </el-form-item>
                 <el-form-item style="float: right;">
                    <el-button class="screen-btn" @click="planBack"  :disabled="isTrue" >撤回</el-button>
                </el-form-item>
                
            </el-form>
            <div class="product-tab-box">
                <el-table ref="singleTable" border :data="tableData" highlight-current-row style="width: 100%"  @current-change="danXuanChange">
                    <el-table-column type="index" label="序号" width="70">
                    </el-table-column>
                    <el-table-column property="picibianhName" label="计划名称" width="160" className="plan-name-td">
                    </el-table-column>
                    <el-table-column property="picibianh" label="批次编号" width="100">
                    </el-table-column>
                    <el-table-column property="productName" label="产品名称" width="120">
                    </el-table-column>
                    <el-table-column property="linkIdName" label="生产环节" width="100">
                    </el-table-column>
                    <el-table-column property="planstartdatetime" label="计划开始时间" width="130">
                    </el-table-column>
                    <el-table-column property="planenddatetime" label="计划结束时间" width="130">
                    </el-table-column>
                    <el-table-column property="createtime" label="任务新建时间" width="130">
                    </el-table-column>
                    <el-table-column property="distributetime" label="任务派发时间" width="130">
                    </el-table-column>
                    <el-table-column property="receivetime" label="任务接收时间" width="100">
                    </el-table-column>
                    <el-table-column property="finishtime" label="任务完成时间" width="100">
                    </el-table-column>
                    <el-table-column property="creator" label="新建者" width="100">
                    </el-table-column>
                    <el-table-column property="abutmentname" label="责任人" width="100">
                    </el-table-column>
                    <el-table-column property="statusName" label="任务状态" width="100">
                    </el-table-column>
                </el-table>
                <el-pagination class="page-box" :total="pageTotle" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.page_number" :page-sizes="[1,2,3,10]" :page-size="page.page_size" layout="total, sizes, prev, pager, next, jumper" >
                </el-pagination>
            </div>
        </el-col>
        
    </el-row>
</template>
<script>
import _j from 'jquery'
import bus from './../eventBus'
import { mapGetters } from 'vuex'
import store from './../store/index'
function fetchTask(store, opt) {
    return store.dispatch('TASKLIST', {
       num: opt.page_number,
       size: opt.page_size,
       states: opt.taskStates,
       pici: opt.page_pici,
       operater: opt.page_operater,
       proName: opt.page_proName
    });
}

function fetchPlanBack(store, opt) {
    return store.dispatch('PLANBACK', {
       ypfPiCiBianH: opt.piciBH,
       ypfSort: opt.piciSort
    });
}

export default {
	store,
    data() {
        return {
        	pageTotle: 1,
        	isTrue: true,
        	page:{
        		page_number: 1,
                page_size: 10,
                taskStates:20,
                page_pici: '',
                page_operater: '',
                page_proName: ''
        	},
        	
        	backPlan: {
        		piciBH: '',
        		piciSort: ''
        	},
        	
            screenForm: {
                no: '',
                name: '',
                link: '',
                state: ''
            },
            planForm: {
                name: '',
                planType: '',
                germinate: '',
                transplant: '',
                weight: '',
                pluck: ''
            },
            isDisabled: true,
            formLabelWidth: '120px',
            currentPage4: 4,
            taskStates: [
                {
                    label: '处理中',
                    value: 1
                },
                {
                    label: '已完成',
                    value: 2
                },
                {
                    label: '已派发',
                    value: 3
                }
            ],
            tableData: []
            
        }
    },
    computed: mapGetters({
        taskListData: 'TaskListData'
    }), 
    beforeMount() {
    	bus.$on('tip', (el) => {
    		console.log("111111111111111")
    		console.log(el)

					fetchTask(this.$store, el).then(() => {
			           this.lgd = this.$store.getters.TaskListData.resultData;
			           if (this.lgd.resultCode === '1') {
			              this.tableData = this.lgd.basePageObj.dataList;
			           	}else{
			           		//this.titleNotice=this.lgd.resultMsg;
			           	}
			        });
			   })
    	
    	
    },
    methods: {
    	
    	
    	
    	
    	planBack(){
    		console.log("000000000000")
    		console.log(this.backPlan)
    		fetchPlanBack(this.$store, this.backPlan).then(() => {
	           this.bk = this.$store.getters.PlanBackData.resultData;
	           if (this.bk.resultCode === '1') {
	              fetchTask(this.$store, this.page).then(() => {
		           this.lgd = this.$store.getters.TaskListData.resultData;
		           if (this.lgd.resultCode === '1') {
		              this.tableData = this.lgd.basePageObj.dataList;
		           	}else{
		           		this.titleNotice=this.lgd.resultMsg;
		           	}
		          });
	           	}else{
	           		//this.titleNotice=this.bk.resultMsg;
	           	}
	        });
    	},
    	danXuanChange(val) {
         	if(val == null || val == ''){
         		this.isTrue = true;
         		return;
         	}else{
         		this.backPlan.piciBH = val.picibianh;
         		this.backPlan.piciSort = val.sort;
		        console.log('22222222222222')
		        console.log(val)
		        this.isTrue = false;
        	}
	        
	        
	      },
    	
        screenTask() {
			this.page.page_size = '';
        	this.page.page_number = 1;
    		fetchTask(this.$store, this.page).then(() => {
	           this.lgd = this.$store.getters.TaskListData.resultData;
	           if (this.lgd.resultCode === '1') {
	              this.pageTotle = this.lgd.basePageObj.dataList.length;
	           	}else{
	           		//this.titleNotice=this.lgd.resultMsg;
	           	}
	        });
	        
	        this.page.page_size = 10;
	        fetchTask(this.$store, this.page).then(() => {
	           this.lgd = this.$store.getters.TaskListData.resultData;
	           if (this.lgd.resultCode === '1') {
	              this.tableData = this.lgd.basePageObj.dataList;
	           	}else{
	           		//this.titleNotice=this.lgd.resultMsg;
	           	}
	        });
        },
        handleSizeChange(val) {
        	console.log(val)
        	this.page.page_size = parseInt(val);
            console.log(`每页 ${val} 条`);
            console.log("22222222222")
            console.log(this.page);
            fetchTask(this.$store, this.page).then(() => {
	           this.lgd = this.$store.getters.TaskListData.resultData;
	           if (this.lgd.resultCode === '1') {
	              this.tableData = this.lgd.basePageObj.dataList;
	           	}else{
	           		this.titleNotice=this.lgd.resultMsg;
	           	}
	        });
            
        },
        handleCurrentChange(val) {
        	console.log(val)
        	this.page.page_number = val;
            console.log(`当前页: ${val}`);
            console.log(this.page)
            fetchTask(this.$store, this.page).then(() => {
	           this.lgd = this.$store.getters.TaskListData.resultData;
	           if (this.lgd.resultCode === '1') {
	              this.tableData = this.lgd.basePageObj.dataList;
	           	}else{
	           		this.titleNotice=this.lgd.resultMsg;
	           	}
	        });
        },
        showPlanInfo(row, column, cell, event) {
            let currRowData = row;
            let dom = _j(cell);
            if (!dom.hasClass('plan-name-td')) {
                return;
            }
//          this.isShowPlanDailog = true;
//          _j('.plan-name-td').removeClass('plan-name-active');
//          dom.addClass('plan-name-active');
        },
        showLinkDetail(e) {
            let dom = _j(e.target);
            let subInfoBoxDom = '';
            let tempDom = '';
            let iconDom = _j('.detail-icon');
            if (dom.hasClass('collapse-ex')) {
                tempDom = dom;
                subInfoBoxDom = tempDom.siblings('.sub-link-info-box');
            } else {
                tempDom = dom.parent('.collapse-ex');
                subInfoBoxDom = tempDom.siblings('.sub-link-info-box');
            }
            if (subInfoBoxDom.hasClass('show')) {
                iconDom.removeClass('detail-icon-show');
                subInfoBoxDom.slideUp('500', function() {
                    subInfoBoxDom.removeClass('show').addClass('hide')
                })
                return;
            }
            iconDom.addClass('detail-icon-show');
            subInfoBoxDom.slideDown('500', function() {
                subInfoBoxDom.removeClass('hide').addClass('show')
            })
        }
    }
}
</script>
<style lang="scss">
.bread-box {
    height: 60px;
    line-height: 60px;
    padding-left: 13.5%;
    font-size: 16px;
    background-color: #fff;
}

.product-box {
    padding-top: 20px;
    margin-top: 10px;
    background-color: #fff;
    text-align: left;
}

.screen-form {
    border-bottom: 1px solid #ccc;
    padding-left: 20px;
}

.product-tab-box {
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
}

.screen-btn {
    background-color: #35cabd;
    color: #fff;
    border-color: #35cabd;
    width: 100px;
    font-size: 16px;
    padding: 9px 15px;
}

.page-box {
    margin-top: 20px;
    text-align: right;
}

.plan-name-td {
    cursor: pointer;
}

.plan-name-active {
    color: #02bdad;
}

.plan-name-td:hover {
    color: #02bdad;
}

.dialog-box {
    .el-dialog--small {
        width: 885px;
    }
    .plan-form {
        border-bottom: 1px solid #ccc;
        .el-form-item {
            width: 400px;
            text-align: left;
            .el-form-item__content,
            .el-select {
                width: 250px;
            }
        }
    }

    .el-dialog__header {
        padding: 0;
        border-bottom: 1px solid #cccccc;
        .el-dialog__title {
            width: 80%;
            height: 35px;
            line-height: 35px;
            display: inline-block;
            border-left: 6px solid #02bdad;
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: left;
            text-indent: 20px;
            float: left;
        }
        .el-dialog__headerbtn {
            margin-top: 20px;
            margin-right: 20px;
            border-radius: 50%;
            border: 1px solid #404040;
            width: 20px;
            height: 20px;
            i {
                color: #404040;
                font-size: 12px;
            }
        }
    }
    .el-dialog__body {
        max-height: 530px;
        overflow-y: auto;
    }
    .product-link-box {
        text-align: left;
        margin-top: 20px;
    }
    .link-name {
        //width: 165px !important;
    }
    .link-name2 {
        width: 80px;
    }
    .link-date,
    .link-time {
        width: 50px;
    }
    .el-dialog__footer {
        border-top: 1px solid #ccc;
        box-shadow: 0px 0px 6px 0px #ccc;
    }
    .dialog-footer-box {
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;

        .el-button {
            width: 160px;
            height: 38px;
            color: #fff;
            font-size: 15px;
        }
        .save-btn {
            background: #02bdad;
        }
        .cancle-btn {
            background: #bbbbbb;
        }
    }
}

.link-info-box {
    margin-top: 20px;
    .info-item {
        // width: 420px;
        position: relative;
        text-align: left;
        margin-bottom: 20px;
        .collapse-ex {
            position: absolute;
            top: 0px;
            cursor: pointer;
            right: 225px;
        }
        .detail-icon {
            display: inline-block;
            transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -webkit-transform: rotate(-90deg);
            -o-transform: rotate(-90deg);
            transition: all .3s;
        }
        .detail-icon-show {
            transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            -moz-transform: rotate(90deg);
            -webkit-transform: rotate(90deg);
            -o-transform: rotate(90deg);
        }
        .sub-link-item {
            margin-top: 15px;
        }
        .link-desc {
            width: 770px;
            margin: 0px auto;
            margin-left: 32px;
            margin-top: 15px;
        }
        .el-form-item__label {
            width: 130px;
        }
    }

    .el-input {
        width: 250px;
    }
}
</style>
