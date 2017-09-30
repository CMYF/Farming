<template>
    <div>
        <FHeader> </FHeader>
        <el-row class="tac">
            <el-col :span="3" class="left-nav-box left-nav-reset-bg">
                <LeftNav></LeftNav>
            </el-col>
            <el-col :span="21" :offset="3" class="right-content-box">

                <router-view name="rightContent"></router-view>

            </el-col>
        </el-row>
    </div>
</template>
<script>
import $ from 'jquery';
import { mapGetters } from 'vuex'
import store from './../store/index'
import FHeader from './../components/Header'
import LeftNav from './../components/LeftNav'
function fetchHome(store) {
    console.log('====================');
    console.log(store);
    return store.dispatch('GET_HOMEPAGE');
}

export default {
    name: 'homepage',
    store,
    components: {
        FHeader,
        LeftNav
    },
    data() {
        return {
            datas: {}
        }
    },

    created() {
    },
    computed: mapGetters({
        HomePage: 'homeData',
    }),
    beforeMount() {
        console.log('---------------------');
        console.log(this.$store);
        /*fetchHome(this.$store).then(() => {
            console.log(this.$store);
            this.datas = this.$store.getters.homeData.resultData;
            console.log(this.datas.banner);
        })*/
    },
    mounted() {
        var localStore = window.localStorage;
        //localStorage.token = '1';
        var isLogin = localStorage.token;
        if (!isLogin) {
            this.$router.push('/login');
        }

    },
    methods: {

    },

}
</script>
<style lang="scss">
.left-nav-reset-bg
{

    background-color: #35404d;
}
</style>

