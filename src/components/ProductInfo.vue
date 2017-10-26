<template >
    <el-row class="info-box">
        <el-col :span="7" class="select-info-box">
            <el-select v-model="productInfo" @change="filterProductInfo" filterable placeholder="请选择">
                <el-option v-for="item in productNameIds" :key="item.value" :label="item.label" :value="item.id + ':' + item.value">
                </el-option>
            </el-select>
            <el-button type="success" @click="filterProducts">筛选</el-button>
        </el-col>
        <el-col :span="11">
            <div style="height:60px;"></div>
        </el-col>
        <el-col :span="5">
            <el-button class="add-product-info" @click="addProductInfo">
                <span class="iconfont">&#xe622;</span>新增
            </el-button>
            <el-button class="del-product-info" @click="delProductInfo">
                <span class="iconfont">&#xe7d3;</span> 删除
            </el-button>
        </el-col>
        <el-table class="info-table" ref="multipleTable" v-loading="isShowLoading" element-loading-text="加载中..." :data="productInfos" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column type="index" label="序号" width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="产品名称" prop="name" align="center" >
            </el-table-column>
            <el-table-column prop="addressName" label="归属地" align="center" width="450">
            </el-table-column>
            <el-table-column prop="productionLink" label="生产环节(个)" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pluck" label="采收周期(天)" align="center"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="germinate" label="发芽率%" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="transplant" label="移栽成苗率%" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="weight" label="单棵重g" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-row class="page-box">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.getProducts.currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="this.getProducts.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.getProducts.totalRows">
            </el-pagination>
        </el-row>
        <el-dialog class="product-dialog-box" title="新增产品" :visible.sync="dialogFormVisible">
            <el-form :model="form" :inline="true" ref="form" :rules="rules" class="product-form">
                <el-form-item label="产品名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" auto-complete="off" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item label="归属地" :label-width="formLabelWidth" prop="address"> </el-select>
                    <el-cascader :options="options" v-model="form.address" @change="handleKuaidialChange"></el-cascader>
                </el-form-item>
                <el-form-item label="发芽率%" :label-width="formLabelWidth" prop="germinate">
                    <el-input v-model="form.germinate" auto-complete="off" placeholder="请输入发芽率"></el-input>
                </el-form-item>
                <el-form-item label="移栽成苗率%" :label-width="formLabelWidth" prop="transplant">
                    <el-input v-model="form.transplant" auto-complete="off" placeholder="请输入移栽成苗率"></el-input>
                </el-form-item>
                <el-form-item label="单棵重g" :label-width="formLabelWidth" prop="weight">
                    <el-input v-model="form.weight" auto-complete="off" placeholder="请输入重量"></el-input>
                </el-form-item>
                <el-form-item label="采摘周期" :label-width="formLabelWidth" prop="pluck">
                    <el-input v-model="form.pluck" auto-complete="off" placeholder="请输入采摘周期"></el-input>
                </el-form-item>
            </el-form>
            <div class="add-product-link">
                <el-button class="product-link-btn" @click="addProductLinkInfo($event)">
                    <span class="iconfont">&#xe622;</span> 添加生产环节
                </el-button>
            </div>
            <el-form :inline="true" class="product-form product-link-form">
                <div class="product-link-box" v-for="(domain, index) in dyProductLink.domains" :key="index">
                    <div>
                        <el-form-item label="生产环节名称" :label-width="formLabelWidth">
                            <el-select v-model="domain.name" class="link-name" @change="changeLink(index)" placeholder="请选择环节名称">

                                <el-option v-for="(item, idx) in linkNames" :key="idx" :label="item.name" :value="item.id + '|' + item.name"></el-option>
                            </el-select>
                            <el-input style="display:none;" placeholder="请输入" v-model="domain.name_desc" class="link-name2"></el-input>
                        </el-form-item>
                        <el-form-item label="生产环节周期提醒" :label-width="formLabelWidth2" v-show="domain.isShowPeriod">
                            <el-input class="link-date" v-model="domain.days"></el-input> 天
                            <el-input class="link-time" v-model="domain.hours"></el-input> 小时
                        </el-form-item>
                        <el-form-item label="安全间隔期提醒" v-show="!domain.isShowPeriod" :label-width="formLabelWidth2">
                            <el-input class="link-date" v-model="domain.days"></el-input> 天
                        </el-form-item>
                        <el-form-item label="此环节责任人" :label-width="formLabelWidth">
                            <el-select v-model="domain.liablePerson" placeholder="请选择">
                                <el-option v-for="item in productInfo" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-input type="textarea" v-model="domain.desc" :rows="4" placeholder="请输入内容"></el-input>
                        <ul class="temp-items-box" v-for="(temp, i) in domain.linkByTemps" :key="i">
                            <li class="temp-item" v-for="(subTemp, j) in temp.subTemps" :key="j">
                                <span class="tmep-item-tip">{{ subTemp.text }}</span>
                            </li>
                        </ul>

                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer dialog-footer-box">
                <el-button class="save-btn" @click="saveProductLinkInfo">确 定</el-button>
                <el-button class="cancle-btn" @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
function fetchGetProducts(store, opts) {
    return store.dispatch('GET_PRODUCT_INFO', opts);
}
function fetchKuaidials(store, opts) {
    return store.dispatch('GET_KUAIDIALS', {
        token: localStorage.token
    });
}
function fetchSaveProductLink(store, opts) {
    return store.dispatch('SAVE_PRODUCT_LINKS', opts)
}
function fetchLinkTemplate(store, opts) {
    return store.dispatch('GET_LINK_TEMP', opts);
}
function fetchLinkNames(store) {
    return store.dispatch('GET_LINK_NAMES');
}
function fetchDelProductInfo(store, opts) {
    return store.dispatch('DELETE_PRODUCT_INFO', opts);
}
import store from './../store/index'
import _j from 'jquery'
export default {
    name: 'ProductInfo',
    store,
    data() {
        return {
            productNameIds: [],
            productInfo: '',
            selectedOptions: [],
            token:localStorage.token,
            options: [],  // 归属地
            getProducts: { // 产品数据
                currentPage: 1,
                pageSize: 10,
                totalRows: 0,
                totalPage: '',
                hasNextpage: true,
                productName: '',
                productId: '',
                beginPage: 1
            },
            isShowLoading: false,
            productInfos: [],
            multipleSelection: [],
            form: { // 新增字段
                name: '',
                address: [],
                germinate: '',
                transplant: '',
                weight: '',
                pluck: ''
            },
            linkNames: [],
            dyProductLink: { // 环节
                domains: [
                    {
                        value: '',
                        name_desc: '',
                        name: '',
                        days: '',
                        isShowPeriod: true,
                        hours: '',
                        liablePerson: '',
                        desc: '',
                        linkId: '',
                        linkIdName: '',
                        linkTempleId: '',
                        linkByTemps: []
                    }
                ]
            },
            rules: {
                name: [
                    { required: true, message: '请输入产品名称', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请选择归属地', trigger: 'blur' }
                ],
                germinate: [
                    { required: true, message: '请输入发芽率', trigger: 'blur' }
                ],
                transplant: [
                    { required: true, message: '请输入移栽成苗率', trigger: 'blur' }
                ],
                weight: [
                    { required: true, message: '请输入重量', trigger: 'blur' }
                ],
                pluck: [
                    { required: true, message: '请输入采摘周期', trigger: 'blur' }
                ]
            },
            dialogFormVisible: false,
            formLabelWidth: '120px',
            formLabelWidth2: '150px'
        }
    },
    beforeMount() {
        this.getProducts.token = this.token;
        fetchGetProducts(this.$store, this.getProducts).then(() => {
            this.dec_data();
        });
        fetchKuaidials(this.$store).then(() => {
            this.dec_kuaidialDatas();
        })
    },
    methods: {
        // select rows
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        // dec product data
        dec_data() {
            let tempDatas = this.$store.getters.getProductInfos;
            if (tempDatas.resultCode === '1') {
                let tempItem = {};
                let baseObj = tempDatas.basePageObj;
                let tempInfos = baseObj.dataList;
                this.getProducts.totalRows = baseObj.totalRows;
                this.productInfos.length = 0;

                let tempNameIds = [];
                if (tempInfos.length > 0) {
                    const len = tempInfos.length;
                    for (let i = 0; i < len; i++) {
                        tempItem = tempInfos[i];
                        this.productInfos.push({
                            orderNumber: 1,
                            name: tempItem.chanpmc,
                            address: tempItem.guisd,
                            germinate: tempItem.fayl,
                            transplant: tempItem.yizcml,
                            weight: tempItem.dankz,
                            id: tempItem.chanpid,
                            pluck: tempItem.caiszq,
                            productionLink: tempItem.linksNum,
                            addressName: tempItem.guisdname
                        });
                        tempNameIds.push({
                            value: tempItem.chanpmc,
                            label: tempItem.chanpmc,
                            id: tempItem.chanpid
                        });
                    }
                }
                this.productNameIds = tempNameIds;
                this.isShowLoading = false;
            }
        },
        delProductInfo() {
            let productIds = this.multipleSelection;
            if (productIds.length > 1) {
                this._showMessage('error', '删除除失败，目前只支持一次一条数据');
                return;
            }
            if (productIds.length <=0 ) {
                this._showMessage('error', '请选中要删除的数据！');
                return;
            }
            let proId = productIds[0].id;
            fetchDelProductInfo(this.$store, { id: proId }).then(() => {
                let tempData = this.$store.getters.delProductInfo;
                if (tempData.resultCode === '1') {
                    this._showMessage('success', '删除产品信息成功！');
                } else {
                    this._showMessage('error', tempData.resultMsg);
                }
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },
        handleSizeChange(val) {
            this.isShowLoading = true;
            this.getProducts.pageSize = val;
            fetchGetProducts(this.$store, this.getProducts).then(() => {
                this.dec_data();
            });

        },
        handleCurrentChange(val) {
            this.isShowLoading = true;
            this.getProducts.currentPage = val;
            fetchGetProducts(this.$store, this.getProducts).then(() => {
                this.dec_data();
            });

        },
        // add product info show dialog
        addProductInfo() {
            this.dyProductLink.domains.length = 0;
            this.linkNames.length = 0;
            this.form = { // 新增字段
                name: '',
                address: [],
                germinate: '',
                transplant: '',
                weight: '',
                pluck: ''
            };
            fetchLinkNames(this.$store).then(() => {
                let tempData = this.$store.getters.getLinkNames;
                if (tempData.resultCode === '1') {
                    let tempLinkNames = tempData.resultObj,
                        len = tempLinkNames.length,
                        tempItem = {};
                    for (let i = 0; i < len; i++) {
                        tempItem = tempLinkNames[i];
                        this.linkNames.push({
                            id: tempItem.linkId,
                            name: tempItem.linkName
                        });
                    }
                }
            });
            this.dialogFormVisible = true;
        },
        // add link 
        addProductLinkInfo(e) {
            let dom = _j(e.currentTarget);
            this.dyProductLink.domains.push({
                value: '',
                name_desc: '',
                name: '',
                days: '',
                isShowPeriod: true,
                hours: '',
                liablePerson: '',
                desc: '',
                linkId: '',
                linkIdName: '',
                linkTempleId: '',
                linkByTemps: []
            });
        },
        // chenage link
        changeLink(index) {
            const idx = index;
            const linkId = this.dyProductLink.domains[index].name;
            const linkArr = linkId.split('|');
            this.dyProductLink.domains[index].linkId = linkArr[0];
            this.dyProductLink.domains[index].linkName = linkArr[1];
            if (linkArr[0] === 'T001') {
                this.dyProductLink.domains[idx].isShowPeriod = false;
            } else {
                this.dyProductLink.domains[idx].isShowPeriod = true;
            }
            this.dyProductLink.domains[idx].linkByTemps.length = 0;
            fetchLinkTemplate(this.$store, { linkId: linkArr[0] }).then(() => {
                let tempData = this.$store.getters.getLinkTemps;
                if (tempData.resultCode === '1') {
                    let linkTemp = tempData.resultObj.agriTemplatelink,
                        len = linkTemp.length,
                        tempItem = {},
                        temp = {},
                        subTempItem = {},
                        subTemps = [];
                    for (let i = 0; i < len; i++) {
                        tempItem = linkTemp[i];
                        temp = {
                            desc: tempItem.describ,
                            id: tempItem.id,
                            link: tempItem.link,
                            isHasTemp: false,
                            subTemps: []
                        }
                        this.dyProductLink.domains[idx].linkByTemps.push(temp);
                        this.dyProductLink.domains[idx].linkTempleId = tempItem.id;
                        subTemps = tempItem.agriTemplateform;
                        if (subTemps.length > 0) {
                            this.dyProductLink.domains[idx].linkByTemps[i].isHasTemp = true;
                            for (let j = 0, sLen = subTemps.length; j < sLen; j++) {
                                subTempItem = subTemps[j];
                                this.dyProductLink.domains[idx].linkByTemps[i].subTemps.push({
                                    id: subTempItem.id,
                                    text: subTempItem.text,
                                    name: subTempItem.name
                                });
                            }
                        }
                    }
                }

            });
        },
        // save link info
        saveProductLinkInfo() {
            let tempDomains = this.dyProductLink.domains,
                tempLinks = [],
                tempLinkItem = {

                },
                tempItem = {},
                len = tempDomains.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    tempItem = tempDomains[i];
                    tempLinkItem = {
                        "linkId": tempItem.linkId,
                        "linkName": tempItem.linkName,
                        "days": tempItem.days,
                        "hours": tempItem.hours,
                        "liablePerson": tempItem.liablePerson,
                        "beizhu": tempItem.desc,
                        "linkTempleId": tempItem.linkTempleId
                    }
                    tempLinks.push(tempLinkItem);
                }
            }
            let tempLinksToStr = JSON.stringify(tempLinks);
            let tempKua = this.form.address.join(',');
            let opts = {
                name: this.form.name,
                address: tempKua,
                germinate: this.form.germinate,
                transplant: this.form.transplant,
                weight: this.form.weight,
                pluck: this.form.pluck,
                links: tempLinksToStr
            }
            fetchSaveProductLink(this.$store, opts).then(() => {
                let tempData = this.$store.getters.getSaveProLink;
                if (tempData.resultCode === '1') {
                    this._showMessage('success', '保存成功！');
                } else {
                    this._showMessage('error', tempData.resultMsg);
                }
            })
            this.dialogFormVisible = false;
        },
        // filter product link
        filterProductInfo() {
            let tempArr = this.productInfo.split(':');
            this.getProducts.productId = tempArr[0];
            this.getProducts.productName = tempArr[1];
        },
        // filter product link Fetch
        filterProducts() {
            fetchGetProducts(this.$store, this.getProducts).then(() => {
                this.dec_data();
            });
        },
        // chnage kuaidial
        handleKuaidialChange(value) {
            console.log(value.join(','));
        },
        // dec kuaidial data
        dec_kuaidialDatas() {
            let tempObj = this.$store.getters.getKuaidialInfos;
            if (tempObj.resultCode === '1') {
                let tempDatas = tempObj.resultObj;
                let len = tempDatas.length;
                let tempItem = {};
                let tempKua = {
                    value: '',
                    id: '',
                    label: '',
                    children: []
                }
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        tempItem = tempDatas[i];
                        tempKua = {
                            value: tempItem.id + '-' + tempItem.names,
                            label: tempItem.names,
                            id: tempItem.id
                        }

                        this.options.push(tempKua);
                        if (tempItem.isSub) {
                            this.options[i].children = []; // two level
                            let tempSItem = {};
                            for (let j = 0, sLen = tempItem.subItem.length; j < sLen; j++) {
                                tempSItem = tempItem.subItem[j];
                                tempKua = {
                                    value: tempSItem.id + '-' + tempSItem.names,
                                    label: tempSItem.names,
                                    id: tempSItem.id
                                }
                                this.options[i].children.push(tempKua);
                                if (tempSItem.isSub) {
                                    this.options[i].children[j].children = []; // three level
                                    let tempSSItem = {};
                                    for (let h = 0, ssLen = tempSItem.subItem.length; h < ssLen; h++) {
                                        tempSSItem = tempSItem.subItem[h];
                                        tempKua = {
                                            value: tempSSItem.id + '-' + tempSSItem.names,
                                            label: tempSSItem.names,
                                            id: tempSSItem.id
                                        }
                                        this.options[i].children[j].children.push(tempKua);
                                        if (tempSSItem.isSub) {
                                            this.options[i].children[j].children[h].children = []; // four level
                                            let tempSSSItem = {};
                                            for (let k = 0, ssLen = tempSSItem.subItem.length; k < ssLen; k++) {
                                                tempSSSItem = tempSSItem.subItem[k];
                                                tempKua = {
                                                    value: tempSSSItem.id + '-' + tempSSSItem.names,
                                                    label: tempSSSItem.names,
                                                    id: tempSSSItem.id
                                                }
                                                this.options[i].children[j].children[h].children.push(tempKua);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
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
<style lang="scss">
.info-box,
.info-table {
    background-color: #fff;
}

.select-info-box {
    text-align: left;
}

.add-product-info {
    background-color: #ffdf7d;
    color: #fff;
}

.del-product-info {
    background-color: #bbbbbb;
    color: #fff;
}

.line {
    border-bottom: 1px solid #ccc;
}

.product-link-btn {
    color: #02bdad;
    border: 1px solid #02bdad;
    width: 238px;
    margin-bottom: 25px;
}

.product-dialog-box{
    .el-dialog--small {
        width: 885px;
    }
    .product-form {
        .el-form-item {
            width: 400px;
            text-align: left;
            .el-form-item__content,
            .el-select {
                width: 250px;
            }
        }
    }

    .el-dialog__header {
        padding: 0;
        border-bottom: 1px solid #cccccc;
        .el-dialog__title {
            width: 80%;
            height: 35px;
            line-height: 35px;
            display: inline-block;
            border-left: 6px solid #02bdad;
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: left;
            text-indent: 20px;
            float: left;
        }
        .el-dialog__headerbtn {
            margin-top: 20px;
            margin-right: 20px;
            border-radius: 50%;
            border: 1px solid #404040;
            width: 20px;
            height: 20px;
            i {
                color: #404040;
                font-size: 12px;
            }
        }
    }
    .el-dialog__body {
        max-height: 530px;
        overflow-y: auto;
    }
    .el-textarea__inner {
        width: 800px;
        margin: 0px auto;
    }
    .temp-items-box {
        width: 780px;
        margin: 0px auto;
        border: 1px solid #ccc;
        background-color: #ddd;
        padding-left: 20px;
        padding-bottom: 15px;
        margin-top: 10px;
    }
    .product-link-box {
        text-align: left;
        padding-top: 20px;
        margin-bottom: 20px;
        border-top: 1px solid #ccc;
    }
    .link-name {
        //width: 165px !important;
    }
    .link-name2 {
        width: 80px;
    }
    .link-date,
    .link-time {
        width: 50px;
    }
    .el-dialog__footer {
        border-top: 1px solid #ccc;
        box-shadow: 0px 0px 6px 0px #ccc;
    }
    .dialog-footer-box {
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;

        .el-button {
            width: 160px;
            height: 38px;
            color: #fff;
            font-size: 15px;
        }
        .save-btn {
            background: #02bdad;
        }
        .cancle-btn {
            background: #bbbbbb;
        }
    }
}

.page-box {
    text-align: right;
    margin-top: 20px;
}
</style>
