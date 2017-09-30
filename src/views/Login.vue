<template>
    <el-row class="main-box">
        <div  class="login-res-box">
            <div class="logo-box">
                <i class="iconfont logo-icon">&#xe7a4;</i>
                <i class="iconfont logo-icon">&#xe7a6;</i>
                <i class="iconfont logo-icon">&#xe7a4;</i>
            </div>
            <el-row class="inp-box">
                <el-col :span="2" class="icon-box">
                    <i class="iconfont style-icon">&#xe782;</i>
                </el-col>
                <el-col :span="21" :offset="1">
                    <el-input class="inp-item user-inp" v-model="user.name" placeholder="请输入用户名"> </el-input>
                </el-col>
            </el-row>
            <el-row class="inp-box">
                <el-col :span="2" class="icon-box">
                    <i class="iconfont style-icon">&#xe7d7;</i>
                </el-col>
                <el-col :span="21" :offset="1">
                    <el-input class="inp-item pass-inp" type="password" v-model="user.pass" placeholder="请输入密码"  auto-complete="off"></el-input>
                </el-col>
            </el-row>
            <el-row class="never-pass">
                <router-link class="never-txt" :to="{}">忘记密码？</router-link>
            </el-row>
             <el-button class="btn-display" type="success" @click="_login($event)">登录</el-button>
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
            lgd: {}
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
               this._showMessage('用户名不能为空！');
                return;
            }
            if (!pass) {
                this._showMessage('密码不能为空！');
                return;
            }
            fetchLogin(this.$store, this.user).then(() => {
               this.lgd = this.$store.getters.LoginData.resultData;
               if (this.lgd.resultCode === '1') {
                    const token = this.lgd.resultObj.token;
                    localStorage.token = token;
                    this.$router.push('/');
               }
            }); 
        },
        _showMessage: function (msg) {
            this.$message({
                type: 'error',
                showClose: true,
                message: msg
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.main-box {
    width: 100vw;
    height: 100vh;   
    min-height: 600px;
    overflow: auto;
    background: url(./../../static/images/login_bg.jpg) no-repeat 100% 100%;
}
.logo-icon{
    font-size: 42px;
    color: #fff;
}
.login-res-box{
    height: auto;
    min-height: 300px;
    overflow: hidden;
    width: 340px;
    margin: 0px auto;
    border-radius: 6px;
    background: rgba(0, 0, 0, .3);
    margin-top: 150px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 30px;
    box-shadow: 2px 2px 13px #000;
    -moz-box-shadow: 2px 2px 13px #000;
    -ms-box-shadow: 2px 2px 13px #000;
    -o-box-shadow: 2px 2px 13px #000;
    -webkit-box-shadow: 2px 2px 13px #000;
    .inp-box{
        margin-top: 15px;
    }
    .icon-box{
        height: 36px;
        line-height: 36px;
        display: inline-block;
        color: #fff;
    }
    .style-icon{
        font-size: 22px;
    }
}
.btn-display{
    width: 100%;
    margin-top: 20px;
}
.never-pass{
    padding-top: 5px;
    text-align:right;
    .never-txt{

    color: #fff;
    }
}
</style>
