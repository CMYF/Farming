<template>
    <el-row>
        <el-col :span="20" :offset="3" class="pro-content">
            <el-row class="chart-header-box">
                <el-col :span="6" class="title-box">
                    <h1>预估产量</h1>
                </el-col>
                <el-col :span="16" class="mack-box">
                    <div class="date-box">
                        <el-date-picker v-model="value1" type="date" placeholder="选择开始日期" :picker-options="pickerOptions0"></el-date-picker>
                        -
                        <el-date-picker v-model="value2" type="date" placeholder="选择结束日期" :picker-options="pickerOptions0"> </el-date-picker>
                        <div class="day-box">
                            <span class="day-item day-item-day">日</span>
                            <span class="day-item day-item-thrday day-item-active">三天</span>
                            <span class="day-item day-item-week">周</span>
                        </div>
                    </div>

                </el-col>
                <div class="vf-type-box">
                    <div class="type-ex">选择产品：</div>
                    <div class="type-item-box">
                        <!--<el-checkbox-group v-model="chnageTypes" @change="typeChange">-->
                        <el-checkbox v-for="(item, index) in vfTypes" :key="index" text-color="#02bdad" :label="item.label" :true-label="item.id">{{ item.label }}</el-checkbox>
                        <!--   </el-checkbox-group>-->
                    </div>
                    <div class="show-all-box">
                        <span class="show-all-txt">展开选项</span>
                        <span class="iconfont show-icon ">&#xe7cc;</span>
                    </div>
                </div>
                <div class="ctx-box">
                    <canvas id="myCanvas" width="1202" height="300"></canvas>
                </div>
            </el-row>

        </el-col>
        <el-col :span="20" :offset="3" class="task-table-box">
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
        <el-col :span="20" :offset="3" class="task-table-box">
            <el-row>
                <div class="title-box product-title-box">
                    <h1>批次进度表</h1>
                </div>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
import _j from 'jquery'
import Chart from 'chart.js'
import SameDay from './../components/SameDay'
import TomorrowTask from './../components/TomorrowTask'
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
            value1: '',
            value2: '',
            activeName2: 'now',
            vfTypes: [
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
                {
                    label: '番茄',
                    id: 1
                },
                {
                    label: '山菊',
                    id: 2
                },
                {
                    label: '黄瓜',
                    id: 3
                },
            ],
            chnageTypes: [1, 2]
        }
    },
    mounted() {
        //  window.setTimeout(function() {
        let ctx = _j('#myCanvas');
        console.log(ctx);
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
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
                },
                {
                    //label: '# of aaa',
                    data: [2, 22, 8, 5, 36, 12],
                    /* backgroundColor: [
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
                     ],*/
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        });
        //    }, 1000)
    },
    methods: {
        typeChange() {
            console.log(this.chnageTypes);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
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
    height: 62px;

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
            width: 215px;
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
    }
    .vf-type-box {
        width: 1506px;
        clear: both;
        padding-left: 20px;
        height: 30px;
        border: 1px solid #ccc;

        .type-ex {
            width: 100px;
            float: left;
            line-height: 30px;
        }
        .type-item-box {
            float: left;
            width: 800px;
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
                transform: rotate(-270deg);
                -webkit-transform: rotate(-270deg);
                -moz-transform: rotate(-270deg);
                -ms-transform: rotate(-270deg);
                -o-transform: rotate(-270deg);
            }
        }
    }
}

.ctx-box {
    height: auto;
    overflow: hidden;
    width: 100%;
}

.task-table-box {
    background-color: #fff;
    margin-top: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    .el-tabs__header {
        padding-left: 20px;
    }
}
</style>
