<template>
    <el-row class="posi-box">
        <div class="posi-title">
            <span class="title-txt"> 归属地</span>
            <div class="btn-box posi-item" :data-info="'0|归属地|0'">
                <el-button class="add-btn c-res-btn" :data-type="'add'">
                    <span class="iconfont">&#xe622;</span>
                    新增
                </el-button>
                <el-button class="modify-btn c-res-btn" :data-type="'modify'">
                    <span class="iconfont">&#xe781;</span>
                    修改
                </el-button>
            </div>
        </div>
        <div class="posi-items-box">
            <ul class="items-box">
                <li class="posi-item" v-for="(root, index) in this.posiDatas" :key="index" v-bind:data-info="root.id + '|' + root.names + '|'+ root.level +'|' + root.parentid ">
                    <div class="le-ri-box">
                        <div class="left-box">
                            <span class="iconfont belong-arrow-icon" v-show="root.isSub">&#xe7cc;</span>
                            <span class="item-txt">{{ root.names }}</span>
                        </div>
                        <div class="right-box">
                            <el-button class="add-btn c-res-btn" :data-type="'add'">
                                <span class="iconfont">&#xe622;</span> 新增
                            </el-button>
                            <el-button class="modify-btn c-res-btn" :data-type="'modify'">
                                <span class="iconfont">&#xe781;</span> 修改
                            </el-button>
                            <el-button class="del-btn c-res-btn" :data-type="'del'">
                                <span class="iconfont">&#xe767;</span> 删除
                            </el-button>
                        </div>
                    </div>
                    <ul class="sub-items-box belong-box hide" v-if="root.isSub">
                        <li class="posi-item" v-for="(levTwo, idx) in root.subItem" :key="idx" v-bind:data-info="levTwo.id + '|' + levTwo.names + '|'+ levTwo.level +'|' + levTwo.parentid">
                            <div class="le-ri-box">
                                <div class="left-box">
                                    <span class="iconfont belong-arrow-icon" v-show="levTwo.isSub">&#xe7cc;</span>
                                    <span class="item-txt">{{ levTwo.names }}</span>
                                </div>
                                <div class="right-box">
                                    <el-button class="add-btn c-res-btn" :data-type="'add'">
                                        <span class="iconfont">&#xe622;</span> 新增
                                    </el-button>
                                    <el-button class="modify-btn c-res-btn" :data-type="'modify'">
                                        <span class="iconfont">&#xe781;</span> 修改
                                    </el-button>
                                    <el-button class="del-btn c-res-btn" :data-type="'del'">
                                        <span class="iconfont">&#xe767;</span> 删除
                                    </el-button>
                                </div>
                            </div>
                            <ul class="sub-sub-items-box belong-box hide" v-if="levTwo.isSub">
                                <li class="posi-item" v-for="(levThree, i) in levTwo.subItem" :key="i" v-bind:data-info="levThree.id + '|' + levThree.names + '|' + levThree.level +'|' + levThree.parentid">
                                    <div class="le-ri-box">
                                        <div class="left-box">
                                            <span class="iconfont belong-arrow-icon" v-show="levThree.isSub">&#xe7cc;</span>
                                            <span class="item-txt">{{ levThree.names }}</span>
                                        </div>
                                        <div class="right-box">
                                            <el-button class="add-btn c-res-btn" :data-type="'add'">
                                                <span class="iconfont">&#xe622;</span> 新增
                                            </el-button>
                                            <el-button class="modify-btn c-res-btn" :data-type="'modify'">
                                                <span class="iconfont">&#xe781;</span> 修改
                                            </el-button>
                                            <el-button class="del-btn c-res-btn" :data-type="'del'">
                                                <span class="iconfont">&#xe767;</span> 删除
                                            </el-button>
                                        </div>
                                    </div>
                                    <ul class="sub-end-items-box belong-box hide" v-if="levThree.isSub">
                                        <li class="posi-item" v-for="(levFour, i) in levThree.subItem" :key="i" v-bind:data-info="levFour.id + '|' + levFour.names + '|'+ levFour.level +'|' + levFour.parentid">
                                            <div class="le-ri-box">
                                                <div class="left-box">
                                                    <!-- <span class="iconfont">&#xe7cc;</span> -->
                                                    <span class="item-txt">{{ levFour.names }}</span>
                                                </div>
                                                <div class="right-box">
                                                    <el-button class="add-btn c-res-btn" :data-type="'add'">
                                                        <!--<span class="iconfont">&#xe622;</span> 新增-->
                                                    </el-button>
                                                    <el-button class="modify-btn c-res-btn" :data-type="'modify'">
                                                        <span class="iconfont">&#xe781;</span> 修改
                                                    </el-button>
                                                    <el-button class="del-btn c-res-btn" :data-type="'del'">
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
                    <span class="mar-box"></span>
                </li>
            </ul>
        </div>
        <el-dialog class="edit-dialog-box" title="归属地操作" :visible.sync="isShowEditDailog">
            <el-form :model="editForm" :inline="true" class="form-box">
                <el-form-item label="分类名称" class="edit-form-item" :label-width="'80px'">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer foot-btn-box">
                <el-button class="save-btn" @click="saveKuaidial()" v-bind:data-type="'add'">确 定</el-button>
                <el-button class="cancle-btn" @click="isShowEditDailog = false">取 消</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
import _j from 'jquery'
import { mapGetters } from 'vuex'
import store from './../store/index'
function fetchKuaidials(store, opts) {
    return store.dispatch('GET_KUAIDIALS', {
        token: localStorage.token
    });
}
function fetchAddKuaidial(store, opts) {
    return store.dispatch('ADD_KUAIDIAL', opts);
}
function fetchDeleteKuaidial(store, opts) {
    return store.dispatch('DEL_KUAIDIAL', opts);
};
export default {
    store,
    data() {
        return {
            posiDatas: [
                /*{
                    id: 1,
                    names: '梦工厂一号',
                    isSub: true,
                    subItem: [
                        {
                            id: 2,
                            names: '一号三栏',
                            isSub: true,
                            subItem: [
                                {
                                    id: 3,
                                    names: '三栏四号',
                                    isHasSub: true,
                                    subItem: [
                                        {
                                            id: 4,
                                            names: '四号二格'
                                        }
                                    ]
                                },
                                {
                                    id: 3,
                                    names: '三栏四号',
                                    isSub: true,
                                    subItem: [
                                        {
                                            id: 4,
                                            names: '四号二格'
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
                }*/
            ],
            isShowEditDailog: false,
            editForm: {
                name: '',
                parentId: '',
                id: '',
                token: localStorage.token
            },
            pupTitle: '',
            pupLable: '',
        }
    },
    beforeMount() {
        fetchKuaidials(this.$store).then(() => {
            let tempData = this.$store.getters.getKuaidialInfos;
            if (tempData.resultCode === '1') {
                let dataObj = tempData.resultObj;
                this.posiDatas = dataObj;
            }
        })

    },
    mounted() {
        let self = this;
        window.setTimeout(function() {
            self.bindPosiEvent();
        }, 1000);
    },
    created() {

    },
    methods: {
        bindPosiEvent: function() {
            let self = this;
            _j('.posi-item').unbind('click').on('click', function(e) {
                e.stopPropagation();
                let dom = _j(this);
                let iconDom = dom.children('.le-ri-box').children('.left-box').children('.belong-arrow-icon');
                let domTxtDom = dom.children('.le-ri-box').children('.left-box').children('.item-txt');
                let tempData = dom.attr('data-info');
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
                let info = dom.parents('.posi-item').attr('data-info');
                let evType = dom.attr('data-type');
                let infoArr = info.split('|');
                let id = infoArr[0]; // id
                let name = infoArr[1]; //名称
                let level = infoArr[2]; // 级别
                let parentId = infoArr[3]; // 父元素id
                self.editForm.id = id;
                self.editForm.name = name;
                self.editForm.parentId = id;
                if (evType === 'del') {
                    self.delKuaidialFetch();
                    return;
                }
                if (evType === 'add') {
                    self.editForm.name = '';
                    self.editForm.id = '';
                }
                if (evType === 'modify') {
                    self.editForm.parentId = parentId;
                    self.editForm.name = name;
                }
                self.isShowEditDailog = true;
            });
        },
        delKuaidialFetch() {
            fetchDeleteKuaidial(this.$store, this.editForm).then(() => {
                let tempData = this.$store.getters.delKuaidial;
                if (tempData.resultCode) {
                    this._showMessage('success', '删除成功！');
                } else {
                    this._showMessage('error', tempData.resultMsg);
                }
            });
        },
        addOrModifyKuaiFetch() {
            fetchAddKuaidial(this.$store, this.editForm).then(() => {
                let tempData = this.$store.getters.addKuaidial;
                if (tempData.resultCode === '1') {
                    this._showMessage('success', '操作成功！');
                } else {
                    this._showMessage('error', tempData.resultMsg);
                }
            });
        },
        saveKuaidial(type) {
            if (!this.editForm.name) {
                this._showMessage('error', '请输入归属地名称！');
                return false;
            }
            this.addOrModifyKuaiFetch();
            this.isShowEditDailog = false;
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

.belong-arrow-icon {
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
        width: 400px;
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
    .el-dialog__body {
        padding-bottom: 0px;
    }
    .el-input,
    .el-input__inner {
        width: 250px;
    }
    .edit-form-item {
        width: 100%;
        text-align: left;
    }
    .foot-btn-box {
        text-align: center;
        .el-button {
            width: 160px;
            border: none;
        }
        .save-btn {
            background-color: #02bdad;
            color: #fff;
        }
        .cancle-btn {
            background-color: #bbbbbb;
            color: #fff;
        }
    }
}
.mar-box{
    display: block;
    height: 10px;
    margin-top: 10px;
    background-color: #f0f3fa;
    width: 100%;
}
</style>
