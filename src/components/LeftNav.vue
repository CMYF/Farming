<template>
    <div>
        <div class="home-logo-box">
            <img src="./../assets/images/logo.jpg" alt="">
        </div>
        <div class="user-pic-box">
            <span class="iconfont user-pic-icon">&#xe794;</span>
            <span class="user-name">{{ userInfo.name }}</span>
        </div>
        <el-menu :unique-opened="true" default-active="2" class="el-menu-vertical-demo left-nav-reset-bg left-nav-items" @open="handleOpen" @close="handleClose">
            <div class="menu-box" v-for="(item, index) in navDatas" :key="item.id">
                <el-menu-item :index="item.id" v-if="!item.subItems && !item.isHasSub">
                    <router-link :to="item.url">
                        <i class="iconfont nav-icon" v-html="item.menuicon"></i>{{item.name}}
                    </router-link>
                </el-menu-item>
                <div v-if="item.isHasSub">
                    <el-submenu :index="item.id" class="left-nav-reset-bg " :key="item.id">
                        <template slot="title">
                            <i class="iconfont nav-icon" v-html="item.menuicon"> </i>{{ item.name }}
                        </template>
                        <div v-if="item.isHasSub && item.subItems">
                            <el-menu-item-group v-for="(subItem, idx) in item.subItems" :key="subItem.id">
                                <router-link :to="subItem.url">
                                    <el-menu-item :index="item.id + '-' + subItem.id">{{ subItem.name }}</el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                        </div>
                    </el-submenu>
                </div>
            </div>
        </el-menu>
    </div>
</template>
<script>
import $ from 'jquery';
import { mapGetters } from 'vuex'
import store from './../store/index'
function fetchNav(store, token) {
    return store.dispatch('FETCH_GET_NAV', token);
}
function fetchSubNavById(store, idx) {
    return store.dispatch('FETCH_SUBNAV_BY_ID', {
        id: idx
    });
}
export default {
    name: 'LeftNav',
    store,
    data() {
        return {
            navDatas: {},
            userInfo: {
                name: ''
            }
        }
    },
    computed: mapGetters({
        navData: 'navData',
        subNavData: 'subNavData'
    }),
    mounted() {
        let tempInfo = localStorage.uinfo;
        let userInfo = JSON.parse(tempInfo);
        this.userInfo.name = userInfo.opername;

    },
    beforeMount() {
        let token = localStorage.token;
        fetchNav(this.$store, token).then(() => {
            var tempData = this.$store.getters.getNavData.data;
            if (tempData.resultCode === '1') {
                let tempObj = tempData.resultObj[0];
                this.navDatas = tempObj.subItems;
            } else {
                this._showMessage('error', tempData.resultMsg);
            }

        })
    },
    methods: {
        handleOpen: function() {
        },
        handleClose: function() {

        },
        getNavData: function() {
            fetchNav(this.$store).then(() => {
                this.navDatas = this.$store.getters.getNavData;
            })
        },
        getSubNavById: function() {
        },
        toNavSix: function() {
            this.$router.push('/createuser')
        },
         // show success or error message
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
<style lang="scss" >
.left-nav-reset-bg,
.left-nav-reset-bg .el-menu {

    background-color: #3f4551;
}

.left-nav-items {
    border-radius: 0;
}

.home-logo-box {
    width: 100%;
    min-width: 100%;
    img {
        min-width: 100%;
        max-width: 100%;
        height: 60px;
    }
}

.el-menu--horizontal .el-submenu .el-submenu__title {
    height: 50px;
    line-height: 50px;
}

.el-menu-item,
.el-submenu__title,
.el-submenu .el-submenu__title {
    border-left: 6px solid transparent;
}

.el-menu-item,
.el-menu-item a,
.el-submenu__title,
.el-submenu .el-submenu__title {
    height: 50px !important;
    line-height: 50px !important;
    text-align: left !important;
    color: #fff !important;
    font-size: 16px;
}

.el-menu-item a {
    display: inline-block;
}

.el-submenu .el-menu-item {
    padding-left: 55px !important;
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover,
.el-menu--horizontal.el-menu--dark .el-submenu .el-submenu-title:hover,
.el-menu-item:hover,
.el-submenu__title:hover,
.el-submenu .el-menu-item:hover,
.el-submenu__title:hover {
    background-color: #2a2e36;
}

.el-submenu.is-opened .el-submenu__title {}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active,
{
    background-color: #2a2e36;
    border-left: 6px solid #02bdad;
    color: #fff;
}

.el-menu-item-group__title {
    padding-top: 0px;
}

.user-pic-box {
    width: 100%;
    text-align: center;
    height: 160px;
    margin-top: 20px;
    .user-pic-icon {
        width: 107px;
        line-height: 107px;
        height: 107px;
        display: block;
        font-size: 85px;
        color: #fff;
        margin: 0px auto;
    }
    .user-name {
        width: 100%;
        font-size: 16px;
        font-weight: 800;
        color: #02bdad;
    }
}

.nav-icon {
    font-size: 19px;
    margin-right: 15px;
}
</style>
