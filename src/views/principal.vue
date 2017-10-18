<template>
    <el-row>
        <el-col :span="23" class="pro-content">
            <el-row class="chart-header-box">
                <el-col :span="6" class="title-box">
                    <h1>预估产量</h1>
                </el-col>
                <el-col :span="16" class="mack-box">
                    <div class="date-box">
                        <el-date-picker v-model="params.beginTime"  @change="startChange" format="yyyy-MM-dd" type="date" placeholder="选择开始日期" ></el-date-picker>
                        -
                        <el-date-picker v-model="params.finishTime"   @change="endChange" type="date" placeholder="选择结束日期" > </el-date-picker>
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
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="当日情况" name="now">
                        <same-day> </same-day>
                    </el-tab-pane>
                    <el-tab-pane label="次日任务" name="task">
                        <tomorrow-task> </tomorrow-task>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
        </el-col>
        <el-col :span="23" class="progress-table-box">
            <el-row>
                <div class="title-box product-title-box">
                    <h1>批次进度表</h1>
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
                    <el-col :span="2">
                        <ul class="batch-name-box">
                            <li class="batch-item">第一批次</li>
                            <li class="batch-item">第一批次</li>
                            <li class="batch-item">第一批次</li>
                            <li class="batch-item">第一批次</li>
                            <li class="batch-item">第一批次</li>
                        </ul>
                    </el-col>
                    <el-col :span="20">
                        <ul class="batch-table">
                            <li class="batch-bar-item">
                                <span class="batch-bar bar-item gobj-progress" style="width:80%"></span>
                                <span class="batch-txt bar-item">80%</span>
                            </li>
                            <li class="batch-bar-item">
                                <span class="batch-bar bar-item not-gobj-progress" style="width: 40%"></span>
                                <span class="batch-txt bar-item">40%</span>
                            </li>
                            <li class="batch-bar-item">
                                <span class="batch-bar bar-item gobj-progress" style="width: 65%"></span>
                                <span class="batch-txt bar-item">65%</span>
                            </li>
                            <li class="batch-bar-item">
                                <span class="batch-bar bar-item gobj-progress" style="width: 75%"></span>
                                <span class="batch-txt bar-item">75%</span>
                            </li>
                            <li class="batch-bar-item">
                                <span class="batch-bar bar-item not-gobj-progress" style="width: 12%"></span>
                                <span class="batch-txt bar-item">12%</span>
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
            params: {
                beginTime: '',
                finishTime: '',
                pluckDay: 3,
                productIds: ''
            },
            value1: '',
            value2: '',
            activeName2: 'now',
            vfTypes: [

            ],
            chnageTypes: []
        }
    },
    beforeMount() {
        this.loadProductLines();
        fetchGetProductInfo(this.$store).then(() => {
            console.log('获取所有产品名成功了吗？');
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

    },
    mounted() {

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
        let data = {
            type: 'line',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Brown", "Black"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3, 60, 80],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: '# of Votes',
                    data: [20, 30, 40, 50, 60, 70, 80, 500],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        '#71bfff'
                    ],
                    borderWidth: 1
                },
                {
                    label: '# of aaa',
                    data: [2, 22, 8, 5, 36, 12, 200, 450],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 240, 86, 0.2)',
                        'rgba(75, 81, 192, 0.2)',
                        'rgba(153, 222, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',

                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        }
        let myChart = new Chart(ctx, data, opts);
    },
    methods: {
        typeChange() {
        },
        startChange(d){
            this.params.beginTime = d;
        },
        endChange(d) {
            this.params.finishTime = d;
        },
        handleClick(tab, event) {
            console.log(tab, event);
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
                    'min-height': '30px'
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
                        productIds.push(oldType[j].id);
                    }
                }
            }
            this.params.productIds = ids.join(',');
        },
        loadProductLines(isClick) {
            let startTime = this.params.beginTime;
            let endTime = this.params.finishTime;
            if (isClick) {
                if ((!startTime && endTime) || (!endTime && startTime)) {
                    console.log('yes');
                    return;
                }
            }
            let opts = {
                token: localStorage.token,
                startTime: startTime,
                endTime: endTime,
                day: this.params.pluckDay,
                productIds: this.params.productIds
            }
            fetchGetLinePicData(this.$store, opts).then(() => {
                let tempData = this.$store.getters.getPrincipalLine;
                console.log(tempData);
            });
        },

    }
}
</script>
<style lang="scss">
.pro-content {
    background-color: #fff;
    margin-top: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
    min-height: 510px;
    padding-right: 20px;
}

.title-box h1 {
    font-size: 22px;
    font-weight: 100;
    line-height: 62px;
    text-align: left;
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
        }
        .day-box {
            float: right;
            border: 1px solid #02bdad;
            height: 34px;
            border-radius: 4px;
            width: 210px;
            line-height: 34px;
            margin-left: 30px;
            margin-top: 13px;
            .day-item {
                text-align: center;
                width: 70px;
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
            width: 100px;
            height: 34px;
            border: none;
            color: #fff;
            text-align: center;
            font-size: 18px;
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
            line-height: 30px;
        }
        .type-item-box {
            float: left;
            width: 60%;
            height: 30px;
            text-align: left;
            overflow: hidden;
            .el-checkbox {
                margin-left: 0px;
                padding-left: 8px;
                padding-right: 8px;
                line-height: 30px;
            }
        }
        .show-all-box {
            line-height: 30px;
            width: 100px;
            float: left;
            margin-left: 100px;
            cursor: pointer;
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

.task-table-box,
.progress-table-box {
    background-color: #fff;
    margin-top: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    .el-tabs__header {
        padding-left: 20px;
    }
}

.progress-table-box {
    padding-bottom: 40px;
    margin-bottom: 80px;
}

.progress-box {
    padding-left: 20px;
    padding-right: 20px;
    .progress-items {
        width: 83.33333%;
        float: left;
        margin-left: 8.33333%;
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
            height: 30px;
            line-height: 30px;
            float: left;
        }
        .batch-txt {
            color: #999;
            padding-left: 5px;
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
            height: 30px;
            line-height: 30px;
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

@media (max-width: 1420px) {}
</style>
