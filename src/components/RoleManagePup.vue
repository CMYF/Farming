<template>
  <el-dialog title="角色信息" :visible.sync="isShowDialog" >
    <el-form :model="role" :rules="rules" ref="role">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="role.name" :disabled="this.isDisabled" placeholder="请输入角色名称" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色状态" :label-width="formLabelWidth" prop="region">
        <el-select v-model="role.region" placeholder="请选择" :disabled="this.isDisabled">
          <el-option label="有效" value="1"></el-option>
          <el-option label="无效" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述" :label-width="formLabelWidth" prop="desc">
        <el-input type="textarea" placeholder="请输入角色描述" :disabled="this.isDisabled" v-model="role.desc"></el-input>
      </el-form-item>
      <div class="el-form-item select-box ">
        <label class="el-form-item__label" style="width: 100px;"> 菜单功能授权 </label>
        <div class="el-form-item__content select-menu-box" style="margin-left: 100px">
          <div class="el-input" @click="showRoles($event)">
            <!-- <input type="text" disabled="true" autocomplete="off" v-model="role.roles" placeholder="请选择功能" style="cursor:pointer;" rows="2" validateevent="true" class="el-input__inner"> -->
            <el-input  :disabled="true" v-model="role.roles" placeholder="请选择功能" ></el-input>
            <i class="iconfont arrow-icon">&#xe792;</i>
          </div>
          <div class="select-bar hide" v-for="(item, index) in this.rolesData" :key="item.id">
            <i class="iconfont hs-icon" @click="isShowItemRoles($event)">&#xe620;</i>
            <label  class="el-checkbox root-el-checkbox" v-bind:class="[ item.isActive ? 'checked' : '' ]" v-bind:data-id="item.id" v-bind:data-txt="item.name" @click.prevent="changeAll($event)">
              <span class="el-checkbox__input root-checkbox" v-bind:class="[ item.isActive ? 'is-checked' : '' ]">
                <span class="el-checkbox__inner"></span>
                <input type="checkbox" class="el-checkbox__original" value="">
              </span>
              <span class="el-checkbox__label">{{ item.name }}</span>
            </label>
            <ul class="options">
              <li class="option-item" v-for="(menu, index) in item.subItems" :key="menu.id">
                <i v-if="menu.isHasSub" class="iconfont hs-icon" @click="hsCheckboxIcon">&#xe622;</i>
                <label v-bind:class="[ menu.isActive ? itemCheckboxClass_checked : itemCheckboxClass ]" v-bind:data-id="menu.id" v-bind:data-txt="menu.name" @click.prevent="itemSelect($event)" >
                  <span class="el-checkbox__input item-checkbox" v-bind:class="menu.isActive? 'is-checked' : ''">
                    <span class="el-checkbox__inner"></span>
                    <input type="checkbox" class="el-checkbox__original" value="">
                  </span>
                  <span class="el-checkbox__label">{{ menu.name }}</span>
                </label>
                <ul class="sub-options hide" v-if="menu.isHasSub" >
                  <li class="sub-opt-item" v-for="(sub, index) in menu.subItems" :key="sub.id">
                    <label v-bind:class="[ sub.isActive ? subMenuCheckboxClass_checked : subMenuCheckboxClass ]" v-bind:data-id="sub.id" v-bind:data-txt="sub.name" @click.prevent="subSelect($event)">
                      <span class="el-checkbox__input span-checkbox" v-bind:class="sub.isActive? 'is-checked' : ''">
                        <span class="el-checkbox__inner"></span>
                        <input type="checkbox" class="el-checkbox__original" value="">
                      </span>
                      <span class="el-checkbox__label">{{ sub.name }}</span>
                    </label>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <el-form-item class="dialog-footer">
        <el-button type="primary" class="submit-btn" v-bind:data-type="this.dialogBtnIsEdit" @click="submitForm('role', $event)"> {{ this.showDialogBtnType }}</el-button>
        <el-button class="cancel-btn" @click="cancelForm('role')">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="saveRole">确 定</el-button>
    </div> -->
  </el-dialog>
</template>
<script>
import bus from './../eventBus'
import { mapGetters } from 'vuex'
import _j from 'jquery'
import store from './../store/index'
function addRoles(store, opts) {
  return store.dispatch('ADD_ROLES', opts);
}
function fetchEditMenu(store) {
    return store.dispatch('FETCH_EDIT_MENU');
}
function fetchRoles(store, token) {
    return store.dispatch('FETCH_GET_NAV', token);
}
function fetchGetRoleById(store, opts) {
  return store.dispatch('GET_ROLE_BY_ID', opts);
}
function fetchUpdateById(store, opts) {
  return store.dispatch('UPDATE_BY_ID', opts);
}
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  store,
  data() {
    return {
      formLabelWidth: '100px',
      isShowDialog: false,
      checkAll: false,
      token: localStorage.token,
      isDisabled: false,
      showDialogBtnType: '保存',
      itemCheckboxClass_checked: 'el-checkbox item-el-checkbox checked',
      itemCheckboxClass: 'el-checkbox item-el-checkbox',
      subMenuCheckboxClass_checked: 'el-checkbox sub-el-checkbox checked',
      subMenuCheckboxClass: 'el-checkbox sub-el-checkbox',
      dialogBtnIsEdit: 'edit-role-info',
      role: {
        name: '',
        region: '',
        desc: '',
        roles: '',
        roleIds: '',
        roleId: '',
        token: localStorage.token
      },
      tempRoles: [],
      rolesData: {},
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择角色状态', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    _j('body').on('click', function (e) {
        let dom = _j(e.target);
        if (dom) {

        }
    });
  },
  mutated() {

  },
  computed: mapGetters({
    getRoleData: 'navData'
  }),
  methods: {
    cancelForm() {
      this.isShowDialog = false;
      _j('.select-bar').slideUp();
    },
    // add role
    submitForm(formName, e) {
      let dom = _j(e.currentTarget);
      if (dom.attr('data-type') === 'edit-role-info') {
        this.showDialogBtnType = '保存';
        this.isDisabled = false;
        this.dialogBtnIsEdit = 'update-role-info';
        return;
      }
      let type = dom.attr('data-type');
      this.$refs[formName].validate((valid) => {
          if (valid) { 
            if (type === 'add-role-info') {
              // add
              addRoles(this.$store, this.role).then(() => {
                let tempRole = this.$store.getters.addRoles;
                if (tempRole.resultCode === '1') {
                  this._showMessage('success', '添加角色成功！');
                  this.isShowDialog = false;
                } else {
                  this._showMessage('error', tempRole.resultMsg);
                }
              });
            } else {
              // edit
              fetchUpdateById(this.$store, this.role).then(()=> {
                let tempData = this.$store.getters.updateData;
                if (tempData.resultCode === '1') {
                  this._showMessage('success', '更新角色成功！');
                  this.isShowDialog = false;
                } else {
                  this._showMessage('error', tempData.resultMsg);
                }
              });
             
            }
          } else {
            console.log('数据不完整');
            return false;
          }
      })
    },
    _showMessage(type, msg) {
      this.$message({
        type: type,
        message: msg,
        showClose: true
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    isShowItemRoles(e){
      let dom = _j(e.currentTarget);
      let optsDom = _j('.options');
      if (dom.hasClass('show')) {
        dom.removeClass('show');
        dom.html('&#xe620;');
      optsDom.slideDown(500);
        return;
      }
      dom.addClass('show');
      dom.html('&#xe622;');
      optsDom.slideUp(500);
    },
    // check all checkbox
    changeAll(e) {
      let dom = _j(e.currentTarget);
      let rootCheckBoxDom = dom.find('.root-checkbox');
      let itemCheckBoxDom = _j('.options').find('.item-el-checkbox')
      let tempItem = '';
      if (dom.hasClass('checked')) {
        dom.removeClass('checked')
        rootCheckBoxDom.removeClass('is-checked');
        for (let i = 0, len = itemCheckBoxDom.length; i < len; i++) {
          tempItem = _j(itemCheckBoxDom[i]);
          if (tempItem.hasClass('checked')) {
            tempItem.click();
          }
        }
        this.getRoleTxtId();
        return;
      }
      dom.addClass('checked');
      rootCheckBoxDom.addClass('is-checked');
      for (let i = 0, len = itemCheckBoxDom.length; i < len; i++) {
        tempItem = _j(itemCheckBoxDom[i]);
        if (!tempItem.hasClass('checked')) {
           tempItem.click();
        }
      }
      this.getRoleTxtId();
    },
    // hide or show sub menus
    hsCheckboxIcon(e) {
      let iconDom = _j(e.target);
      if (iconDom.hasClass('show')) {
        iconDom.html('&#xe622;')
        iconDom.siblings('.sub-options').slideUp();
        iconDom.removeClass('show');
        return;
      }
      iconDom.addClass('show');
      iconDom.html('&#xe620;')
      iconDom.siblings('.sub-options').slideDown();
    },
    // level two checked or unchecked
    itemSelect (e) {
        let dom = _j(e.currentTarget);
        let itemCheckBoxDom = dom.children('.item-checkbox');
        let subCheckboxs = dom.siblings('ul').find('.sub-el-checkbox');
        let allItemCheckBoxs = dom.parent('li').siblings('li').children('label.item-el-checkbox');
        let rootCheckBoxDom = _j('.root-el-checkbox');
        if (itemCheckBoxDom.hasClass('is-checked')) {
          dom.removeClass('checked');
          itemCheckBoxDom.removeClass('is-checked');
          rootCheckBoxDom.removeClass('checked');
          rootCheckBoxDom.children('.root-checkbox').removeClass('is-checked');
          // uncheck sub roles
          let tempSubItem = '';
          for (let i = 0, len = subCheckboxs.length; i < len; i++) {
            tempSubItem = _j(subCheckboxs[i]);
            if (tempSubItem.hasClass('checked')) {
              tempSubItem.removeClass('checked');
              tempSubItem.children('.span-checkbox').removeClass('is-checked');
            }
          }
          this.getRoleTxtId();
          return;
        }
       dom.addClass('checked');
       itemCheckBoxDom.addClass('is-checked');
       // checked sub roles
       let tempSubItem = '';
        for (let i = 0, len = subCheckboxs.length; i < len; i++) {
          tempSubItem = _j(subCheckboxs[i]);
          if (!tempSubItem.hasClass('checked')) {
            tempSubItem.addClass('checked')
            tempSubItem.children('.span-checkbox').addClass('is-checked')
          }
        }
        // root checkbox is checked
        var isItemChecked = this.otherCheckBoxIsChecked(allItemCheckBoxs);
        if (isItemChecked) {
          rootCheckBoxDom.addClass('checked');
          rootCheckBoxDom.children('.root-checkbox').addClass('is-checked');
        }
        this.getRoleTxtId();
    },
    // level there checked or unchecked & parent leval checked or unchecked
    subSelect(e){
      let dom = _j(e.currentTarget);
      let checkBoxDom = dom.children('.span-checkbox');
      let itemCheckBoxDoms = _j('.item-el-checkbox');
      let otherThatDoms = dom.parent('li').siblings('li').find('.sub-el-checkbox');
      let labelCheckBoxDom = dom.parents('.sub-options').siblings('label.item-el-checkbox');
      let rootCheckBoxDom = _j('.root-el-checkbox');
      if (checkBoxDom.hasClass('is-checked')) {
        dom.removeClass('checked');
        checkBoxDom.removeClass('is-checked');
        labelCheckBoxDom.removeClass('checked');
        labelCheckBoxDom.children('.item-checkbox').removeClass('is-checked');
        rootCheckBoxDom.removeClass('checked');
        rootCheckBoxDom.children('.root-checkbox').removeClass('is-checked');
        this.getRoleTxtId();
        return;
      }
      checkBoxDom.addClass('is-checked');
      dom.addClass('checked');
      let isAllChecked = this.otherCheckBoxIsChecked(otherThatDoms);
      if (isAllChecked) {
          labelCheckBoxDom.addClass('checked');
          labelCheckBoxDom.children('.item-checkbox').addClass('is-checked');
      }
      var isItemChecked = this.otherCheckBoxIsChecked(itemCheckBoxDoms);
      if (isItemChecked) {
        rootCheckBoxDom.addClass('checked');
        rootCheckBoxDom.children('.root-checkbox').addClass('is-checked');
      }
      this.getRoleTxtId();
    },
    // show all roles
    showRoles(e) {
      let dom = _j(e.currentTarget);
      let inpDom = dom.find('input');
      let isDis = inpDom.attr('disabled');
      if (isDis === 'disabled' && this.dialogBtnIsEdit === 'edit-role-info') {
        return;
      }
      let roleBar = dom.siblings('.select-bar');
     let iconDom =  _j('.arrow-icon')
      if (roleBar.hasClass('showend')) {
        roleBar.slideUp(500);
        roleBar.removeClass('showend');
        iconDom.removeClass('arrow-icon-show-bar');
        return;
      }
      roleBar.addClass('showend');
      roleBar.slideDown(500);
      iconDom.addClass('arrow-icon-show-bar');
      //r'/oleBar.slideToggle(500);
    },
    // is all checked
    otherCheckBoxIsChecked(doms) {
       let tempOther = '';
       let isAllChecked = false;
       let i = 0;
       let len = doms.length;
      for (i; i < len; i++) {
        tempOther = _j(doms[i]);
        if (!tempOther.hasClass('checked')) {
          return false;
        }
      }
      return true;
    },
    getRoleTxtId() {
      let checkboxs = _j('.select-bar').find('.el-checkbox.checked');
      if (checkboxs.length > 0) {
        let tempArr = [], 
            tempItem = {}, 
            txt = '', 
            id = '',  
            tempIds = [];

        for (let i = 0, len = checkboxs.length; i < len; i++) {
            tempItem = _j(checkboxs[i]);
            txt = tempItem.attr('data-txt');
            id = tempItem.attr('data-id');
            tempIds.push(id);
            tempArr.push(txt)
        }
        this.role.roleIds = tempIds.join(',');
        this.role.roles = tempArr.join(',');
        console.log(this.role.roles);
      } else {
        this.role.roles = '';
      }
    },
    // array unique
    arrUnique(arr) {
      var res = [];
      var json = {};
      for(var i = 0; i < arr.length; i++){
        if(!json[arr[i]]){
          res.push(arr[i]);
          json[arr[i]] = 1;
        }
      }
      return res;
    }
  },
  beforeCreate () {
    
  },
  mounted() {
    bus.$on('is-show-rm-pup', (type, id) => {
          let submitBtnDom = _j('.submit-btn');
          if (type === 'add') {
            // add
            fetchEditMenu(this.$store).then(()=> {
              let tempData = this.$store.getters.getEditMenu;
              if (tempData.resultCode === '1'){
                var tempData2 = tempData.resultObj;
                var tempRoles = tempData2;
                this.rolesData = tempRoles;
                this.showDialogBtnType = '保存';
                this.dialogBtnIsEdit = 'add-role-info';
                this.role.name = '';
                this.role.region = '';
                this.role.desc = '';
                this.role.roles = '';
                this.role.roleIds = '';
              } else {
                this._showMessage('error', tempData.resultMsg);
              }
              
            })

          } else {
            // edit
            this.isDisabled = true;
            this.showDialogBtnType = '编辑';
            this.dialogBtnIsEdit = 'edit-role-info';
            let opts = {
              id: id, 
              token: this.token
            }
            this.role.id = id;
            fetchGetRoleById(this.$store, opts).then(()=> {
              let tempData = this.$store.getters.getRoleById;
              if (tempData.resultCode === '1') {
                let item = tempData.resultObj;
                this.role.name = item.rolename;
                this.role.desc = item.roledesc;
                this.role.region = item.rolestatus;
                this.rolesData = item.listMenu;
              } else {
                this._showMessage('error', tempData.resultMsg)
              }
            })
          }
          this.isShowDialog = true;
        });
       
  }
}
</script>
<style lang="scss">
.arrow-icon {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 35px;
  height: 100%;
  text-align: center;
  font-size: 22px;
  transition: .3s;
  color: #bfcbd9;
}
.arrow-icon-show-bar{
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
}
.select-menu-box {
  position: relative;
}

.select-bar {
  width: 100%;
  height: auto;
  overflow: hidden;
  text-align: left;
  position: absolute;
  top: 40px;
  left: 0;
  background: #fff;
  z-index: 15;
}

.options {
  padding-left: 33px;
  .sub-opt-item {
    padding-left: 33px;
  }
}

.el-checkbox {
  height: 25px;
  line-height: 25px;
  input,
  .el-checkbox__inner {
    width: 15px;
    height: 15px;
  }
  .el-checkbox__inner::after {
    top: 0px;
    left: 4px;
  }
}

.hs-icon {
  border: 1px solid #ccc;
  cursor: pointer;
  width: 15px;
  height: 15px;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #ccc;
  border-radius: 3px;
}

.icon-rotate-to-top {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
}
.el-dialog--small{
  width: 30%;
}
.el-form-item__content{
  text-align: left;
}
.dialog-footer {
  margin-top: 45px;
  .el-form-item__content{
    text-align: center;
  }
}
</style>