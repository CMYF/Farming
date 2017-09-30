<template>
    <header class="header-box">
        <el-row class="header">
            <el-col :span="3">
                <div class="logo-box">
                    <span class="logo-icon">
                        <i class="el-icon-menu"></i>
                    </span>
                    <span class="logo-txt" @click="toIndex">春沐源农业管理系统</span>
                </div>
            </el-col>
            <el-col :span="13" class="emptry-box">
                <el-input class="inp-box" placeholder="请输入关键字" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
            <el-col :span="6" class="nav-btn-box">
                <el-col :span="24">
                    <span class="icon-box set-icon-box">
                        <i class="iconfont set-icon">&#xe7da;</i>
                    </span>
                    <span class=" icon-box msg-icon-box">
                        <i class="iconfont msg-icon">&#xe779;</i>
                    </span>
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
        handleIconClick: function () {

        }
    }
}
</script>
<style lang="scss" scoped>
.header-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 9;
}

.header {
    width: 100%;
    height: 60px;
    background: #35404d;
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
.inp-box{
    width: 200px;
    margin-top: 12px;
    margin-left: 20px;
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


/* .nav-items {
    height: 60px;
    background-color: #35404d;
}

.nav-items .nav-item {
    height: 60px;
    line-height: 60px;
}
*/

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
        color: #fff;
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
        color: #fff;
    }
}
</style>

