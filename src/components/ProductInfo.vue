<template >
    <el-row class="info-box">
        <el-col :span="5" class="select-info-box">
            <el-select v-model="productInfo" @change="filterProductInfo" filterable placeholder="请选择">
                <el-option v-for="item in productNameIds" :key="item.value" :label="item.label" :value="item.id + ':' + item.value">
                </el-option>
            </el-select>
            <el-button type="success" @click="filterProducts">筛选</el-button>
        </el-col>
        <el-col :span="15">
            <div style="height:60px;"></div>
        </el-col>
        <el-col :span="3">
            <el-button class="add-product-info" @click="addProductInfo">
                <span class="iconfont">&#xe622;</span>新增
            </el-button>
            <el-button class="del-product-info">
                <span class="iconfont">&#xe7d3;</span> 删除
            </el-button>
        </el-col>
        <el-table class="info-table" ref="multipleTable" :data="productInfos" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column type="index" label="序号" width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="产品名称" prop="name" align="center" width="200">
            </el-table-column>
            <el-table-column prop="address" label="归属地" align="center" width="399">
            </el-table-column>
            <el-table-column prop="productionLink" label="生产环节(个)" width="165" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pluck" label="采收周期(天)" align="center" width="165" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="germinate" label="发芽率%" align="center" width="165" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="transplant" label="移栽成苗率%" align="center" width="165" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="weight" label="单棵重g" align="center" width="165" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-row class="page-box">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </el-row>
        <el-dialog class="dialog-box" title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form" :inline="true" ref="form" :rules="rules" class="product-form">
                <el-form-item label="产品名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" auto-complete="off" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item label="归属地" :label-width="formLabelWidth" prop="address">
                    <!--<el-select v-model="form.address" placeholder="请选择活动区域">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>-->
                    <el-cascader :options="options" v-model="selectedOptions" @change="handleKuaidialChange"></el-cascader>
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
                    <el-form-item label="生产环节名称" :label-width="formLabelWidth">
                        <el-select v-model="domain.name" class="link-name" placeholder="请选择环节名称">
                            <el-option label="苗期管理" value="1"></el-option>
                            <el-option label="植保" value="2"></el-option>
                            <el-option label="定植后管理" value="3"></el-option>
                        </el-select>
                        <el-input style="display:none;" placeholder="请输入" v-model="domain.name_desc" class="link-name2"></el-input>
                    </el-form-item>
                    <el-form-item label="生产环节周期提醒" :label-width="formLabelWidth2">
                        <el-input class="link-date" v-model="domain.day"></el-input> 天
                        <el-input class="link-time" v-model="domain.hour"></el-input> 小时
                    </el-form-item>
                    <el-form-item label="安全间隔期提醒" v-show="isShowPeriod" :label-width="formLabelWidth2">
                        <el-input class="link-date" v-model="domain.day"></el-input> 天
                    </el-form-item>
                    <el-form-item label="此环节责任人" :label-width="formLabelWidth">
                        <el-select v-model="domain.leadingPeaplo" placeholder="请选择">
                            <el-option v-for="item in productInfo" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-input type="textarea" v-model="domain.desc" :rows="4" placeholder="请输入内容"></el-input>
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
import store from './../store/index'
import _j from 'jquery'
export default {
    name: 'ProductInfo',
    store,
    data() {
        return {
            productNameIds: [],
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            productInfo: '',
            vaule9: '',
            selectedOptions: [],
            options: [
                {
                    value: 'zhinan',
                    label: '指南',
                    children: [
                        {
                            value: 'zhinan',
                            label: '指南',
                            children: [
                                {
                                    value: 'zhinan',
                                    label: '指南',
                                    children: [
                                        {
                                            value: 'zhinan',
                                            label: '指南'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            vaule10: '',
            getProducts: {
                currentPage: 1,
                pageSize: 12,
                productName: '',
                productId: ''
            },
            isShowPeriod: false,
            productInfos: [],
            multipleSelection: [],
            form: {
                name: '',
                address: '',
                germinate: '',
                transplant: '',
                weight: '',
                pluck: ''
            },
            dyProductLink: {
                domains: [
                    {
                        value: '',
                        name_desc: '',
                        name: '',
                        day: '',
                        hour: '',
                        leadingPeaplo: '',
                        desc: ''
                    }
                ]
            },
            rules: {
                name: [
                    { required: true, message: '请输入产品名称', trigger: 'blur' }
                ],
                address: [
                   // { required: true, message: '请选择归属地', trigger: 'change' }
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
        fetchGetProducts(this.$store, this.getProducts).then(() => {
            this.dec_data();
        });
        fetchKuaidials(this.$store).then(() => {
            console.log('归属地有吗？');
            console.log(this.$store);
        })
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        dec_data() {
            let tempDatas = this.$store.getters.getProductInfos;
            if (tempDatas.resultCode === '1') {
                let tempItem = {};
                let baseObj = tempDatas.basePageObj;
                let tempInfos = baseObj.dataList;
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
                            pluck: tempItem.caiszq,
                            productionLink: tempItem.linksNum,
                        });
                        this.productNameIds.push({
                            value: tempItem.chanpmc,
                            label: tempItem.chanpmc,
                            id: tempItem.chanpid
                        });
                    }
                }
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        addProductInfo() {
            this.dyProductLink.domains.length = 0;
            this.dialogFormVisible = true;
        },
        addProductLinkInfo(e) {
            let dom = _j(e.currentTarget)
            dom.parent('div.add-product-link').addClass('line');
            this.dyProductLink.domains.push({
                value: '',
                name_desc: '',
                name: '',
                day: '',
                hour: '',
                leadingPeaplo: '',
                desc: ''
            });
        },
        saveProductLinkInfo() {
            console.log(this.dyProductLink.domains);
            this.dialogFormVisible = false;
        },
        filterProductInfo() {
            let tempArr = this.productInfo.split(':');
            this.getProducts.productId = tempArr[0];
            this.getProducts.productName = tempArr[1];
        },
        filterProducts() {
            fetchGetProducts(this.$store, this.getProducts).then(() => {
                this.dec_data();
            });
        },
        handleKuaidialChange(value) {
            console.log(value);
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

.dialog-box {
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
    .product-link-box {
        text-align: left;
        margin-top: 20px;
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
