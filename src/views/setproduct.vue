<template>
    <el-row class="pro-box">
        <el-breadcrumb separator="/" class="bread-box">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>生产配置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :span="23" class="pro-content">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="归属地" name="productType">
                    <BelongToPosi></BelongToPosi>
                </el-tab-pane>
                <el-tab-pane label="产品信息" name="info">
                    <ProductInfo> </ProductInfo>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>
<script>
import ProductInfo from './../components/ProductInfo'
import BelongToPosi from './../components/BelongToPosi'
export default {
    components: {
        ProductInfo,
        BelongToPosi
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
.el-table td{
    background-color: #fff;
}

.pro-box {
    height: 60px;
}

.bread-box {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    font-size: 16px;
    background-color: #fff;
}

.pro-content {
    margin-top: 10px;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    background-color: #fff;
}

.info {
    padding-top: 20px;
}
</style>