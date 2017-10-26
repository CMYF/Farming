<template>
    <el-row>
        <el-breadcrumb separator="/" class="bread-box">
            <el-breadcrumb-item>
                <span class="iconfont">&#xe771;</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>生产管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :span="23" class="product-box">
            <el-form :inline="true" :model="screenForm" class="screen-form">
                <el-form-item>
                    <el-input v-model="screenForm.no" placeholder="请输入批次号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="screenForm.name" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="screenForm.link" placeholder="请输入生产环节"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="screenForm.state" placeholder="请选择任务状态">
                        <el-option v-for="(opt, index) in this.taskStates" :key="index" :label="opt.label" :value="opt.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="screen-btn" @click="screenProduct">筛选</el-button>
                </el-form-item>
            </el-form>
            <div class="product-tab-box">
                <el-table ref="singleTable" border :data="this.proDatas.datas" style="width: 100%" @cell-click="showPlanInfo">
                    <el-table-column type="index" label="序号" width="70">
                    </el-table-column>
                    <el-table-column property="planName" label="计划名称"  className="plan-name-td">
                    </el-table-column>
                    <el-table-column property="planNo" label="批次编号" >
                    </el-table-column>
                    <el-table-column property="proName" label="产品名称" >
                    </el-table-column>
                    <el-table-column property="proLink" label="生产环节" width="100">
                    </el-table-column>
                    <el-table-column property="planStarTime" label="主划开始时间" >
                    </el-table-column>
                    <el-table-column property="planEndTime" label="计划结束时间" >
                    </el-table-column>
                    <el-table-column property="factStarTime" label="实际开始时间" >
                    </el-table-column>
                    <el-table-column property="factEndTime" label="实际结束时间" >
                    </el-table-column>
                    <el-table-column property="taskState" label="任务状态" >
                    </el-table-column>
                </el-table>
                <el-pagination class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.proDatas.currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="this.proDatas.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.proDatas.totalRows">
                </el-pagination>
            </div>
        </el-col>
        <el-dialog class="product-dialog-box" title="生产标准详情" :visible.sync="isShowPlanDailog">
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
                    <li class="info-item" v-for="(item, index) in endLinks" :key="index">
                        <div class="collapse-title">
                            <label class="el-form-item__label">生产环节名称</label>
                            <el-input :disabled="item.isDisabled" v-model="item.linkName"></el-input>
                        </div>
                        <div class="collapse-ex" @click="showLinkDetail">
                            <span> 展开详情</span>
                            <span class="iconfont detail-icon">&#xe7cc;</span>
                        </div>
                        <ul class="sub-link-info-box" style="display:none;">
                            <li class="sub-link-item">
                                <div class="collapse-title">
                                    <label class="el-form-item__label">任务状态</label>
                                    <el-input :disabled="item.isDisabled" v-model="item.state"></el-input>
                                </div>
                            </li>
                            <li class="sub-link-item">
                                <div class="collapse-title">
                                    <label class="el-form-item__label">实际开始时间</label>
                                    <el-input :disabled="item.isDisabled" v-model="item.startTime"></el-input>
                                </div>
                            </li>
                            <li class="sub-link-item">
                                <div class="collapse-title">
                                    <label class="el-form-item__label">实际结束时间</label>
                                    <el-input :disabled="item.isDisabled" v-model="item.endTime"></el-input>
                                </div>
                            </li>
                            <li>
                                <el-input type="textarea" class="link-desc" v-model="item.desc" :disabled="item.isDisabled" :rows="5"></el-input>
                            </li>
                            <li class="sub-link-item link-temp-box">
                                <ul class="temp-items-box" v-if="item.isHasDescs">
                                    <li class="temp-item" v-for="(temp,idx) in item.linkDescs" :key="idx">
                                        <span>{{ temp.key }}</span>：
                                        <span>{{ temp.value }}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
import _j from 'jquery'
import store from './../store/index'
function fetchProductList(store, opts) {
    return store.dispatch('GET_PRODUCT_List', opts);
}
function fetchProductByNo(store, opts) {
    return store.dispatch('GET_PRODUCT_BY_NO', opts);
}
export default {
    store,
    data() {
        return {
            screenForm: { // 搜索产品数据
                no: '',
                name: '',
                link: '',
                state: '',
                token: localStorage.token,
                beginPage: 1,
                pageSize: 10
            },
            planForm: { // 弹层产品数据
                name: '',
                planType: '',
                germinate: '',
                transplant: '',
                weight: '',
                pluck: ''
            },
            proDatas: { // 产品列表数据
                beginPage: 1,
                currentPage: 1,
                pageSize: 10,
                totalRows: 0,
                totalPage: 0,
                datas: []
            },
            isDisabled: true,
            formLabelWidth: '120px',
            currentPage4: 4,
            isShowPlanDailog: false,
            taskStates: [ // 计划状态
                {
                    label: '待派发',
                    value: 10
                },
                {
                    label: '已派发',
                    value: 20
                },
                {
                    label: '处理中',
                    value: 30
                },
                {
                    label: '已完成',
                    value: 40
                }
            ],
            tableData: [
                {
                    id: 1,
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                },
                {
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                },
                {
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                },
                {
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                },
                {
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                },
                {
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                },
                {
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                },
                {
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                },
                {
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                },
                {
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                },
                {
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                },
                {
                    planName: '2017番茄普及大计划',
                    planNo: '1023154',
                    proName: '番茄',
                    proLink: '保值',
                    planStarTime: '2017-05-09',
                    planEndTime: '2017-05-09',
                    factStarTime: '2017-05-09',
                    factEndTime: '2017-05-09',
                    taskState: '已完成'
                }
            ],
            endLinks: []
        }
    },
    beforeMount() {
        this.getProductInfo();
    },
    methods: {
        screenProduct() {
            this.getProductInfo();
        },
        handleSizeChange(val) {
            this.proDatas.pageSize = val;
            this.getProductInfo();
        },
        handleCurrentChange(val) {
            this.proDatas.beginPage = val;
            this.proDatas.currentPage = val;
            this.getProductInfo();
        },
        showPlanInfo(row, column, cell, event) {
            let currRowData = row;
            let dom = _j(cell);
            if (!dom.hasClass('plan-name-td')) {
                return;
            }
            let planNo = currRowData.planNo;
            if (!planNo) {
                return;
            }
            // let planNo = 'b9de97a4fab5489899738f23bc7feabf';
            fetchProductByNo(this.$store, { no: planNo, token: localStorage.token }).then(() => {
                let tempData = this.$store.getters.getProductDetail;
                console.log('--------------------------');
                console.log(this.$store);
                if (tempData.resultCode === '1') {
                    let dataObj = tempData.resultObj;
                    let proInfo = dataObj.productInfo;
                    let links = dataObj.linkInfo;
                    this.planForm.id = proInfo.chanpid;
                    this.planForm.germinate = proInfo.fayl;
                    this.planForm.transplant = proInfo.yizcml;
                    this.planForm.weight = proInfo.dankz;
                    this.planForm.name = proInfo.chanpmc;
                    this.planForm.pluck = proInfo.caiszq;
                    this.planForm.planType = proInfo.guisdname;
                    let tempLink = {}, lLen = links.length, tempLinkData = {};
                    for (let i = 0; i < lLen; i++) {
                        tempLink = links[i];
                        tempLinkData = {
                            linkName: tempLink.linkIdName,
                            state: tempLink.status,
                            startTime: tempLink.receivetime,
                            endTime: tempLink.finishtime,
                            desc: tempLink.desc,
                            isDisabled: true,
                            isHasDescs: false
                        };
                        let tempDescs = tempLink.templateform;
                        this.endLinks.push(tempLinkData);
                        console.log('=============================');
                        console.log(tempDescs);
                        if (tempDescs && tempDescs.length > 0) {
                            this.endLinks[i].linkDescs = [];
                            this.endLinks[i].isHasDescs = true;
                            let tLen = tempDescs.length;
                            let tTempItem = {};
                            for (let j = 0; j < tLen; j++) {
                                tTempItem = tempDescs[j];
                                if (tTempItem) {
                                    this.endLinks[i].linkDescs.push({
                                        key: tTempItem.resourceskey,
                                        value: tTempItem.resources
                                    });
                                }
                            }
                        }
                    }
                    console.log('环节有吗？');
                    console.log(this.links);
                }
            });
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
        },
        getProductInfo() {
            fetchProductList(this.$store, this.screenForm).then(() => {
                console.log('获取产品列表：');
                let tempData = this.$store.getters.getProductLists;
                if (tempData.resultCode === '1') {
                    let dataObj = tempData.basePageObj;
                    this.proDatas.currentPage = dataObj.currentPage;
                    this.proDatas.totalPage = dataObj.totalPage;
                    this.proDatas.totalRows = dataObj.totalRows;
                    let tempList = dataObj.dataList;
                    let len = tempList.length;
                    let tempItem = {};
                    this.proDatas.datas.length = 0;
                    for (let i = 0; i < len; i++) {
                        tempItem = tempList[i];
                        this.proDatas.datas.push({
                            id: tempItem.chanpinid,
                            planName: tempItem.jihuamc,
                            planNo: tempItem.picibianh,
                            proName: tempItem.chanpinmc,
                            proLink: tempItem.linkidname,
                            planStarTime: tempItem.jihuajsrq,
                            planEndTime: tempItem.jihuaksrq,
                            factStarTime: tempItem.shijienddatetime,
                            factEndTime: tempItem.shijistartdatetime,
                            taskState: tempItem.zhixingzt
                        });
                    }
                }
            });
        }
    }
}
</script>
<style lang="scss">
.bread-box {
    height: 60px;
    line-height: 60px;
    padding-left: 20px !important;
    font-size: 16px;
    overflow: hidden;
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

.product-dialog-box {
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

.temp-items-box {
    margin-left: 32px;
    margin-top: 15px;
    width: 750px;
    border: 1px solid #ccc;
    background-color: #ccc;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
    .temp-item {
        height: 25px;
        line-height: 25px;
    }
}
</style>
