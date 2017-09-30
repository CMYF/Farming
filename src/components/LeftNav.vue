<template>
    <el-menu default-active="2" class="el-menu-vertical-demo left-nav-reset-bg left-nav-items" @open="handleOpen" @close="handleClose">
        <div class="menu-box" v-for="(item, index) in navDatas" :key="item.id">
            <el-menu-item :index="item.id" v-if="!item.subItems && !item.isHasSub">
                <router-link :to="item.url">
                    <i class="iconfont" v-html="item.menuicon"></i>{{item.name}}
                </router-link>
            </el-menu-item>
            <div v-if="item.isHasSub">
                <el-submenu :index="item.id" class="left-nav-reset-bg " :key="item.id">
                    <template slot="title">
                        <i class="iconfont" v-html="item.menuicon"> </i>{{ item.name }}
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
</template>
<script>
import $ from 'jquery';
import { mapGetters } from 'vuex'
import store from './../store/index'
function fetchNav(store, token) {
    return store.dispatch('FETCH_GET_NAV', token);
}
function fetchSubNavById(store, idx) {
    console.log('刚进来???---' + idx);
    return store.dispatch('FETCH_SUBNAV_BY_ID', {
        id: idx
    });
}
export default {
    name: 'LeftNav',
    store,
    data() {
        return {
            navDatas: {}
        }
    },
    computed: mapGetters({
        navData: 'navData',
        subNavData: 'subNavData'
    }),
    mounted() {
        var docH = $(document).height();
        var headerH = $('.header').height();
        var h = docH - headerH;
        $('.left-nav-items').css({
            'max-height': h + 'px',
            'overflow-y': 'auto'
        });

    },
    beforeMount() {
        let token = localStorage.token;
        fetchNav(this.$store, token).then(() => {
        var tempData = this.$store.getters.getNavData.data.resultObj[0];
           this.navDatas = tempData.subItems;
        })
    },
    methods: {
        handleOpen: function() {
        },
        handleClose: function() {

        },
        getNavData: function() {
            /*  fetchNav(this.$store).then(() => {
                 console.log('点击导航有数据吗？');
                 console.log(this.$store);
                 this.navDatas = this.$store.getters.getNavData;
                 console.log(this.navDatas);
             }) */
        },
        getSubNavById: function() {
            console.log('yes or no ?');
            fetchSubNavById(this.$store, 2).then(() => {
                console.log('获取子导航有吗？');
                console.log(this.$store);
            });
        },
        toNavSix: function() {
            this.$router.push('/createuser')
        }

    }
}
</script>
<style lang="scss" scoped>
.left-nav-reset-bg,
.left-nav-reset-bg .el-menu {

    background-color: #35404d;
}

.left-nav-items {
    border-radius: 0;
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
    color: #20a0ff;
}

.el-menu--horizontal .el-submenu .el-submenu__title {
    height: 50px;
    line-height: 50px;
}

.el-menu-item,
.el-submenu__title,
.el-submenu .el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
    text-align: left !important;
}
</style>
