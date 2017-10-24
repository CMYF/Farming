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
                    <el-button class="screen-btn" @click="screenProduct">筛选</el-button>
                </el-form-item>
                
            </el-form>
            <div class="product-tab-box">
                <el-table ref="singleTable" border :data="tableData" style="width: 100%" @cell-click="showPlanInfo">
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
                <el-pagination class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </el-col>
        <el-dialog class="dialog-box" title="收货地址" :visible.sync="isShowPlanDailog">
            <el-form :model="planForm" :inline="true" ref="form" class="plan-form">
                <el-form-item label="产品名称" :label-width="formLabelWidth">
                    <el-input v-model="planForm.name" :disabled="this.isDisabled" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属分类" :label-width="formLabelWidth">
                    <el-input v-model="planForm.planType" :disabled="this.isDisabled" auto-complete="off"></el-input>
                </el-form-item>

                </el-form-item>
                <el-form-item label="发芽率%" :label-width="formLabelWidth">
                    <el-input v-model="planForm.germinate" :disabled="this.isDisabled" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="移栽成苗率%" :label-width="formLabelWidth">
                    <el-input v-model="planForm.transplant" :disabled="this.isDisabled" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="单棵重g" :label-width="formLabelWidth">
                    <el-input v-model="planForm.weight" :disabled="this.isDisabled" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="采摘周期" :label-width="formLabelWidth">
                    <el-input v-model="planForm.pluck" :disabled="this.isDisabled" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div class="link-info-box">
                <ul class="link-info-items">
                    <li class="info-item">
                        <div class="collapse-title">
                            <label class="el-form-item__label">生产环节名称</label>
                            <el-input :disabled="this.isDisabled"></el-input>
                        </div>
                        <div class="collapse-ex" @click="showLinkDetail">
                            <span> 展开详情</span>
                            <span class="iconfont detail-icon">&#xe7cc;</span>
                        </div>
                        <ul class="sub-link-info-box" style="display:none;">
                            <li class="sub-link-item">
                                <div class="collapse-title">
                                    <label class="el-form-item__label">任务状态</label>
                                    <el-input :disabled="this.isDisabled"></el-input>
                                </div>
                            </li>
                            <li class="sub-link-item">
                                <div class="collapse-title">
                                    <label class="el-form-item__label">实际开始时间</label>
                                    <el-input :disabled="this.isDisabled"></el-input>
                                </div>
                            </li>
                            <li class="sub-link-item">
                                <div class="collapse-title">
                                    <label class="el-form-item__label">实际结束时间</label>
                                    <el-input :disabled="this.isDisabled"></el-input>
                                </div>
                            </li>
                            <el-input type="textarea" class="link-desc" :disabled="this.isDisabled" :rows="5"></el-input>
                        </ul>
                    </li>
                </ul>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
import _j from 'jquery'
import { mapGetters } from 'vuex'
import store from './../store/index'
function fetchTask(store, opt) {
    return store.dispatch('TASKGET', {
       num: opt.page_number,
       size: opt.page_size,
       states: opt.taskStates
    });
}
export default {
	store,
    data() {
        return {
        	page:{
        		page_number: 1,
                page_size: 10,
                taskStates:20
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
            isShowPlanDailog: false,
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
        taskGetData: 'TaskGetData'
    }), 
    beforeMount() {
//  	fetchTask(this.$store, this.page).then(() => {
//             this.lgd = this.$store.getters.TaskGetData.resultData;
//             if (this.lgd.resultCode === '1') {
//                this.tableData = this.lgd.basePageObj.dataList;
//             	}else{
//             		this.titleNotice=this.lgd.resultMsg;
//             	}
//          });
    },
    methods: {
    	
        screenProduct() {

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        showPlanInfo(row, column, cell, event) {
            let currRowData = row;
            let dom = _j(cell);
            if (!dom.hasClass('plan-name-td')) {
                return;
            }
            this.isShowPlanDailog = true;
            _j('.plan-name-td').removeClass('plan-name-active');
            dom.addClass('plan-name-active');
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
