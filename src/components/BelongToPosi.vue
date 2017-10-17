<template>
    <el-row class="posi-box">
        <div class="posi-title">
            <span class="title-txt"> 归属地</span>
            <div class="btn-box">
                <el-button class="add-btn c-res-btn">
                    <span class="iconfont">&#xe622;</span>
                    新增
                </el-button>
                <el-button class="modify-btn c-res-btn">
                    <span class="iconfont">&#xe781;</span>
                    修改
                </el-button>
            </div>
        </div>
        <div class="posi-items-box">
            <ul class="items-box">
                <li class="posi-item" v-for="(root, index) in this.posiDatas" :key="index">
                    <div class="le-ri-box">
                        <div class="left-box" v-bind:data-info="root.id + ':' + root.name">
                            <span class="iconfont arrow-icon">&#xe7cc;</span>
                            <span class="item-txt">{{ root.name }}</span>
                        </div>
                        <div class="right-box">
                            <el-button class="add-btn c-res-btn">
                                <span class="iconfont">&#xe622;</span> 新增
                            </el-button>
                            <el-button class="modify-btn c-res-btn">
                                <span class="iconfont">&#xe781;</span> 修改
                            </el-button>
                            <el-button class="del-btn c-res-btn">
                                <span class="iconfont">&#xe767;</span> 删除
                            </el-button>
                        </div>
                    </div>
                    <ul class="sub-items-box" v-if="root.isHasSub">
                        <li class="posi-item" v-for="(levTwo, idx) in root.subItems" :key="idx">
                            <div class="le-ri-box">
                                <div class="left-box" v-bind:data-info="levTwo.id + ':' + levTwo.name">
                                    <span class="iconfont arrow-icon">&#xe7cc;</span>
                                    <span class="item-txt">{{ levTwo.name }}</span>
                                </div>
                                <div class="right-box">
                                    <el-button class="add-btn c-res-btn">
                                        <span class="iconfont">&#xe622;</span> 新增
                                    </el-button>
                                    <el-button class="modify-btn c-res-btn">
                                        <span class="iconfont">&#xe781;</span> 修改
                                    </el-button>
                                    <el-button class="del-btn c-res-btn">
                                        <span class="iconfont">&#xe767;</span> 删除
                                    </el-button>
                                </div>
                            </div>
                            <ul class="sub-sub-items-box" v-if="levTwo.isHasSub">
                                <li class="posi-item" v-for="(levThree, i) in levTwo.subItems" :key="i">
                                    <div class="le-ri-box">
                                        <div class="left-box"  v-bind:data-info="levThree.id + ':' + levThree.name">
                                            <span class="iconfont arrow-icon">&#xe7cc;</span>
                                            <span class="item-txt">{{ levThree.name }}</span>
                                        </div>
                                        <div class="right-box">
                                            <el-button class="add-btn c-res-btn">
                                                <span class="iconfont">&#xe622;</span> 新增
                                            </el-button>
                                            <el-button class="modify-btn c-res-btn">
                                                <span class="iconfont">&#xe781;</span> 修改
                                            </el-button>
                                            <el-button class="del-btn c-res-btn">
                                                <span class="iconfont">&#xe767;</span> 删除
                                            </el-button>
                                        </div>
                                    </div>
                                    <ul class="sub-end-items-box" v-if="levThree.isHasSub">
                                        <li class="posi-item" v-for="(levFour, i) in levThree.subItems" :key="i">
                                            <div class="le-ri-box">
                                                <div class="left-box"  v-bind:data-info="levFour.id + ':' + levFour.name">
                                                    <!-- <span class="iconfont">&#xe7cc;</span> -->
                                                    <span class="item-txt">{{ levFour.name }}</span>
                                                </div>
                                                <div class="right-box">
                                                    <el-button class="add-btn c-res-btn">
                                                        <span class="iconfont">&#xe622;</span> 新增
                                                    </el-button>
                                                    <el-button class="modify-btn c-res-btn">
                                                        <span class="iconfont">&#xe781;</span> 修改
                                                    </el-button>
                                                    <el-button class="del-btn c-res-btn">
                                                        <span class="iconfont">&#xe767;</span> 删除
                                                    </el-button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </el-row>
</template>
<script>
import _j from 'jquery'
export default {
    data() {
        return {
            posiDatas: [
                {
                    id: 1,
                    name: '梦工厂一号',
                    isHasSub: true,
                    subItems: [
                        {
                            id: 2,
                            name: '一号三栏',
                            isHasSub: true,
                            subItems: [
                                {
                                    id: 3,
                                    name: '三栏四号',
                                    isHasSub: true,
                                    subItems: [
                                        {
                                            id: 4,
                                            name: '四号二格'
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '三栏四号',
                                    isHasSub: true,
                                    subItems: [
                                        {
                                            id: 4,
                                            name: '四号二格'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: '一号三栏',
                            isHasSub: true,
                            subItems: [
                                {
                                    id: 3,
                                    name: '三栏四号',
                                    isHasSub: true,
                                    subItems: [
                                        {
                                            id: 4,
                                            name: '四号二格'
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    name: '三栏四号',
                                    isHasSub: true,
                                    subItems: [
                                        {
                                            id: 4,
                                            name: '四号二格'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    mounted() {
        console.log(_j('.posi-item'))
        console.log(this.$t);
    },
}
</script>
<style lang="scss">
.posi-title {
    width: 100%;
    padding-left: 15px;
    line-height: 40px;
    height: 40px;
    text-align: left;
    background-color: #f0f3fa;
    .title-txt {
        display: block;
        width: 80px;
        float: left;
    }
    .btn-box {
        width: 300px;
        float: right;
        text-align: left;
    }
}

.c-res-btn {
    border: none;
    background-color: #f0f3fa;
    font-size: 15px;
    color: #999;
}

.arrow-icon {
    transform: rotate(-90deg);
    display: inline-block;
    -webkit-transform: rotate(-90deg)
}

.posi-items-box {
    width: 100%;
    .items-box {
        width: 100%;
    }
    .posi-item {
        height: auto;
        overflow: hidden;

        .le-ri-box {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ccc;
        }
    }
    .left-box {
        width: 200px;
        float: left;
        cursor: pointer;
        text-align: left;
    }
    .right-box {
        width: 300px;
        float: right;
    }
    .sub-items-box,
    .sub-sub-items-box,
    .sub-end-items-box {
        clear: both;
        width: 98%;
        margin-left: 2%;
    }
    .c-res-btn {
        background-color: #fff;
    }
}
</style>
