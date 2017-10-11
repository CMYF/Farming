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
                <li class="posi-item" v-for="(root, index) in this.posiDatas" :key="index" v-bind:data-info="root.id + '|' + root.name + '|1' ">
                    <div class="le-ri-box">
                        <div class="left-box">
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
                    <ul class="sub-items-box belong-box hide" v-if="root.isHasSub">
                        <li class="posi-item" v-for="(levTwo, idx) in root.subItems" :key="idx" v-bind:data-info="levTwo.id + '|' + levTwo.name + '|2'">
                            <div class="le-ri-box">
                                <div class="left-box">
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
                            <ul class="sub-sub-items-box belong-box hide" v-if="levTwo.isHasSub">
                                <li class="posi-item" v-for="(levThree, i) in levTwo.subItems" :key="i" v-bind:data-info="levThree.id + '|' + levThree.name + '|3'">
                                    <div class="le-ri-box">
                                        <div class="left-box">
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
                                    <ul class="sub-end-items-box belong-box hide" v-if="levThree.isHasSub">
                                        <li class="posi-item" v-for="(levFour, i) in levThree.subItems" :key="i" v-bind:data-info="levFour.id + '|' + levFour.name + '|4'">
                                            <div class="le-ri-box">
                                                <div class="left-box">
                                                    <!-- <span class="iconfont">&#xe7cc;</span> -->
                                                    <span class="item-txt">{{ levFour.name }}</span>
                                                </div>
                                                <div class="right-box">
                                                    <el-button class="add-btn c-res-btn">
                                                        <!-- <span class="iconfont">&#xe622;</span> 新增 -->
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
        <el-dialog class="edit-dialog-box" title="新增分类" :visible.sync="isShowEditDailog">
            <el-form :model="editForm" :inline="true" class="form-box">
                <el-form-item label="分类名称" class="edit-form-item" :label-width="'80px'">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer foot-btn-box">
                <el-button class="save-btn" @click="isShowEditDailog = false">确 定</el-button>
                <el-button class="cancle-btn" @click="isShowEditDailog = false">取 消</el-button>
            </div>
        </el-dialog>
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
            ],
            isShowEditDailog: false,
            editForm: {
                name: ''
            }
        }
    },
    mounted() {
        console.log(_j('.posi-item'))
        let self = this;
        _j('.posi-item').unbind('click').on('click', function(e) {
            e.stopPropagation();
            let dom = _j(this);
            let iconDom = dom.children('.le-ri-box').children('.left-box').children('.arrow-icon');
            let domTxtDom = dom.children('.le-ri-box').children('.left-box').children('.item-txt');
            let tempData = dom.attr('data-info');
            /*  infos = tempData.split('|'),
             id = infos[0], // 节点ID
             name = infos[1], // 节点名称
             level = infos[2]; // 节点层级 */
            if (dom.hasClass('is-open')) {
                dom.children('.belong-box').slideUp(300);
                dom.removeClass('is-open');
                domTxtDom.removeClass('is-active');
                iconDom.removeClass('arrow-icon-open');
                return;
            }
            dom.removeClass('hide');
            dom.addClass('is-open');
            domTxtDom.addClass('is-active');
            iconDom.addClass('arrow-icon-open');
            dom.children('.belong-box').slideDown(300);
        });
        // 3.新增和修改的弹层
        _j('.c-res-btn').unbind('click').on('click', function(e) {
            e.stopPropagation();
            let dom = _j(this);
            console.log(dom);
            self.isShowEditDailog = true;
        });
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
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transition: all .3s;
}

.arrow-icon-open {
    transform: rotate(90deg);
    display: inline-block;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
}

.is-active {
    color: #02bdad;
}

.posi-items-box {
    width: 100%;
    .items-box {
        width: 100%;
    }
    .posi-item {
        height: auto;
        overflow: hidden;
        cursor: pointer;
        .le-ri-box {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ccc;
        }
    }
    .left-box {
        width: 200px;
        float: left;
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
        width: 80px;
        background-color: #fff;
    }
}

.edit-dialog-box {
    .el-dialog--small {
        width: 500px;
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
    .el-dialog__body{
        padding-bottom: 0px;
    }
    .el-input, .el-input__inner{
        width: 250px;
    }
    .edit-form-item{
        width: 100%;
        text-align: left;
    }
    .foot-btn-box{
        text-align: center;
        .el-button{
            width: 160px;
            border: none;
        }
        .save-btn{
            background-color: #02bdad;
            color: #fff;
        }
        .cancle-btn{
            background-color: #bbbbbb;
            color: #fff;
        }
    }
}
</style>
