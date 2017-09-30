<template>
    <el-row>
        <el-col :span="5">
            <h2 class="model-title">菜单管理</h2>
            <div class="btn-box">
                <el-button type="text" @click="addMenu($event)">
                    <i class="iconfont">&#xe763;</i>
                    <span>添加</span>
                </el-button>
                <el-button type="text" @click="delMenu($event)">
                    <i class="iconfont">&#xe76c;</i>
                    <span>删除</span>
                </el-button>
            </div>
            <div class="show-menu-box">
                <div class="edit-menu-box">
                    <div class="menu-box-root">
                        <i class="iconfont font-icon root-icon" @click="rootBoxClick($event)">&#xe76b;</i>
                        <span class="root-txt" @click="rootSelect($event)">{{ this.rootDom.name }}</span>
                        <input type="hidden" v-bind:data-level="1" :data-icon="rootDom.menuicon" v-bind:data-parentid="rootDom.id + '-' + rootDom.name" v-bind:data-info="rootDom.id + '-' + rootDom.name">
                    </div>
                    <ul class="menu-items">
                        <li class="menu-item" v-for="(item, index) in menuDatas" :key="item.id">
                            <!-- <i class="iconfont font-icon menu-item-icon" v-if="item.isHasSub" @click="subItemsClick($event)">&#xe76b;</i> -->
                            <i class="iconfont font-icon menu-item-icon"  @click="subItemsClick($event)">&#xe76b;</i>
                            <span class="sub-txt" @click="showEditBox('item', $event)" >{{ item.name }}</span>
                            <input type="hidden" :data-icon="item.menuicon" v-bind:data-level="2" v-bind:data-parentid="item.parentid + '-' + item.parentname" v-bind:data-info="item.id + '-' + item.name + '-' + item.menusort + '-' + item.url + '-' + item.menudesc">
                            <ul class="sub-menu-box" v-if="item.isHasSub" v-bind:data-parent="item.id + '-' + item.name">
                                <li class="sub-menu-item"  v-for="(subItem, index) in item.subItems" :key="subItem.id"  v-bind:data-id="subItem.id" @click="showEditBox('subItem', $event)">
                                    <i class="iconfont font-icon sub-menu-icon">&#xe781;</i>
                                    <span class="sub-item-txt">{{ subItem.name }}</span>
                                    <input type="hidden" :data-icon="subItem.menuicon" v-bind:data-level="3" v-bind:data-parentid="subItem.parentid + '-' + subItem.parentname" v-bind:data-info="subItem.id + '-' + subItem.name + '-' + subItem.menusort + '-' + subItem.url + '-' + subItem.menudesc">
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </el-col>
        <el-col :span="8" v-if="this.isShowEdit">
            <h2 class="model-title">编辑菜单</h2>
            <div class="form-box">
                <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="menu-edit-form">
                    <el-form-item label="菜单名称">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="父节点名称">
                        <el-input v-model="ruleForm.parentName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单路径">
                        <el-input v-model="ruleForm.path"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单排序">
                        <el-input v-model="ruleForm.sore"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单图标"  v-show="isShowIcon">
                        <el-input v-model="ruleForm.menuicon"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单描述">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                </el-form>
                <div class="form-btn-box">
                    <el-button type="primary" @click="saveMenu($event)" class="save-btn" v-bind:data-type="saveType">
                        <i class="iconfont">&#xe79f;</i>
                        保存
                    </el-button>
                    <el-button type="primary" @click="hideEditBox">
                        <i class="iconfont">&#xe767;</i>
                        取消
                    </el-button>
                </div>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import _j from 'jquery';
import { mapGetters } from 'vuex'
import store from './../store/index'
function fetchEditMenu(store) {
    return store.dispatch('FETCH_EDIT_MENU');
}
function fetchUpdateMenu(store, opts){
    return store.dispatch('UPDATE_MENU', opts);
}
function fetchAddMenu(store, opts){
    return store.dispatch('ADD_MENU', opts);
}
function fetchDelMenu(store, opts){
    return store.dispatch('DELETE_MENU', opts);
};
export default {
    store,
    data() {
        return {
            ruleForm: {
                name: '',
                parentName: '',
                path: '',
                sore: '',
                desc: '',
                parentName: '',
                menuStart: 1,
                token:'',
                id:'',
                parentId: '',
                menuicon: ''
            },
            saveType: 'edit',
            isShowIcon: true,
            menuDatas: {},
            rootDom: {},
            isShowEdit: false,
            token: localStorage.token
        }
    },
    computed: mapGetters({
        menuData: 'menuData'
    }),
    beforeMount() {
        fetchEditMenu(this.$store).then(() => {
            var tempData = {};
             tempData = this.$store.getters.getEditMenu;
             if (tempData.resultCode === '1') {
                 this.rootDom = tempData.resultObj[0];
                 this.menuDatas = this.rootDom.subItems;
             }

        })
    },
    methods: {
        // 隐藏编辑信息
        hideEditBox() {
            this.isShowEdit = false;
            this.ruleForm.name = '';
            this.ruleForm.parentName = '';
            this.ruleForm.path = '';
            this.ruleForm.sore = '';
            this.ruleForm.desc = '';
        },
        // 显示编辑
        showEditBox(level, e) {
            let _that = _j(e.currentTarget);
            _j('.menu-item').children('.sub-txt').removeClass('menu-active');
            _j('.sub-menu-item').removeClass('menu-active');
            _j('.root-txt').removeClass('menu-active');
            _that.addClass('menu-active');
            
            let infoDom = _that.children('input');
            if (level === 'item') {
                infoDom = _that.siblings('input');
            }
            let idAndName = infoDom.attr('data-info'),
            parentInfo = infoDom.attr('data-parentid'),
            numLevel = infoDom.attr('data-level'),
            tempArr = idAndName.split('-'),
            tempParentArr = parentInfo.split('-'),
            icon = infoDom.attr('data-icon'),
            id = tempArr[0],  // 菜单ID
            name=tempArr[1],  // 菜单名字
            parentId = tempParentArr[0], // 父元素ID
            menusort = tempArr[2],  // 菜单排序
            menuurl = tempArr[3],   // 菜单URL
            menudesc = tempArr[4],  // 菜单说明
            parentName = tempParentArr[1];  // 父元素名字
            if (numLevel === '3' || numLevel === '1') {
                this.isShowIcon = false;
            } else {
                this.isShowIcon = true;
            }
            this.ruleForm.name = name;
            this.ruleForm.parentName = parentName;
            this.ruleForm.path = menuurl;
            this.ruleForm.sore = menusort;
            this.ruleForm.menuicon = icon;
            this.ruleForm.parentId = parentId;
            this.ruleForm.id = id;
            this.ruleForm.desc = (!menudesc || menudesc == 'null') ? '' : menudesc;
            this.saveType = 'edit';
            this.isShowEdit = true;

        },
        rootSelect(e) {
            let dom = _j(e.currentTarget);
            _j('.menu-item').children('.sub-txt').removeClass('menu-active');
            _j('.sub-menu-item').removeClass('menu-active');
            dom.addClass('menu-active');
        },
        // 添加菜单
        addMenu(e) {
           let activeDom = _j('.edit-menu-box').find('.menu-active');
           if (activeDom.length <=0) {
            this._showMessage('error', '请选择要添加的父节点！');
            return;
           }
           let infoDom = activeDom.children('input');
           if (infoDom.length <= 0) {
                infoDom = activeDom.siblings('input');
           }
           let idAndName = infoDom.attr('data-info'),
            parentInfo = infoDom.attr('data-parentid'),
            icon = infoDom.attr('data-icon'),
            level = infoDom.attr('data-level'),
            tempArr = idAndName.split('-'),
            tempParentArr = parentInfo.split('-'),
            id = tempArr[0],  // 菜单ID
            name = tempArr[1],  // 菜单名字
            parentId = tempParentArr[0], // 父元素ID
            menusort = tempArr[2],  // 菜单排序
            menuurl = tempArr[3],   // 菜单URL
            menudesc = tempArr[4],  // 菜单说明
            parentName = tempParentArr[1],  // 父元素名字
            isHasSub = true;
            this.ruleForm.parentName = parentName;
            this.ruleForm.parentId = parentId;
            if (level === '2') {
                this.ruleForm.parentName = name;
                this.ruleForm.parentId = id;
            }
            this.ruleForm.menuicon = icon;
            this.ruleForm.name = '';
            this.ruleForm.path = '';
            this.ruleForm.sore = '';
            this.ruleForm.desc  = '';
            this.saveType = 'add';
            if (!this.isShowEdit){
                this.isShowEdit = true;
            }
        },
        delMenu(e) {
            // 如果选中要删除的节点必须判断下面是否还有子节点
            /*if (this.ruleForm.parentId === '0' || !this.ruleForm.parentId) {
                this._showMessage('error', '此菜单不允删除！')
                return;
            }*/
            let isHasSubItem = _j('.menu-active').siblings('ul');
            console.log(isHasSubItem);
            if (isHasSubItem.length > 0) {
                this._showMessage('error', '该菜单下面还有子项！')
                return;
            }
            this.ruleForm.token = this.token;
            fetchDelMenu(this.$store, this.ruleForm).then(() => {
                var delMenuDatas = this.$store.getters.delAddMenuDatas;
                if (delMenuDatas.resultCode === '1') {
                    this._showMessage('success', '删除菜单成功！');
                } else {
                    this._showMessage('error', delMenuDatas.resultMsg);
                }
            });
        },
        // 显示或者隐藏子菜单
        rootBoxClick(e) {
            var targetDom = _j(e.currentTarget);
            var menuBoxDom = _j('.edit-menu-box');
            if (targetDom.hasClass('nc-hide')) {
                targetDom.removeClass('nc-hide');
                targetDom.html('&#xe76b;');
                 menuBoxDom.animate({
                    'height': '600px'
                }, 300, function () {
                    menuBoxDom.css({
                        height: 'auto'
                    });
                }); 
                return;
            }
            targetDom.addClass('nc-hide');
            targetDom.html('&#xe762;');
             menuBoxDom.animate({
                'height': '30px'
            }, 300, function() {
                 menuBoxDom.css({
                    'overflow': 'hidden'
                }); 
            }); 

        },
        // 显示或者隐藏子菜单
        subItemsClick(e) {
            var iconDom = _j(e.currentTarget);
            var subMenuBoxDom = iconDom.siblings('.sub-menu-box');
            if (iconDom.hasClass('nc-hide')) {
                subMenuBoxDom.slideDown(200);
                iconDom.html('&#xe76b;');
                iconDom.removeClass('nc-hide');
                return;
            }
            iconDom.addClass('nc-hide');
            iconDom.html('&#xe762;');
            subMenuBoxDom.slideUp(200);
        },
        saveMenu(e) {
            const _that = _j(e.currentTarget);
            let type = _that.attr('data-type');
            this.ruleForm.token = this.token;
            if (type === 'add') {
                // 添加菜单
                fetchAddMenu(this.$store, this.ruleForm).then(() => {
                    let addMenuDatas = this.$store.getters.getAddMenuDatas;
                    if (addMenuDatas.resultCode === '1') {
                        this._showMessage('success', '添加菜单成功！');
                    } else {
                        this._showMessage('error', updateMenuDatas.resultMsg);
                    }
                })
            } else {
                // 编辑菜单
                fetchUpdateMenu(this.$store, this.ruleForm).then(() => {
                    let updateMenuDatas = this.$store.getters.getUpdateMenuDatas;
                    
                    if (updateMenuDatas.resultCode === '1') {
                        this._showMessage('success', '更新成功！');
                    } else {
                        this._showMessage('error', updateMenuDatas.resultMsg);
                    }
                });
            }
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
.model-title {
    width: 97%;
    text-align: left;
    font-size: 16px;
    font-weight: 400;
    margin-left: 20px;
    margin-top: 20px;
}

.edit-menu-box {
    height: auto;
}

.btn-box {
    width: 97%;
    text-align: left;
    margin-left: 20px;
}

.show-menu-box {
    width: 300px;
    height: 600px;
    max-height: 600px;
    overflow-y: auto;
    margin-left: 20px;
    border: 1px solid #ccc;
    .menu-box-root {
        width: 95%;
        margin: 0px auto;
        text-align: left;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
    }
    .font-icon {
        cursor: pointer;
    }
    .menu-item {
        width: 90%;
        margin-left: 20px;
        text-align: left;
        cursor: pointer;
    }
    .sub-txt:hover {
        color: #ccc;
    }
    .sub-menu-box {
        width: 90%;
        margin-left: 20px;
        text-align: left;
    }
    .sub-menu-item:hover {
        color: #ccc;
    }
}
.menu-active{
    color: #20a0ff;
}
.hide-menu-box {
    height: 30px;
    overflow: hidden;
}

.form-box {
    margin-top: 36px;
}
</style>