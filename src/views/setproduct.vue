<template>
    <el-row class="pro-box">
        <el-breadcrumb separator="/" class="bread-box">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>生产配置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :span="22"  class="pro-content">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="产品分类" name="productType">产品分类</el-tab-pane>
                <el-tab-pane label="产品信息" name="info">
                    <ProductInfo> </ProductInfo>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>
<script>
import ProductInfo from './../components/ProductInfo'
export default {
    components: {
        ProductInfo
    },
    data() {
        return {
            activeName2: 'info'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style lang="scss">
.pro-box {
    height: 60px;
}

.bread-box {
    height: 60px;
    line-height: 60px;
    padding-left: 40px;
    font-size: 16px;
}
.pro-content{
    margin-left: 20px;
}
.info{
    padding-top: 20px;
}
</style>