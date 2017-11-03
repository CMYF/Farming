<template>
	<el-row class="info-boxs">
	   	<el-col  class="users-box">
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
	    </el-col>
	    <el-col  class="users-box">
		    <el-dialog title="添加用户" :visible.sync="isShowDailog1" class="edit-user-dialog dailogs" @close="closeDialogs">
		        <el-form :inline="true" :model="addUserInfo"  :rules="rules" ref="addUserInfo" label-width="85px" class="edit-userInfo-form-inline">
		            <el-form-item class="edit-form-item" label="登录账号" prop = "code">
		                <el-input v-model="addUserInfo.code" :maxlength="20" @keyup.native="ZhProving"  placeholder="登录账号"></el-input>
		            </el-form-item>
		            <el-form-item class="edit-form-item" label="用户名称" prop = "name">
		                <el-input v-model="addUserInfo.name" :maxlength="10"  @keyup.native="nameProving"  placeholder="用户名称"></el-input>
		            </el-form-item>
		             <el-form-item class="edit-form-item passWord" label="用户密码" prop = "pwd">
		                <el-input   v-model="addUserInfo.pwd" @keyup.native="passProving"  placeholder="请输入密码" ></el-input>
		            </el-form-item>
		            <el-form-item class="edit-form-item" label="性别">
		                <el-radio-group v-model="addUserInfo.gender">
		                <el-radio :label="1" >男</el-radio>
		                <el-radio :label="0" >女</el-radio>
		            </el-radio-group>
		            </el-form-item>  
		             <el-form-item class="edit-form-item passWord" label="确认密码" prop = "pwds">
		                <el-input   v-model="addUserInfo.pwds" @keyup.native="passProving"  placeholder="请再次输入密码" ></el-input>
		            </el-form-item>
		                 
		            <el-form-item class="edit-form-item" label="电话" >
		                <el-input v-model="addUserInfo.phone" @keyup.native="phoneProving" :maxlength="11"  placeholder="电话"></el-input>
		            </el-form-item>
		            <el-form-item class="edit-form-item" label="工号" prop = "consultantno">
		                <el-input v-model="addUserInfo.consultantno" @keyup.native="gnumProving"  :maxlength="15"  placeholder="工号"></el-input>
		            </el-form-item>
		            <el-form-item class="edit-form-item" label="状态" prop = "status">
		                 <el-select v-model="addUserInfo.status"  placeholder="请选择">
		                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
		                </el-select>
		            </el-form-item >
		            <!--<el-form-item class="edit-form-item" label="头像">
		                 <el-upload
		                class="avatar-uploader"
		                action="http://10.1.2.151/ctower-mall-c/sys/uploadimg/uploadImgBase64.do"
		                :show-file-list="false"
		                :on-success="handleAvatarSuccess"
		                :before-upload="beforeAvatarUpload"
		                :data="fileData"
		                >
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
		                >
		                <img v-if="qrimageUrl" :src="qrimageUrl" class="avatar">
		                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		            </el-upload>
		            </el-form-item> -->
		            <el-form-item class="edit-form-item edit-form-role" label="角色">
		                <el-checkbox-group v-model="checkedRoles" :max="1" class="role-checkbox-group">
		                    <el-checkbox   v-for="(item, index) in allRoles" :label="item.ids" :true-label="item.id" :key="index" >{{ item.rolename }}</el-checkbox>
		                </el-checkbox-group>
		            </el-form-item>
		           
		        </el-form>
		        <div class="edit-btn-box">
		            <el-button type="primary save-btn" @click="saveUserInfo($event)" :disabled="flag">
		                <i class="iconfont">&#xe7ca;</i>
		                <span class="btn-txt">保存</span>
		            </el-button>
		            <el-button type="primary" @click="closeDialogs">
		                <i class="iconfont ">&#xe767;</i>
		                <span class="btn-txt">取消</span>
		            </el-button>
		        </div>
		    </el-dialog>
	    </el-col>
    </el-row>
    
    
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

function fetchAddUsers(store, opts) {
    return store.dispatch('ADD_USER', opts);
};

function fetchAllRoles(store, usersInfos) {
    return store.dispatch('GET_ALL_ROLES', usersInfos);
};
export default {
    data () {
    	
    	var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入密码'));
	        } else{
		        if (this.addUserInfo.pwds !== '') {
		            this.$refs.addUserInfo.validateField('pwds');
		        }
	         	 callback();
	        }
	     };
    	
    	
    	var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.addUserInfo.pwd) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	      };
        return {
        	
        	rules: {
	          code: [
	            { required: true, message: '请输入登录账户', trigger: 'blur' },
	            { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
	          ],
	          name: [
	            { required: true, message: '请输入用户名称', trigger: 'change' }
	          ],
	          pwd: [
	           { validator: validatePass,trigger: 'blur' }
	          ],
			
	          pwds: [
	           { validator: validatePass2,trigger: 'blur' }
	          ],
	           consultantno: [
	           { required: true, message: '请输入工号' }
	          ],
	          status: [
	            { required: true, message: '请选择活动区域', trigger: 'change' }
	          ]
	        },
        	flag: false,
            isShowDailog: false,
            isShowDailog1: false,
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
            },
            
            addUserInfo:{
            	token: localStorage.token,
		        code: '',
		        name: '',
		        gender: '',
		        phone: '',
		        consultantno: '',
		        status: '',
		        ids: '',
		        pwd:'',
		        pwds:''
            },
            usersInfos:{
            	beginPage: 1,
            	pageSize: '',
            	roleName: ''
            },
            allRoles:[],
            checkedRoles: []
        }
    },
    
    beforeMount() {
		
		

    },
    
    methods:{
    	closeDialogs(){
    		this.$refs.addUserInfo.resetFields();
    		this.addUserInfo.phone = '';
    		this.isShowDailog1 = false;
    		this.addUserInfo.gender = '';
    		this.checkedRoles = [];
    		this.flag = false;
    	},
    	
    	phoneProving(){
    		this.addUserInfo.phone=this.addUserInfo.phone.replace(/\D/g,'')
    	},
    	
    	passProving(){
    		this.addUserInfo.pwd=this.addUserInfo.pwd.replace(/[\u4e00-\u9fa5]/g, '')
    		this.addUserInfo.pwds=this.addUserInfo.pwds.replace(/[\u4e00-\u9fa5]/g, '')
    	},
    	
    	gnumProving(){
    		this.addUserInfo.consultantno=this.addUserInfo.consultantno.replace(/[^\w\.\/]/ig,'')
    	},
    	ZhProving(){
    		this.addUserInfo.code=this.addUserInfo.code.replace(/[^\w\.\/]/ig,'')
    	},
    	nameProving(){
    		this.addUserInfo.name=this.addUserInfo.name.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')
    	},
    	saveUserInfo(){
    		console.log("22222222222222")
    		console.log(this.addUserInfo)
    		console.log("2233333333332")
    		console.log(this.checkedRoles)
    		this.$refs.addUserInfo.validate((valid) => {
		          if (valid) {
		          	this.flag = true;
		          	this.addUserInfo.ids = this.checkedRoles[0]
		          	fetchAddUsers(this.$store, this.addUserInfo).then(() => {
			           this.us = this.$store.getters.getAddUser;
			           if (this.us.resultCode === '1') {
							this.flag = false;
							this.isShowDailog1 = false;
							this.checkedRoles = [];
							bus.$emit('userList', '');
			           	}else{
			           		this.$message.error(this.us.resultMsg);
			           		this.flag = false;
			           	}
			        })
		          	
    			   } else {
		            console.log('error submit!!');
		            return false;
		          }
		    });	
    		
    		
    	},
    	
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
           
            _j('.btn-txt').first().text('编辑')
            this.isShowDailog = true;

        }),
        
        bus.$on('show-addUser-dialog', () =>{
            this.isShowDailog1 = true;
            this.checkedRoles = [];
           fetchAllRoles(this.$store, this.usersInfos).then(() => {
	           this.use = this.$store.getters.getAllRoles;
	           if (this.use.resultCode === '1') {
	           	console.log(this.use)
	           		this.allRoles = [];
	           		this.allRoles=this.use.basePageObj.dataList

	           	}else{
	           		
	           	}
	        });
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

.dailogs .passWord{
	.el-form-item__label:before{
    	content: '*';
	    color: #ff4949;
	    margin-right: 4px;
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