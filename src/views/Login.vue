<template>
    <el-row class="main-box">
        <div  class="login-res-box">
        	<div class="login_left">
        		<div class="logo-icon">
        			<img src="../../static/images/denglu/denglu_bg3.png" />
        		</div>
        		<div class="login_left_pic">
        			<img src="../../static/images/denglu/denglu_bg1.png" />
        		</div>
        	</div>
        	<div class="login_right">
	            <div class="logo-box">
	            	
	            </div>
	            
	            <div class="login_tip">
	            	<span class="tip_word" >{{ titleNotice }}</span>
	            </div>
	            
	            <el-row class="inp-box" >
	                <el-col :span="3" class="icon-box">
	                    <i class="iconfont style-icon">&#xe782;</i>
	                </el-col>
	                <el-col :span="18">
	                    <el-input class="inp-item user-inp" @keyup.native="_inputFocus($event)"  v-model="user.name" placeholder="请输入用户名"> </el-input>
	                </el-col>
	                <el-col :span="2" class="icon-box del_user"  v-if="key"  >
	                    <i class="el-icon-circle-close style-icon" @click="_delUser($event)"></i>
	                </el-col>
	            </el-row>
	            <el-row class="inp-box" >
	                <el-col :span="3" class="icon-box">
	                    <i class="iconfont style-icon">&#xe7d7;</i>
	                </el-col>
	                <el-col :span="18">
	                    <el-input class="inp-item pass-inp" type="password" @keyup.native="_inputFocusPass($event)"   v-model="user.pass" placeholder="请输入密码"  auto-complete="off"></el-input>
	                </el-col>
	                <el-col :span="2" class="icon-box" v-if="keys" >
	                    <i class="el-icon-circle-close style-icon" @click="_delPass($event)"></i>
	                </el-col>
	            </el-row>
	            <el-row class="never-pass">
	                <router-link class="never-txt" :to="{}">忘记密码？</router-link>
	            </el-row>
	            <el-row class="inp-button"   >
		            <el-col :span="18" :offset="3"  class="login_btn">
		             	<el-button class="btn-display" type="success"  @click="_login($event)">登 &nbsp;录</el-button>
		            </el-col>
	            </el-row>
        	</div>
            
        </div>
        <!--<el-button :plain="true" v-show="isShowMassage"></el-button>-->
    </el-row>
</template>
<script>
import { mapGetters } from 'vuex'
import store from './../store/index'
function fetchLogin(store, opt) {
    return store.dispatch('LOGIN', {
        id: opt.name,
        pwd: opt.pass
    });
}
export default {
    store,
    name: 'loginpage',
    data () {
        return {
            user: {
                name: '',
                pass: ''
            },
            lgd: {},
            key:false,
            keys:false,
            titleNotice:''
        }
    },
    computed: mapGetters({
        loginData: 'LoginData'
    }),
    methods: {
        _login: function (e) {
            var name = this.user.name;
            var pass = this.user.pass;
            if (!name) {
                this.titleNotice='*用户名不能为空！'
                return;
            }
            if (!pass) {
                this.titleNotice='*密码不能为空！';
                return;
            }
            fetchLogin(this.$store, this.user).then(() => {
               this.lgd = this.$store.getters.LoginData.resultData;
               if (this.lgd.resultCode === '1') {
                    const token = this.lgd.resultObj.token;
                    localStorage.token = token;
                    this.$router.push('/');
               	}else{
               		this.titleNotice=this.lgd.resultMsg;
               	}
            }); 
        },
        _showMessage: function (msg) {
            this.$message({
                type: 'error',
                showClose: true,
                message: msg
            });
        },
        
        _inputFocus: function(event){
        	let dom = event.currentTarget;
        	if(this.user.name != ''){
        		this.key=true;
        	}else{
        		this.key=false;
        	}
        },
 		
        _delUser: function(event){
        	this.user.name = '';
        	this.key=false;
        },
        
        _inputFocusPass: function(event){
        	let dom = event.currentTarget;
        	if(this.user.pass != ''){
        		this.keys=true;
        	}else{
        		this.keys=false;
        	}
			
        },
       
        _delPass: function(event){
        	this.user.pass = '';
        	this.keys=false;
        }
        
    }
    
}
</script>

<style lang="scss">
.main-box {
    width: 100vw;
    height: 100vh;   
    min-height: 600px;
    overflow: auto;
    background: url(./../../static/images/denglu/login_bg.jpg) no-repeat 100% 100%;
}


.logo-box{
	width: 100%;
	height: auto;
	min-height: 115px;
	margin-top: 9%;
	 background: url(./../../static/images/denglu/denglu_bg2.png) no-repeat center;
	 background-size: 100% 100%;
}

.login_right{
	width: 50%;
	float: right;
	.el-input__inner {
	   border: none;
	   height: 40px;
	}

	.el-button{
		border-radius: 20px;
		background-color: #02bdad;
		font-size: 20px;
	}
	
	.input:-webkit-autofill{
		background-color: #FFFFFF;
	}
	
}

.login_left{
	width: 50%;
	float: left;
}

.logo-icon{
   width: 182px;
   img{
   	width: 100%;
   	display: inline-block;
   }
}

.login_left_pic{
	width: 78%;
	margin: 0 auto;
	margin-top: 10%;
   img{
   	width: 100%;
   	display: inline-block;
   }
}

.login-res-box{
    height: auto;
    min-height: 300px;
    overflow: hidden;
    width: 44%;
    margin: 0px auto;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0);
    margin-top: 250px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 15px;
    padding-bottom: 5%;
    box-shadow: 2px 2px 13px #02bdad;
    -moz-box-shadow: 2px 2px 13px #02bdad;
    -ms-box-shadow: 2px 2px 13px #02bdad;
    -o-box-shadow: 2px 2px 13px #02bdad;
    -webkit-box-shadow: 2px 2px 13px #02bdad;
    .inp-box{
    	width: 80%;
        margin-top: 15px;
        margin-left: 10%;
        border-bottom: 1px solid #AAAAAA;
    }
    .icon-box{
        height: 40px;
        line-height: 40px;
        display: inline-block;
        color: #aaaaaa;
    }
    .style-icon{
        font-size: 24px;
        line-height: 40px;
    }
}

.login_tip{
	margin-top: 4%;
	width: 100%;
	height: 20px;
	text-align: left;
}
.login_tip .tip_word{
	font-size: 18px;
	margin-left: 12%;
	color: #ff8f8d;
}

.inp-item{
	height: 40px;
}

.btn-display{
    width: 100%;
    height: 44px;
}
.never-pass{
    padding-top: 10px;
    padding-bottom: 15px;
    text-align:right;
    margin-right: 5%;
    .never-txt{
    color: #02bdad;
    
    }
}

</style>
