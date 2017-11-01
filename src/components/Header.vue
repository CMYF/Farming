<template>
    <header class="header-box">
        <el-row class="header">
            <el-col :span="8" class="emptry-box">
                <!--<img src="./../assets/images/version.png" alt="">-->
                <span class="version-txt">标准化生产管理平台</span>
                <span class="version-num">v1.0.0</span>
            </el-col>
            <el-col :span="11" class="nav-btn-box">
                <el-col :span="24" class="">
                    <el-input class="inp-box" :style="{display: 'none'}" placeholder="请输入关键字" icon="search" v-model="input2" :on-icon-click="handleIconClick"></el-input>
                    <el-badge :value="15" class="badge-item" :style="{display: 'none'}">
                        <span class=" icon-box msg-icon-box">
                            <i class="iconfont msg-icon">&#xe779;</i>
                        </span>
                    </el-badge>

                    <el-dropdown  @command="selectMenuItem">
                        <span class="el-dropdown-link dropdown-btn-box icon-box" >
                            <i class="iconfont user-info-icon  el-icon--right">&#xe794;</i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="loginout">注销</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-col>
        </el-row>
    </header>
</template>
<script>
import _cookie from './../utils/_C'
export default {
    name: 'FHeader',
    data() {
        return {
            activeIndex: '1',
            input2: ''
        }
    },
    methods: {
        handleIconClick: function() {

        },
        selectMenuItem(val) {
            let selectItem = val;
            if (selectItem === 'loginout') {
                _cookie._C.delCookie('token');
                localStorage.uinfo = '';
                localStorage.token = '';
                this.$router.push('/login');
            }
        }
    }
}
</script>
<style lang="scss">
.right-content-box {
    background-color: #f0f3fa;
}

.header-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1190px;
    padding-left: 13.3%;
    height: 50px;
    z-index: 9;
    border-bottom: 1px solid #ccc;
    background: #fff;
}

.header {
    width: 100%;
    height: 50px;
}

.logo-box,
.nav-box {
    width: 100%;
    height: 50px;
}

.emptry-box {
    height: 50px;
    line-height: 50px;
    text-align: left;
    .version-txt{
        font-size: 20px;
        font-weight: bold;
    }
    .version-num{
        font-size: 20px;
        font-weight: initial;
    }
}

.inp-box {
    width: 320px;
    margin-left: 20px;
    border-radius: 20px;
    .el-input__inner {
        border-radius: 20px;
        height: 40px !important;
    }
}


.logo-box .logo-txt,
.logo-box .logo-icon {
    color: #fff;
    font-size: 18px;
    line-height: 50px;
    text-indent: 20px;
}

.logo-box {
    text-align: left;
}

.nav-btn-box {
    text-align: right;
    height: 50px;
}

.nav-btn-box .nav-btn {
    margin-top: 12px;
    background-color: #35404d;
    color: #fff;
}

.nav-btn-box {
    .icon-box {
        width: 60px;
        height: 50px;
        line-height: 50px;
        display: inline-block;
        text-align: center;
    }
    .set-icon,
    .msg-icon {
        font-size: 22px;
        color: #4f535c;
        cursor: pointer;
    }
}

.nav-btn-box .nav-btn:last-child {
    margin-right: 170px;
}

.dropdown-btn-box {
    height: 50px;
    display: block;
    line-height: 50px;
    .user-info-icon {
        font-size: 22px;
        color: #4f535c;
        cursor: pointer;
    }
}

.badge-item {
    .el-badge__content.is-fixed {
        top: 17px;
        right: 30px;
        padding: 0px 5px;
    }
}

@media (max-width: 1420px) {
    .header-box {
        padding-left: 14.3%;
    }
}
</style>

