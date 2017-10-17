<template>
    <header class="header-box">
        <el-row class="header">
            <el-col :span="8" class="emptry-box">
                <img src="./../assets/images/version.png" alt="">

            </el-col>
            <el-col :span="11" class="nav-btn-box">
                <el-col :span="24" class="">
                    <el-input class="inp-box" placeholder="请输入关键字" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                    </el-input>
                    <el-badge :value="15" class="badge-item">
                        <span class=" icon-box msg-icon-box">
                            <i class="iconfont msg-icon">&#xe779;</i>
                        </span>
                    </el-badge>

                    <el-dropdown>
                        <span class="el-dropdown-link dropdown-btn-box icon-box">
                            <i class="iconfont user-info-icon  el-icon--right">&#xe794;</i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item>消息</el-dropdown-item>
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item>注销</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-col>
        </el-row>
    </header>
</template>
<script>
export default {
    name: 'FHeader',
    data() {
        return {
            activeIndex: '1',
            input2: ''
        }
    },
    methods: {
        toIndex: function() {
            this.$router.push('/')
        },
        sendLogin: function() {
            this.$router.push('/login')

        },
        handleIconClick: function() {

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
    height: 60px;
    z-index: 9;
    border-bottom: 1px solid #ccc;
    background: #fff;
}

.header {
    width: 100%;
    height: 60px;
}

.logo-box,
.nav-box {
    width: 100%;
    height: 60px;
}

.emptry-box {
    height: 60px;
    text-align: left;
}

.inp-box {
    width: 320px;
    margin-top: 12px;
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
    line-height: 60px;
    text-indent: 20px;
}

.logo-box {
    text-align: left;
}

.nav-btn-box {
    text-align: right;
    height: 60px;
}

.nav-btn-box .nav-btn {
    margin-top: 12px;
    background-color: #35404d;
    color: #fff;
}

.nav-btn-box {
    .icon-box {
        width: 60px;
        height: 60px;
        line-height: 60px;
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
    height: 60px;
    display: block;
    line-height: 60px;
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

