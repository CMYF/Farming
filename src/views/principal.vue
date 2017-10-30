<template>
    <el-row>
        <el-col :span="23" class="home-pro-content">
            <el-row class="chart-header-box">
                <el-col :span="4" class="title-box">
                    <h1>预估产量</h1>
                </el-col>
                <el-col :span="18" class="mack-box">
                    <div class="date-box">
                        <!--<el-date-picker v-model="params.beginTime" @change="startChange" format="yyyy-MM-dd" type="date" :picker-options="pickerOptions0" placeholder="选择开始日期"></el-date-picker>
                                                            -
                                                            <el-date-picker v-model="params.finishTime" @change="endChange" type="date" :picker-options="pickerOptions0" placeholder="选择结束日期"> </el-date-picker>-->
                        <el-date-picker v-model="value6" type="daterange" range-separator=" / " @change="selectDate" :picker-options="pickerOptions0" placeholder="选择日期范围">
                        </el-date-picker>
                        <el-button class="select-btn" @click="getProductLines()">
                            查询
                        </el-button>
                        <!--  :picker-options="pickerOptions0"-->
                        <div class="day-box">
                            <span class="day-item day-item-day" @click="selectPluckDay('1', $event)">日</span>
                            <span class="day-item day-item-thrday day-item-active" @click="selectPluckDay('3', $event)">三天</span>
                            <span class="day-item day-item-week" @click="selectPluckDay('7', $event)">周</span>
                        </div>
                    </div>

                </el-col>
                <div class="vf-type-box">
                    <div class="type-ex">选择产品：</div>
                    <div class="type-item-box">
                        <el-checkbox-group v-model="chnageTypes" @change="typeChange" :max="5">
                            <el-checkbox v-for="(item, idx) in vfTypes" :label="item.label" :key="idx">{{item.label}}</el-checkbox>
                            <!--<el-checkbox v-for="(item, index) in vfTypes" :key="index" :data-id="item.id " @change="selectProducts(item.id, $event)" :label="item.label" :true-label="item.id">{{ item.label }}
                                                                                                                                                                                </el-checkbox>-->

                        </el-checkbox-group>
                    </div>
                    <div class="show-all-box" @click="showProductNames($event)">
                        <span class="show-all-txt">展开选项</span>
                        <span class="iconfont show-icon ">&#xe7cc;</span>
                    </div>
                </div>

            </el-row>
            <div class="ctx-box">
                <canvas id="myCanvas" width="1202" height="300"></canvas>
            </div>
        </el-col>
        <el-col :span="23" class="task-table-box">
            <el-row>
                <div class="title-box product-title-box">
                    <h1>生产总览</h1>
                </div>
                <el-tabs v-model="taskList.flag" type="card" @tab-click="handleClick">
                    <el-tab-pane label="当日情况" name="1">
                        <!-- <same-day> </same-day>-->
                    </el-tab-pane>
                    <el-tab-pane label="次日任务" name="2">
                        <!-- <tomorrow-task> </tomorrow-task>-->
                    </el-tab-pane>
                </el-tabs>
                <div class="tomo-task-box">
                    <el-table :data="taskListData" stripe style="width: 100%">
                        <el-table-column prop="batch" align="left" label="批次" width="180">
                        </el-table-column>
                        <el-table-column prop="productName" align="left" label="产品" width="200">
                        </el-table-column>
                        <el-table-column prop="distributeTime" align="left" width="240" label="任务派发时间">
                        </el-table-column>
                        <el-table-column prop="proLinks" align="left" label="生产环节" width="120">
                        </el-table-column>
                        <el-table-column prop="address" align="left" label="资源位置" width="150">
                        </el-table-column>
                        <el-table-column prop="manHours" align="left" label="总人工时" width="200">
                        </el-table-column>
                        <el-table-column prop="outputs" align="left" label="生产量">
                        </el-table-column>
                        <el-table-column prop="state" align="left" label="任务状态" width="150">
                        </el-table-column>
                        <el-table-column prop="liable" align="left" label="责任人" width="150">
                        </el-table-column>
                    </el-table>
                    <el-pagination class="page-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="taskList.currentPage" :page-size="taskList.pageSize" layout="total, prev, pager, next" :total="taskList.totalRows">
                    </el-pagination>
                </div>
            </el-row>
        </el-col>
        <el-col :span="23" class="progress-table-box">
            <el-row>
                <div class="title-box product-title-box">
                    <h1>批次进度表</h1>
                </div>
                <div class="select-box">
                    <el-date-picker class="progress-date-box" @change="changeProgressDate" v-model="value6" type="daterange" range-separator=" / " placeholder="选择批次日期范围"></el-date-picker>
                    <el-button class="progress-select-btn" @click="filterProgressData">筛选</el-button>
                </div>
                <el-row class="progress-box">
                    <div class="progress-items">
                        <span class="progress-item">10</span>
                        <span class="progress-item">20</span>
                        <span class="progress-item">30</span>
                        <span class="progress-item">40</span>
                        <span class="progress-item">50</span>
                        <span class="progress-item">60</span>
                        <span class="progress-item">70</span>
                        <span class="progress-item">80</span>
                        <span class="progress-item">90</span>
                        <span class="progress-item sign-box">100
                            <span class="sign">%</span>
                        </span>
                    </div>
                    <div class="clear-float"></div>
                    <el-col :span="3">
                        <ul class="batch-name-box">
                            <li class="batch-item" v-for="(item, index) in batchDatas.names" :title="item.name" :key="index">{{ item.subName }}</li>
                        </ul>
                    </el-col>
                    <el-col :span="19">
                        <ul class="batch-table">
                            <li class="batch-bar-item" v-for="(gress, index) in batchDatas.progress" :key="index">
                                <span class="batch-bar bar-item gobj-progress" :class="gress > 50 ? 'gobj-progress':'not-gobj-progress'" :title="gress +'%'" :style="{width:  gress + '%' }"></span>
                                <span class="batch-txt bar-item" :class="gress > 50 ? 'item-gobj' : 'item-not-gobj'" v-show="gress == 100 ? false : true">{{ gress }}%</span>
                            </li>
                            <span class="line"></span>
                        </ul>
                    </el-col>
                </el-row>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
import _j from 'jquery'
import Chart from 'chart.js'
import SameDay from './../components/SameDay'
import TomorrowTask from './../components/TomorrowTask'
function fetchGetLinePicData(store, opts) {
    return store.dispatch('GET_LINE_DATAS', opts);
}
function fetchGetProductInfo(store) {
    return store.dispatch('GET_PRODUCTS', { token: localStorage.token });
}
function fetchTaskInfoLists(store, opts) {
    return store.dispatch('GET_TASK_INFO_LISTS', opts);
}
function fetchBatchSchedules(store, opts) {
    return store.dispatch('GET_BATCH_SCHEDULE', opts);
}
export default {
    components: {
        SameDay,
        TomorrowTask
    },
    data() {
        return {
            pickerOptions0: {
                disabledDate(time) {
                    return (time.getTime()) > Date.now() - 8.64e7;
                }
            },
            value6: '',
            params: { // 点击查询参数
                beginTime: '',
                finishTime: '',
                pluckDay: 3,
                productIds: ''
            },
            vfTypes: [ // 产品

            ],
            taskListData: [ // 生产总览数据

            ],
            chnageTypes: [], // 选中的产品
            lineData: { // 折线图的数据
                type: 'line',
                data: {
                    labels: [],
                    datasets: []
                }
            },
            taskList: {  // 生产总览参数
                beginPage: 1,
                token: localStorage.token,
                pageSize: 5,
                totalRows: 0,
                totalPage: 0,
                currentPage: 1,
                flag: '1' // 1.当日   2.次日
            },
            batchParams: {
                token: localStorage.token,
                startTime: '',
                endTime: ''
            },
            batchDatas: {
                names: [],
                progress: []
            }

        }
    },
    beforeMount() {
        this.loadProductLines();
        fetchGetProductInfo(this.$store).then(() => {
            let tempData = this.$store.getters.getPrincipalNames;
            if (tempData.resultCode === '1') {
                let tempVFs = tempData.basePageObj.dataList;
                let len = tempVFs.length;
                let tempItem = {};
                for (let i = 0; i < len; i++) {
                    tempItem = tempVFs[i];
                    this.vfTypes.push({
                        label: tempItem.name,
                        id: tempItem.chanpiid
                    });
                }

            }
        });
        this.getProductDatas();
        this.getBatchSchedule();

    },
    mounted() {
    },
    methods: {
        typeChange() {
        },
        changeProgressDate(val) {
            if (val) {
                let date = val.split('/');
                this.batchParams.startTime = date[0];
                this.batchParams.endTime = date[1];
            } else {
                this.batchParams.startTime = '';
                this.batchParams.endTime = '';
            }
        },
        filterProgressData() {
            this.getBatchSchedule();
        },
        selectDate(d) {
            let tempDate = d.split('/');
            this.params.beginTime = tempDate[0];
            this.params.finishTime = tempDate[1];
        },
        // 切换tab页
        handleClick(tab, event) {
            this.taskList = {  // 生产总览参数
                beginPage: 1,
                token: localStorage.token,
                pageSize: 5,
                totalRows: 0,
                totalPage: 0,
                currentPage: 1,
                flag: tab.name // 1.当日   2.次日
            }
            this.getProductDatas()
        },
        selectPluckDay(day, e) {
            let dom = _j(e.currentTarget);
            dom.siblings('.day-item').removeClass('day-item-active');
            dom.addClass('day-item-active');
            this.params.pluckDay = day;
        },
        showProductNames(e) {
            let dom = _j(e.currentTarget);
            let productNameBox = _j('.type-item-box');
            if (dom.hasClass('is-show')) {
                productNameBox.animate({
                    'min-height': '36px'
                }, 500);
                dom.children('.show-icon').removeClass('is-show');
                dom.removeClass('is-show');
                return;
            }
            dom.addClass('is-show');
            dom.children('.show-icon').addClass('is-show');
            productNameBox.animate({
                'min-height': '150px',
            }, 500);
        },
        selectProducts(id, event) {

        },
        getProductLines() {
            this.decChnageProduct();
            this.loadProductLines('yes');
        },
        decChnageProduct() {
            let oldType = this.vfTypes;
            let oLen = oldType.length;
            let selectType = this.chnageTypes;
            let sLen = selectType.length;
            let ids = [];
            for (let i = 0; i < sLen; i++) {
                for (let j = 0; j < oLen; j++) {
                    if (selectType[i] === oldType[j].label) {
                        ids.push(oldType[j].id);
                    }
                }
            }
            this.params.productIds = ids.join(',');
        },
        // 加载折线图数据
        loadProductLines(isClick) {
            let startTime = this.params.beginTime;
            let endTime = this.params.finishTime;
            /*if (isClick) {
                if ((!startTime && endTime) || (!endTime && startTime)) {
                    this._showMessage('error', '开始日期和结束日期都是必须的！');
                    return;
                }
            }*/
            let opts = {
                token: localStorage.token,
                startTime: startTime,
                endTime: endTime,
                day: this.params.pluckDay,
                productIds: this.params.productIds
            }
            fetchGetLinePicData(this.$store, opts).then(() => {
                let tempData = this.$store.getters.getPrincipalLine;
                if (tempData.resultCode === '1') {
                    let tempObj = tempData.resultObj;
                    this.lineData.data.labels = tempObj[0].labels;
                    let tempDatasets = tempObj[1].datasets;
                    let len = tempDatasets.length;
                    let tempDataObj = {};
                    let aph = '';
                    let backgorundColor = [];
                    let borderColor = [];
                    this.lineData.data.datasets.length = 0;
                    for (let i = 0; i < len; i++) {
                        tempDataObj.label = tempDatasets[i].chanpiMc;
                        tempDataObj.data = tempDatasets[i].data;
                        backgorundColor = ['rgba(2, 189, 173, ' + (aph + ('0.' + (i + 1))) + ')'];
                        borderColor = ['rgba(2, 189, 173, ' + (aph + ('0.' + (i + 2))) + ')'];
                        this.lineData.data.datasets.push({
                            label: tempDataObj.label,
                            data: tempDataObj.data,
                            borderColor: borderColor,
                            backgroundColor: backgorundColor
                        });
                    }
                }
                let ctx = _j('#myCanvas');
                let opts = {
                    scaleOverride: true,   //是否用硬编码重写y轴网格线
                    scaleSteps: 10,        //y轴刻度的个数
                    scaleStepWidth: 300,   //y轴每个刻度的宽度
                    scaleStartValue: 0,    //y轴的起始值
                    pointDot: true,        //是否显示点
                    pointDotRadius: 5,     //点的半径
                    pointDotStrokeWidth: 1,//点的线宽
                    datasetStrokeWidth: 3, //数据线的线宽
                    animation: true,       //是否有动画效果
                    animationSteps: 60    //动画的步数
                }
                let myChart = new Chart(ctx, this.lineData, opts);
                //myChart.clear();
            });
        },
        handleSizeChange(val) {
            this.taskList.pageSize = val;
            this.getProductDatas();
        },

        handleCurrentChange(val) {
            this.taskList.beginPage = val;
            this.taskList.currentPage = val;
            this.getProductDatas();
        },
        // 获取生产总览数据
        getProductDatas() {
            fetchTaskInfoLists(this.$store, this.taskList).then(() => {
                let tempData = this.$store.getters.getTakInfoLists;
                if (tempData.resultCode === '1') {
                    let tempObj = tempData.basePageObj;
                    this.taskList.totalRows = tempObj.totalRows;
                    this.taskList.totalPage = tempObj.totalPage;
                    let tempDataList = tempObj.dataList;
                    let tempItem = {};
                    let len = tempDataList.length;
                    this.taskListData.length = 0;
                    this.taskListData = [];
                    if (len < 0) {
                        return;
                    }
                    for (let i = 0; i < len; i++) {
                        tempItem = tempDataList[i];
                        this.taskListData.push({
                            batch: tempItem.picibianh,  // 批次
                            productName: tempItem.chanpinmc, // 产品
                            distributeTime: tempItem.distributeTime, // 派发时间
                            proLinks: tempItem.linkIdName, // 生产环节
                            address: tempItem.resourceId, // 资源地址
                            manHours: tempItem.costTime, // 人工时
                            outputs: tempItem.harverst, // 产量
                            state: tempItem.statusName, // 状态
                            liable: tempItem.abutmentName // 责任人
                        });
                    }
                }
            });

        },
        getBatchSchedule() {
            fetchBatchSchedules(this.$store, this.batchParams).then(() => {
                let tempData = this.$store.getters.getBatchSchedules;
                if (tempData.resultCode === '1') {
                    this.batchDatas.progress.length = 0;
                    this.batchDatas.names.length = 0;
                    let tempObj = tempData.resultObj;
                    let len = tempObj.length;
                    let tempItem = {};
                    let tempName = '';
                    let subStr = '';
                    for (let i = 0; i < len; i++) {
                        tempItem = tempObj[i];
                        tempName = tempItem.name;
                        if (tempName.length > 9) {
                            subStr = tempName.substr(0, 9) + '...'
                        } else {
                            subStr = tempName;
                        }
                        this.batchDatas.names.push({
                            subName: subStr,
                            name: tempName
                        });
                        this.batchDatas.progress.push(tempItem.bacth);
                    }
                } else {
                    this._showMessage('info', tempData.resultMsg + '!');
                }
            });
        },
        _showMessage(type, msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: type
            });
        }

    }
}
</script>
<style lang="scss">
@import './../assets/scss/cmy-variable.scss';
.home-pro-content {
    background-color: $white;
    margin-top: 15px;
    padding-left: 20px;
    padding-bottom: 20px;
    min-height: 510px;
    padding-right: 20px;
}

.title-box h1 {
    font-size: $font-base-sm-title;
    font-weight: 100;
    line-height: 62px;
    text-align: left;
    color: $m-black-3;
}

.product-title-box h1 {
    padding-left: 20px;
}

.chart-header-box {
    .mack-box {
        text-align: right;
        line-height: 62px;
        .date-box {
            width: auto;
            display: inline-block;
            .el-input__inner {
                height: 30px;
            }
        }
        .day-box {
            float: right;
            border: 1px solid $m-main--b;
            height: 30px;
            border-radius: 4px;
            width: 180px;
            line-height: 30px;
            margin-left: 30px;
            margin-top: 13px;
            font-size: $font-base-sm-s;
            .day-item {
                text-align: center;
                width: 60px;
                display: inline-block;
                float: left;
                color: #02bdad;
                cursor: pointer;
            }
            .day-item-active {
                background-color: #02bdad;
                color: #fff;
            }
        }
        .select-btn {
            float: right;
            width: 72px;
            height: 30px;
            border: none;
            color: #fff;
            padding: 0px;
            text-align: center;
            font-size: $font-base-sm-s;
            margin-top: 13px;
            margin-left: 30px;
            background-color: #02bdad;
        }
    }
    .vf-type-box {
        width: 98.5%;
        clear: both; //padding-left: 20px;
        height: auto;
        overflow: hidden;
        border: 1px solid #ccc;

        .type-ex {
            width: 100px;
            float: left;
            line-height: 36px;
            color: $m-black-9;
        }
        .type-item-box {
            float: left;
            width: 60%;
            height: 36px;
            text-align: left;
            overflow: hidden;
            .el-checkbox {
                margin-left: 0px;
                padding-left: 8px;
                padding-right: 8px;
                line-height: 36px;
                color: $m-black-9;
            }
            .el-checkbox__inner {
                width: 14px;
                height: 14px;
            }
            .el-checkbox__inner::after{
                height: 6px;
                left: 3px;
                vertical-align: top;
            }
        }
        .show-all-box {
            line-height: 36px;
            width: 100px;
            float: left;
            margin-left: 100px;
            cursor: pointer;
            color: $m-black-9;
            .show-icon {
                display: inline-block;
                transform: rotate(-90deg);
                -webkit-transform: rotate(-90deg);
                transition: all .3s;
                -webkit-transform: all .3s;
                -moz-transform: all .3s;
                -ms-transform: all .3s;
                -o-transform: all .3s;
            }
            .is-show {
                transform: rotate(90deg);
                -webkit-transform: rotate(90deg);
                -moz-transform: rotate(90deg);
                -ms-transform: rotate(90deg);
                -o-transform: rotate(90deg);
            }
        }
    }
}

.ctx-box {
    height: auto;
    overflow: hidden;
    width: 100%;
}

.el-tabs__item.is-active {
    color: $m-black-3;
}

.el-table th>.cell {
    font-size: $font-base-sm-s;
    color: $m-black-3;
}

.el-table tr td>.cell {
    font-size: $font-base-sm-s;
    color: $m-black-9;
}

.task-table-box,
.progress-table-box {
    background-color: #fff;
    margin-top: 15px;
    padding-bottom: 20px;
    .el-tabs__header {
        padding-left: 20px;
    }
}

.progress-table-box {
    padding-bottom: 40px;
    margin-bottom: 80px;
    .select-box {
        margin-bottom: 20px;
    }
    .progress-date-box {
        margin-left: 20px;
        .el-input__inner {
            height: 30px;
        }
    }
    .select-box {
        text-align: left;
    }
    .progress-select-btn {
        width: 72px;
        height: 30px;
        border: none;
        color: #fff;
        padding: 0px;
        text-align: center;
        font-size: $font-base-sm-s;
        margin-top: 13px;
        margin-left: 30px;
        background-color: #02bdad;
    }
}

.progress-box {
    padding-left: 20px;
    padding-right: 20px;
    .progress-items {
        width: 79.166667%;
        float: left;
        margin-left: 12.5%;
        border-bottom: 1px solid #ccc;
        .progress-item {
            width: 10%;
            display: inline-block;
            text-align: right;
            float: left;
            color: #999;
        }
        .sign-box {
            position: relative;
            .sign {
                position: absolute;
                right: -18px;
                bottom: -9px;
            }
        }
    }
    .batch-name-box {
        text-align: right;
    }
    .batch-table {
        text-align: left; //border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        position: relative;
        .bar-item {
            display: inline-block;
            height: 24px;
            line-height: 24px;
            float: left;
        }

        .batch-txt {
            color: #999;
            padding-left: 5px;
            font-size: $font-base-sm-s;
        }
        .item-gobj {
            color: #71bfff;
        }
        .item-not-gobj {
            color: #ffd75d;
        }
        .line {
            position: absolute;
            top: 0px;
            left: 50%;
            width: 1px;
            height: 100%;
            border-left: 1px dashed red;
        }
    }
    .batch-name-box,
    .batch-table {
        clear: both;
        padding-top: 20px;
        li {
            height: 24px;
            line-height: 24px;
            margin-top: 15px;
        }
    }
    .batch-name-box {
        li {
            padding-right: 10px;
            color: #999999;
        }
    }
    .gobj-progress {
        background-color: #71bfff;
        color: #71bfff;
    }
    .not-gobj-progress {
        background-color: #ffd75d;
        color: #ffd75d;
    }
}

.clear-float {
    clear: both;
}

.tomo-task-box {
    padding-left: 20px;
    padding-right: 20px;
}

.page-box {
    text-align: right;
    margin-top: 10px;
}

@media (max-width: 1420px) {
    .progress-box .batch-name-box li {
        font-size: 15px;
    }
}
</style>
