<template>
    <el-dialog title="用户信息" :visible.sync="isShowDailog" class="edit-user-dialog">
        <el-form :inline="true" :model="editUserInfo" label-width="85px" class="edit-userInfo-form-inline">
            <el-form-item class="edit-form-item" label="登录账号">
                <el-input v-model="editUserInfo.acc" :disabled="inputDisabled" placeholder="登录账号"></el-input>
            </el-form-item>
            <el-form-item class="edit-form-item" label="用户名称">
                <el-input v-model="editUserInfo.username" :disabled="inputDisabled" placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item class="edit-form-item" label="性别">
                <el-radio-group v-model="editUserInfo.gender">
                <el-radio :label="1" :disabled="inputDisabled">男</el-radio>
                <el-radio :label="0" :disabled="inputDisabled">女</el-radio>
            </el-radio-group>
            </el-form-item>       
            <el-form-item class="edit-form-item" label="电话">
                <el-input v-model="editUserInfo.telphone" :disabled="inputDisabled" placeholder="电话"></el-input>
            </el-form-item>
            <el-form-item class="edit-form-item" label="工号">
                <el-input v-model="editUserInfo.jobNo" :disabled="inputDisabled" placeholder="工号"></el-input>
            </el-form-item>
            <el-form-item class="edit-form-item" label="状态">
                 <el-select v-model="editUserInfo.status" :disabled="inputDisabled" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </el-form-item >
            <el-form-item class="edit-form-item" label="头像">
                 <el-upload
                class="avatar-uploader"
                action="http://10.1.2.151/ctower-mall-c/sys/uploadimg/uploadImgBase64.do"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :data="fileData"
                :disabled="inputDisabled">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
            <el-form-item class="edit-form-item" label="二维码图片">
                <el-upload
                class="avatar-uploader"
                action="http://10.1.2.151/ctower-mall-c/sys/uploadimg/uploadImgBase64.do"
                :show-file-list="false"
                :data="qrFileData"
                :on-success="qrHandleAvatarSuccess"
                :before-upload="qrBeforeAvatarUpload"
                :disabled="inputDisabled">
                <img v-if="qrimageUrl" :src="qrimageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item> 
            <el-form-item class="edit-form-item edit-form-role" label="角色">
                <el-checkbox-group v-model="editUserInfo.checkedLists" class="role-checkbox-group">
                    <el-checkbox :disabled="inputDisabled"  v-for="(item, index) in editUserInfo.editCheckboxs" :label="item.rolename" :true-label="item.id" :key="index" >{{ item.rolename }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
           
        </el-form>
        <div class="edit-btn-box">
            <el-button type="primary save-btn" @click="editInfo($event)">
                <i class="iconfont">&#xe7ca;</i>
                <span class="btn-txt">编辑</span>
            </el-button>
            <el-button type="primary" @click="closeDailog">
                <i class="iconfont ">&#xe767;</i>
                <span class="btn-txt">取消</span>
            </el-button>
        </div>
    </el-dialog>
</template>
<script>
import bus from './../eventBus' 
import store from './../store/index'
import _j  from 'jquery'
function fetchUserInfoById(store, opts) {
    return store.dispatch('GET_USER_BY_ID', opts)
}
function fetchUpdateUserById(store, opts) {
    return store.dispatch('UPDATE_USER_BY_ID', opts);
};
export default {
    data () {
        return {
            isShowDailog: false,
            formLabelWidth: '120px',
            options: [
                {
                    value: '1',
                    label: '有效'
                },
                {
                    value: '0',
                    label: '无效'
                }
            ],
            fileData: {
                catalog: 'farming/images',
                loginedtoken: localStorage.token
            },
            qrFileData: {
                catalog: 'farming/images',
                loginedtoken: localStorage.token
            },
            inputDisabled: true,
            optionsVal: '',
            imageUrl: '',
            qrimageUrl: '',
            id: 0,
            editUserInfo: {
                acc: '',
                username:'',
                telphone: '',
                jobNo: '',
                gender: '',
                status: '',
                editCheckboxs: [],
                checkedLists: [],
                id: 0,
                roleIds: '',
                token: ''
            }
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return;
        }
        return isLt2M;
      },
      qrHandleAvatarSuccess(res, file) {
        this.qrimageUrl = URL.createObjectURL(file.raw);
      },
      qrBeforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return;
        }
        return isLt2M;
      },
      closeDailog(){
          this.isShowDailog = false;
          _j('.save-btn').removeClass('add');
      },
      editInfo(e) {
          let dom = _j(e.currentTarget);
          this.inputDisabled = false;
          if (dom.hasClass('add')) {
            // 添加操作
            let tempCheckedLists = this.editUserInfo.checkedLists;
            let allCheckBoxs = this.editUserInfo.editCheckboxs;
            let roleIds = '';
            for (let i = 0, len = tempCheckedLists.length; i < len; i++) {
                for (let j = 0, len = allCheckBoxs.length; j < len; j++ ) {
                    if (tempCheckedLists[i] === allCheckBoxs[j].rolename) {
                        if (i == tempCheckedLists.length - 1) {
                            roleIds += allCheckBoxs[j].roleid;
                        } else {
                            roleIds += allCheckBoxs[j].roleid + ','
                        }
                    }
                }
            }
            this.editUserInfo.roleIds = roleIds;
            this.editUserInfo.token = localStorage.token;
            this.editUserInfo.id = this.id;
            fetchUpdateUserById(this.$store, this.editUserInfo).then(() => {
                let results = this.$store.getters.getUpdateUserInfo;
                if (results.resultCode === '1') {
                    this._showMessage('success', '更新成功！');
                    this.isShowDailog = false;
                }
            });
            dom.removeClass('add');
            dom.children('span').find('.btn-txt').text('编辑');
            return;
          }
          dom.addClass('add');
          dom.children('span').find('.btn-txt').text('保存');
      },
      _showMessage(type, msg) {
      this.$message({
        type: type,
        message: msg,
        showClose: true
      });
    }
    },
    mounted() {
        bus.$on('show-edit-dialog', (id) =>{
            this.id = id;
            let opts = {
                id: id,
                token: localStorage.token
            }
            fetchUserInfoById(this.$store, opts).then(() => {
                let tempData = this.$store.getters.getUserInfoById;
                if (tempData.resultCode === '1') {
                    let tempUser = tempData.resultObj;
                    this.editUserInfo = {
                        acc: tempUser.opercode,
                        username: tempUser.opername,
                        telphone: tempUser.operphone,
                        jobNo: tempUser.consultantno,
                        gender: Number(tempUser.opergender),
                        status: tempUser.operstatus,
                        editCheckboxs: tempUser.roleList,
                        checkedLists: tempUser.roleNames.split(','),
                    }
                }
            })
            this.inputDisabled = true;
            _j('.btn-txt').first().text('编辑')
            this.isShowDailog = true;

        })
    }
}
</script>
<style lang="scss">
.edit-user-dialog .el-dialog{
    width: auto;
}
.edit-userInfo-form-inline{
    width: 630px;
}
.edit-form-item{
    width: 302px;
    text-align: left;
}
.edit-form-role{
    width: 100%;
    label.el-form-item__label{
        width: 85px;
        height: 100%;
        text-align: center;
    }
    label.el-checkbox{
        margin-left: 0px;
        width: 120px;
    }
}
.avatar-uploader-icon{
    width: 150px;
    height: 150px;
    line-height: 150px;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .el-form--inline .edit-form-role  .el-form-item__content{
      width: 80%;
  }
  .el-form--inline .el-form-item__content .el-checkbox-group{
    width: 100%; 
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>