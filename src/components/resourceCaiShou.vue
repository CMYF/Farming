<template >
    <el-row class="info-box">
    	<el-col  class="product-box">
            <el-form :inline="true" :model="ziYuanDate" class="screen-form">
                <el-form-item>
                   <el-select v-model="value5" clearable  placeholder="选择使用状态"  >
					    <el-option
					      v-for="item in zyState"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
                </el-form-item>
                <el-form-item>
                    <div class="block" >
							  <el-cascader
							  	clearable
							  	placeholder="选择归属地" 
							    expand-trigger="hover"
							    :options="options5"
							    v-model="selectedOptions3"
							    @change="handleCheck">
							  </el-cascader>
							</div>
                </el-form-item>
                <el-form-item>
                    <el-button class="screen-btn" @click="ziYuanCheck">筛选</el-button>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button class="screen-btn" @click="delResource" :disabled = "isTrue"  >删除</el-button>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button class="screen-btn"  @click="ymAdd" >新增</el-button>
                </el-form-item>
                
            </el-form>
            <div class="product-tab-box">
                <el-table ref="singleTable" border :data="tableData"  highlight-current-row style="width: 100%;text-align: center; " @cell-mouse-enter="showCode"  @current-change="danXuanChange" >
                    <el-table-column type="index" label="序号" width="150" style="width: 50">
                    </el-table-column>
                    <el-table-column property="names" label="资源名称" style="width: 100" className="caishou-name-td">
                    	<template scope="scope">
					        <el-popover trigger="hover" placement="right">
					        	<p><img :src="imglink" /></p>
					        	<div slot="reference" class="name-wrapper">
           							 <span>{{ scope.row.names }}</span>
           						</div>	
					        </el-popover>
					     </template>
                    </el-table-column>
                    <el-table-column property="columname" label="归属地"  style="width: 120">
                    </el-table-column>
                    <el-table-column property="code" label="资源编号"  style="width: 120">
                    </el-table-column>
                    <el-table-column property="usetime" label="开始使用时间"  style="width: 200">
                    </el-table-column>
                    <el-table-column property="statusName" label="使用状态"  style="width: 50">
                    </el-table-column>
                </el-table>
                <el-pagination class="page-box" :total="pageTotle" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="ziYuanDate.AllzyPage" :page-sizes="[1,2,3,10]" :page-size="ziYuanDate.AllzyPageSize" layout="total, sizes, prev, pager, next, jumper" >
                </el-pagination>
            </div>
        </el-col>
        <el-dialog class="dialog-box" title="新增资源" :visible.sync="isShowPlanDailog">
		            <el-form :model="ymAddResource" :inline="true" ref="ymAddResource" class="plan-form" >
		                <el-form-item label="资源名称" :label-width="formLabelWidth" prop = "zyNames">
		                    <el-input v-model="ymAddResource.zyNames"   auto-complete="off"></el-input>
		                </el-form-item>
		                <el-form-item label="归属地" :label-width="formLabelWidth" >
		                    <div class="block" >
							  <el-cascader
							    expand-trigger="hover"
							    :options="options5"
							    v-model="selectedOptions2"
							    @change="handleChange">
							  </el-cascader>
							</div>
		                </el-form-item>
		                <el-form-item label="资源类型" :label-width="formLabelWidth">
		                    <el-select v-model="value1"  placeholder="请选择" @change="resourceTpye" >
							    <el-option
							      v-for="item in typeName"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
		                </el-form-item>
		                <el-form-item label="资源编号" :label-width="formLabelWidth" prop = "zyCodes">
		                    <el-input v-model="ymAddResource.zyCodes" :disabled="true"   auto-complete="off"></el-input>
		                </el-form-item>
		                 <el-form-item label="创建时间" :label-width="formLabelWidth" >
		                    <el-input v-model="ymAddResource.zyTimes" :disabled="true"  auto-complete="off"></el-input>
		                </el-form-item>
		              	 
		            </el-form>
		            <el-row class="TaskBtn">
		        		<el-col :span="6" :offset="4" style="margin-top: 20px;">
						    <el-button type="success"  :disabled="flag" @click="sendAddym">确定</el-button>
					    </el-col>
					    <el-col :span="6" :offset="4" style="margin-top: 20px;">
					    	<el-button class="BtnCancel"  @click="cancelDailog">取消</el-button>
					    </el-col>
		        	</el-row>
		        </el-dialog>
    </el-row>
</template>
<script>
import _j from 'jquery'
import { mapGetters } from 'vuex'
import store from './../store/index'
function fetchTaskZiyuan(store, opt) {
    return store.dispatch('TASKZIYUAN', {
      	zyType: opt.AllzyType,
        zyName: opt.AllzyName,
        zyColumid: opt.AllzyColumid,
        zyStatus: opt.AllzyStatus,
		zyPage: opt.AllzyPage,
		zyPageSize: opt.AllzyPageSize
    })
}

function fetchAddResource(store, opt) {
    return store.dispatch('ADDRESOURCE', {
      	zyToken: opt.zyTokens,
        zyColumid: opt.zyColumids,
        zyColumname: opt.zyColumnames,
		zyName: opt.zyNames,		
		zyType:  opt.zyTypes,   
		zyAmount: opt.zyAmounts,	
		zyHoles: opt.zyHoless,	
		zyAreas: opt.zyAreass,	 
		zyTime:	opt.zyTimes,  
		zyDensity: opt.zyDensitys,
		zyCode: opt.zyCodes
    })
}

function fetchOwnLand(store, opt) {
    return store.dispatch('GETOWBLAND', {
      landtToken: opt.tokens
    })
}

function fetchZiYuanNum(store, opt) {
    return store.dispatch('ZIYUANNUM', {
      zyType: opt.zyTypes
    })
}

function fetchDeleteZiYuan(store, opt) {
    return store.dispatch('DELETEZIYUAN', {
      token: opt.tokens,
      ids: opt.id
    })
}

export default {
	store,
    data() {
        return {
        	pageTotle: 1,
        	imglink: '',
        	isTrue: true,
        	flag: false,
        	options5:[],
        	selectedOptions2: [],
        	selectedOptions3: [],
        	ownLandAll:{
	        	tokens: localStorage.token
	        },
	        checkLandId:[],
	        landIds:[],
	        landNames:[],
        	ziYuanDate:{
		        AllzyType: 3,
		        AllzyName: '',
		        AllzyColumid: '',
		        AllzyStatus: '',
				AllzyPage: 1,
				AllzyPageSize: ''
	        },
        	delziyuan:{
        		tokens: '',
        		id: ''
        	},
        	ymAddResource:{
        		zyTokens: '',
		        zyColumids: '',
		        zyColumnames: '',
				zyNames: '',		
				zyTypes: '',   
				zyAmounts: '',	
				zyHoless: '',	
				zyAreass: '',	 
				zyTimes: '', 
				zyDensitys: '',
				zyCodes: ''
        	},
        	
        	page:{
        		page_number: 1,
                page_size: 10,
                taskStates:20
        	},
        	
        	zyNum:{
        		zyTypes: ''
        	},
        	
            screenForm: {
                no: '',
                name: '',
                link: '',
                state: ''
            },
            newResource:{
            	
            },
            value1: '',
            typeName:[
	            {
		        	value: '4',
			        label: '采收框'
			    }
            ],
            isShowPlanDailog :false,
            isDisabled: true,
            formLabelWidth: '120px',
            currentPage4: 4,
            zyState: [              
                {
                    label: '未使用',
                    value: 0
                },
                 {
                    label: '已使用',
                    value: 1
                }
            ],
            value5: '',
            tableData: [],
            currentRow: null
            
        }
    },
    computed: mapGetters({
        taskListData: 'TaskListData'
    }), 
    beforeMount() {
    	fetchTaskZiyuan(this.$store, this.ziYuanDate).then(() => {
           this.allzy = this.$store.getters.TaskZiyuanData.resultData;
           if (this.allzy.resultCode === '1') {
          	 this.pageTotle = this.allzy.basePageObj.dataList.length;
           	}else{
           		//this.titleNotice=this.allzy.resultMsg;
           	}
        }),
        this.ziYuanDate.AllzyPageSize =10;
        fetchTaskZiyuan(this.$store, this.ziYuanDate).then(() => {
           this.allzy = this.$store.getters.TaskZiyuanData.resultData;
           if (this.allzy.resultCode === '1') {
          	this.tableData = this.allzy.basePageObj.dataList;
           	}else{
           		//this.titleNotice=this.allzy.resultMsg;
           	}
        }),
        this.ownLandCheck()
    },
    methods: {
    	
    	showCode(row, column, cell, event){
            let dom = _j(cell);
    		 if (!dom.hasClass('caishou-name-td')) {
                return;
           }
            _j('.caishou-name-td').removeClass('caishou-name-active');
            dom.addClass('caishou-name-active');
            //this.imglink = 'http://'+window.location.host+'/'+row.qrcode
            this.imglink = 'http://10.1.2.151/'+row.qrcode;
            console.log(this.imglink)
            console.log("2222222222")
    	},
    	
    	
    	ziYuanCheck(){
    		this.ziYuanDate.AllzyStatus= this.value5;
    		this.ziYuanDate.AllzyPageSize = '';
    		fetchTaskZiyuan(this.$store, this.ziYuanDate).then(() => {
	           this.allzy = this.$store.getters.TaskZiyuanData.resultData;
	           if (this.allzy.resultCode === '1') {
	           	this.pageTotle = this.allzy.basePageObj.dataList.length;
	          	this.tableData = this.allzy.basePageObj.dataList;
	          	
	           	}else{
	           		this.titleNotice=this.allzy.resultMsg;
	           	}
	        });
    	},
    	
        cancelDailog(){
        	this.isShowPlanDailog = false;
        	this.$refs.ymAddResource.resetFields();
        	this.value1 = '';
        },
    	
    	ymAdd(){
    		var date = new Date();
    		var dd;
			var years = date.getFullYear();
			var month = date.getMonth()+1;
			var dates = date.getDate();
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds(); 
			month = month < 10 ? '0' + month : month;
			dates = dates < 10 ? '0' + dates : dates;
			hours = hours < 10 ? '0' + hours : hours;
			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;
			dd = years+"-"+ month + "-" + dates + " " + hours + ":" + minutes + ":" + seconds;
    		this.ymAddResource.zyTokens = localStorage.token;
    		this.ymAddResource.zyTimes = dd;
    		console.log(this.ymAddResource)
    		this.isShowPlanDailog = true;
    		this.flag = false;
    		this.ymAddResource.zyNames = '';
			this.ymAddResource.zyCodes = '';
    		this.value1 = '';
    		this.selectedOptions2 = [];
    		this.selectedOptions3 = [];
    		this.ziYuanDate.AllzyColumid = '';
	        //this.ownLandCheck()
	       
    	},
    	handleCheck(value){
    		this.checkLandId = [];
    		value.forEach((item) =>{
	        	this.checkLandId.push(item.split("-")[0]);
	        })
    		this.ziYuanDate.AllzyColumid =this.checkLandId[this.checkLandId.length-1];
    		console.log("222222222")
    		console.log(this.ziYuanDate.AllzyColumid)
    	},
    	
    	handleChange(value) {
	        console.log(value);  
	        this.landIds = [];
	        this.landNames =[];
	        value.forEach((item) =>{
	        	this.landIds.push(item.split("-")[0]);
	        	this.landNames.push(item.split("-")[1]);
	        })
	        this.ymAddResource.zyColumids =this.landIds[this.landIds.length-1];
	        this.ymAddResource.zyColumnames =this.landNames.join("-");
	        console.log("444444444444")
	        console.log( this.ymAddResource.zyColumids)
	        console.log(this.ymAddResource.zyColumnames)
	     },
    	
    	ownLandCheck(){
    		fetchOwnLand(this.$store, this.ownLandAll).then(() => {
	           this.land = this.$store.getters.OwnLandData.resultData;
	           if (this.land.resultCode === '1') {
					let datas = this.land.resultObj;
					for(var i = 0; i < datas.length; i++) {
						this.options5[i] = GetCopy(datas[i]);
					}
					console.log(this.options5)
				
					function GetCopy(json) {
						let arr = {};
						arr.value = json.id + '-' + json.names;
						arr.label = json.names
						if(json.subItem.length == 0) {
							return arr;
						} else {
							arr.children = [];
							for(var i = 0; i < json.subItem.length; i++) {
								arr.children.push(GetCopy(json.subItem[i]));
							}
							return arr;
						}
				
					}
				}else {
					console.log(this.land.resultMsg)
				}
			});
			
		},
    	
    	resourceTpye(value1){
    		if(value1){
    			this.zyNum.zyTypes = this.value1;
    		fetchZiYuanNum(this.$store, this.zyNum).then(() => {
	            this.zy = this.$store.getters.ZiYuanNumData.resultData;
	            if (this.zy.resultCode === '1') {
	          	this.ymAddResource.zyCodes = this.zy.resultObj;
	          	console.log("2222222222")
	          	console.log(this.zy)
	           	}else{
	           		//this.titleNotice=this.zy.resultMsg;
	           	}
	        });
    		}
    		
    	},
    	
    	sendAddym(){
    		this.ymAddResource.zyTypes = this.value1;
    		this.flag = true;
    		console.log(this.ymAddResource)
    		fetchAddResource(this.$store, this.ymAddResource).then(() => {
	            this.zy = this.$store.getters.AddResourceData.resultData;
	            if (this.zy.resultCode === '1') {
	          		this.isShowPlanDailog = false;
	          		this.flag = false;
	          		
	          		fetchTaskZiyuan(this.$store, this.ziYuanDate).then(() => {
			           this.allzy = this.$store.getters.TaskZiyuanData.resultData;
			           if (this.allzy.resultCode === '1') {
			          	this.tableData = this.allzy.basePageObj.dataList;
			           	}else{
			           		this.titleNotice=this.allzy.resultMsg;
			           	}
			        });
	          		
	           	}else{
	           		this.flag = false;
	           		//this.titleNotice=this.zy.resultMsg;
	           	}
	        });
    	},
    	
    	
        screenProduct() {
			
        },
        
       
        
        handleSizeChange(val) {
        	console.log(val)
        	this.ziYuanDate.AllzyPageSize = parseInt(val);
            console.log(`每页 ${val} 条`);
            fetchTaskZiyuan(this.$store, this.ziYuanDate).then(() => {
	           this.allzy = this.$store.getters.TaskZiyuanData.resultData;
	           if (this.allzy.resultCode === '1') {
	          	this.tableData = this.allzy.basePageObj.dataList;
	           	}else{
	           		//this.titleNotice=this.allzy.resultMsg;
	           	}
	        })
            
        },
        handleCurrentChange(val) {
        	console.log(val)
        	this.ziYuanDate.AllzyPage = val;
            console.log(`当前页: ${val}`);
            fetchTaskZiyuan(this.$store, this.ziYuanDate).then(() => {
	           this.allzy = this.$store.getters.TaskZiyuanData.resultData;
	           if (this.allzy.resultCode === '1') {
	          	this.tableData = this.allzy.basePageObj.dataList;
	           	}else{
	           		//this.titleNotice=this.allzy.resultMsg;
	           	}
	        })
        },
        
        delResource(){
        	
        	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	this.delziyuan.tokens = localStorage.token;
	        	console.log(this.delziyuan)
	        	 fetchDeleteZiYuan(this.$store, this.delziyuan).then(() => {
		            this.delzy = this.$store.getters.DeleteZiYuanData.resultData;
		            if (this.delzy.resultCode === '1') {
		          		 this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
				         fetchTaskZiyuan(this.$store, this.ziYuanDate).then(() => {
				           this.allzy = this.$store.getters.TaskZiyuanData.resultData;
				           if (this.allzy.resultCode === '1') {
				          	this.tableData = this.allzy.basePageObj.dataList;
				           	}else{
				           		this.titleNotice=this.allzy.resultMsg;
				           	}
				        }); 
				          
				          
		           	}else{
		           		this.$message({
				            type: 'error',
				            message: this.delzy.resultMsg
				          });
		           	}
		        })
	        	
	         
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
        	
        	
        },
        
         danXuanChange(val) {
         	if(val == null){
         		this.isTrue = true;
         		return;
         	}else{
         		this.delziyuan.id = val.id;
		        console.log('22222222222222')
		        console.log(val)
		        this.isTrue = false;
         	}
	        
	        
	      },
	   

        showLinkDetail(e) {
            let dom = _j(e.target);
            let subInfoBoxDom = '';
            let tempDom = '';
            let iconDom = _j('.detail-icon');
            if (dom.hasClass('collapse-ex')) {
                tempDom = dom;
                subInfoBoxDom = tempDom.siblings('.sub-link-info-box');
            } else {
                tempDom = dom.parent('.collapse-ex');
                subInfoBoxDom = tempDom.siblings('.sub-link-info-box');
            }
            if (subInfoBoxDom.hasClass('show')) {
                iconDom.removeClass('detail-icon-show');
                subInfoBoxDom.slideUp('500', function() {
                    subInfoBoxDom.removeClass('show').addClass('hide')
                })
                return;
            }
            iconDom.addClass('detail-icon-show');
            subInfoBoxDom.slideDown('500', function() {
                subInfoBoxDom.removeClass('hide').addClass('show')
            })
        }
    }
}
</script>
<style lang="scss">
.bread-box {
    height: 60px;
    line-height: 60px;
    padding-left: 13.5%;
    font-size: 16px;
    background-color: #fff;
}

.product-box {
    padding-top: 20px;
    margin-top: 10px;
    background-color: #fff;
    text-align: left;
}

.screen-form {
    border-bottom: 1px solid #ccc;
    padding-left: 20px;
}

.product-tab-box {
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    .cell{
    	text-align: center;
    }
}

.screen-btn {
    background-color: #35cabd;
    color: #fff;
    border-color: #35cabd;
    width: 100px;
    font-size: 16px;
    padding: 9px 15px;
}

.page-box {
    margin-top: 20px;
    text-align: right;
}

.caishou-name-td {
    cursor: pointer;
}

.caishou-name-active {
    color: #02bdad;
}

.caishou-name-td:hover {
    color: #02bdad;
}

.dialog-box {
    .el-dialog--small {
        width: 550px;
    }
    .plan-form {
        border-bottom: 1px solid #ccc;
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
    
     .el-form-item__label:before{
    	content: '*';
	    color: #ff4949;
	    margin-right: 4px;
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

.link-info-box {
    margin-top: 20px;
    .info-item {
        // width: 420px;
        position: relative;
        text-align: left;
        margin-bottom: 20px;
        .collapse-ex {
            position: absolute;
            top: 0px;
            cursor: pointer;
            right: 225px;
        }
        .detail-icon {
            display: inline-block;
            transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -webkit-transform: rotate(-90deg);
            -o-transform: rotate(-90deg);
            transition: all .3s;
        }
        .detail-icon-show {
            transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            -moz-transform: rotate(90deg);
            -webkit-transform: rotate(90deg);
            -o-transform: rotate(90deg);
        }
        .sub-link-item {
            margin-top: 15px;
        }
        .link-desc {
            width: 770px;
            margin: 0px auto;
            margin-left: 32px;
            margin-top: 15px;
        }
        .el-form-item__label {
            width: 130px;
        }
    }

    .el-input {
        width: 250px;
    }
}
</style>
