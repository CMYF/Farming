<template >
    <el-row class="info-box">
    	<el-col  class="product-box">
            <el-form :inline="true" :model="page" class="screen-form">
                <el-form-item>
                    <el-input v-model="page.page_pici" placeholder="请输入批次号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="page.page_proName" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="page.page_proName" placeholder="请选择生产环节">
                        <el-option v-for="(opt, index) in this.taskStates" :key="index" :label="opt.label" :value="opt.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="screen-btn" @click="selectPiCi($event)">筛选</el-button>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button class="screen-btn" @click="sendplan($event)"  v-bind:disabled="isTrue" >派发</el-button>
                </el-form-item>
            </el-form>
            <div class="product-tab-box">
                <el-table ref="singleTable" border :data="tableData"  highlight-current-row @current-change="showSend" style="width: 100%" >
                	
                    <el-table-column type="index" label="序号" width="70">
                    </el-table-column>
                    <el-table-column property="picibianhName" label="计划名称" width="160" className="plan-name-td">
                    </el-table-column>
                    <el-table-column property="picibianh"  label="批次编号" width="153">
                    </el-table-column>
                    <el-table-column property="productName" label="产品名称" width="150">
                    </el-table-column>
                    <el-table-column property="linkIdName"  label="生产环节" width="150" >
                    </el-table-column>
                    <el-table-column property="planstartdatetime" label="计划开始时间" width="180">
                    </el-table-column>
                    <el-table-column property="planenddatetime" label="计划结束时间" width="180">
                    </el-table-column>
                    <el-table-column property="createtime" label="任务新建时间" width="180">
                    </el-table-column>
                    <el-table-column property="creator" label="新建者" width="120">
                    </el-table-column>
                    <el-table-column property="statusName" label="任务状态" width="120">
                    </el-table-column>
                </el-table>
                <el-pagination class="page-box" :total="pageTotle" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.page_number" :page-sizes="[1,2,3,10]" :page-size="page.page_size" layout="total, sizes, prev, pager, next, jumper" >
                </el-pagination>
            </div>
        </el-col>
        
        
        <el-dialog class="dialog-box1"   title="派发任务" :visible.sync="isShowPlanDailog1">
        	<el-form :model="planForm" :inline="true"  ref="planForm" class="plan-form">
                <el-form-item label="生产环节">
				     <el-select v-model="planForm.task_linkIds" placeholder="请选择" @change="selectChange($event)">
					    <el-option
					      v-for="item in options"
					      :key="item.linkId"
					      :label="item.linkName"
					      :value="item.linkId">
					    </el-option>
					  </el-select>
				</el-form-item>
				<el-form-item :inline="true" label="此环节对接人"  class="colperson">
					<el-col :span="10">
				    	<el-input v-model.trim="task_abutmentOne"></el-input>
				   </el-col>
				   <el-col :span="10" :offset="1">
				     <el-input v-model.trim="task_abutmentTwo"></el-input>
				    </el-col>
				</el-form-item>
				<el-form-item label="筛选资源" v-if="zyDisable">
					  <el-checkbox-group  v-model="checkedCities1">
					    <el-checkbox v-for="ziyuan in ziyuanId"  :label="ziyuan.id" :key="ziyuan.id"    @change="selets(ziyuan.id,ziyuan.names,$event)">{{ziyuan.names}}</el-checkbox>
					  </el-checkbox-group>
				</el-form-item>
				<el-form-item label="预估工时" >
				    <el-input v-model="planForm.task_hourTime"></el-input>
				</el-form-item>
				
            </el-form>
        	<el-row class="TaskBtn">
        		<el-col :span="6" :offset="4">
				    <el-button type="success" :disabled="flag" @click="sendTaskComplete($event)">确定</el-button>
			    </el-col>
			    <el-col :span="6" :offset="4">
			    	<el-button class="BtnCancel"  @click="isShowPlanDailog1 = false">取消</el-button>
			    </el-col>
        	</el-row>
        </el-dialog>
        
        
    </el-row>
</template>
<script>
import _j from 'jquery'
import { mapGetters } from 'vuex'
import store from './../store/index'
function fetchTask(store, opt) {
    return store.dispatch('TASKLIST', {
       num: opt.page_number,
       size: opt.page_size,
       states: opt.taskStates,
       pici: opt.page_pici,
       operater: opt.page_operater,
       proName: opt.page_proName
    });
}

function fetchSendTask(store, opt) {
    return store.dispatch('SENDTASKLIST', {
       picNum: opt.task_number,
       sorts: opt.task_sorts,
       linkIds: opt.task_linkIds,
       linkIdNames: opt.task_linkIdNames,
       hourTime: opt.task_hourTime,
       abutments: opt.task_abutments,
       resoureinfos: opt.task_resoureinfos
    });
}

function fetchTaskCircle(store, opt) {
    return store.dispatch('TASKCIRCLE', {
       pcbh: opt.circles_num
    });
}

function fetchTaskZiyuan(store, opt) {
    return store.dispatch('TASKZIYUAN', {
      	zyType: opt.AllzyType,
        zyName: opt.AllzyName,
        zyStatus: opt.AllzyStatus,
        zyPiCiBianH: opt.AllzyPiCi,
		zyPage: opt.AllzyPage,
		zyPageSize: opt.AllzyPageSize
    })
}



export default {
	store,
    data() {
        return {
        	pageTotle: 1,
        	flag: false,
        	checkedCities1: [],
        	ziyuanId:[],
        	ziyuanAll:[],
        	options:[],
        	circleNames: '',
        	task_abutmentOne:'',
        	task_abutmentTwo:'',
        	value: '',
        	zyDisable: true,
        	circles: {
        		circles_num:''
        	},
        	page:{
        		page_number: 1,
                page_size: '',
                taskStates:10,
                page_pici: '',
                page_operater: '',
                page_proName: ''
        	},
        	
        	ruleForm: {
	          name: '',
	          joinPerson: '',
	          time:'',
	          delivery: false,
	          type: [],
	          resource: '',
	          desc: ''
	        },
	        
	        ziYuanDate:{
		        AllzyType: '',
		        AllzyName: '',
		        AllzyStatus: 0,
		        AllzyPiCi: '',
				AllzyPage: '',
				AllzyPageSize: ''
	        },
	        piciNum: {
	        	num:'',
	        	name:'',
	        	circle:''
	        },
            
            planForm: {
                task_number:'',
                task_sorts: '',
                task_linkIds: '',
                task_linkIdNames: '',
                task_hourTime: '',
                task_abutments: '',
                task_resoureinfos: []
            },
            isDisabled: true,
            formLabelWidth: '120px',
            currentPage4: 1,
            isShowPlanDailog1: false,
            taskStates: [
                {
                    label: '处理中',
                    value: 1
                },
                {
                    label: '已完成',
                    value: 2
                },
                {
                    label: '已派发',
                    value: 3
                }
            ],
            tableData: [],
            isTrue: true
        }
    },
    computed: mapGetters({
        taskListData: 'TaskListData'
    }), 
    beforeMount() {
    		fetchTask(this.$store, this.page).then(() => {
	           this.lgd = this.$store.getters.TaskListData.resultData;
	           if (this.lgd.resultCode === '1') {
	              this.pageTotle = this.lgd.basePageObj.dataList.length;
	              console.log(this.pageTotle)
	           	}else{
	           		this.titleNotice=this.lgd.resultMsg;
	           	}
	        });
   			this.page.page_size = 10;
    		fetchTask(this.$store, this.page).then(() => {
	           this.lgd = this.$store.getters.TaskListData.resultData;
	           if (this.lgd.resultCode === '1') {
	              this.tableData = this.lgd.basePageObj.dataList;
	           	}else{
	           		this.titleNotice=this.lgd.resultMsg;
	           	}
	        });
    	
    	
    },
    methods: {
    	sendTaskComplete(e){
            this.planForm.task_linkIdNames = this.circleNames;
            this.planForm.task_resoureinfos = this.ziyuanAll.join("/");
            if(this.task_abutmentOne != ''){
            	this.planForm.task_abutments.push(this.task_abutmentOne);
            }
            if(this.task_abutmentTwo != ''){
            	 this.planForm.task_abutments.push(this.task_abutmentTwo);
            }
            
            if( this.task_abutmentTwo == '' && this.task_abutmentOne == ''){
            	alert("请输入对接人")
            	return;
            }
            console.log(this.value)
            this.flag = true;
            this.planForm.task_abutments=this.planForm.task_abutments.join("/");
            console.log("33333333333333333")
            console.log(this.planForm)
	  		fetchSendTask(this.$store, this.planForm).then(() => {
	           this.sem = this.$store.getters.TaskCircleData.resultData;
	           if (this.sem.resultCode === '1') {
					this.flag = false;
	            	this.isShowPlanDailog1 = false;
	           }else{	           		
	           		this.titleNotice=this.sem.resultMsg;
                    this.flag = false;		
	           	}
	        });
	    },
    	
    	selectPiCi(e){
    		fetchTask(this.$store, this.page).then(() => {
           this.lgd = this.$store.getters.TaskListData.resultData;
           if (this.lgd.resultCode === '1') {
              this.tableData = this.lgd.basePageObj.dataList;
           	}else{
           		this.titleNotice=this.lgd.resultMsg;
           	}
        });
    	},
    	
    	
    	selectChange(e){
    		this.checkedCities1=[];
    		this.task_abutmentOne = '';
        	this.task_abutmentTwo = '';
    		this.planForm.task_hourTime = '';
    		this.planForm.task_linkIds  = e;
      		console.log(this.options)
    		this.options.forEach((items) =>{
    			if(e == items.linkId ){
    				this.circleNames=items.linkName;
    			}
    		})
    		if(e == 'T001'){
    			this.zyDisable = false;
    			this.planForm.task_resoureinfos = [] ;
    			this.ziyuanAll =[];
    			console.log(this.planForm.task_resoureinfos)
    		}else{
    			this.zyDisable = true;
	    		this.ziYuanDate.AllzyType = this.planForm.task_linkIds;
	    		fetchTaskZiyuan(this.$store, this.ziYuanDate).then(() => {
		           this.allzy = this.$store.getters.TaskZiyuanData.resultData;
		           if (this.allzy.resultCode === '1') {
		           //	let $this =this;
		           this.ziyuanId=[];
		           this.allzy.basePageObj.dataList.forEach((value) => {
					    this.ziyuanId.push({id:value.id,names:value.names})
					})
					console.log(this.ziyuanId)    
		           	}else{
		           		this.titleNotice=this.allzy.resultMsg;
		           	}
		        });
    		}
    	},
    	
    	selets(ids,names,e){
    		if(e.target.checked == true){
    			this.ziyuanAll.push(ids)
    		}else{
    			this.ziyuanAll.forEach((item,index)=>{
    				if(item == ids){
	    				this.ziyuanAll.splice(index,1)
	    				console.log(this.ziyuanAll)
    				}
    			})
    			
    			
    		}
    		
    	},
    	
    	
        screenProduct() {

        },
        handleSizeChange(val) {
        	console.log(val)
        	this.page.page_size = parseInt(val);
            console.log(`每页 ${val} 条`);
            console.log("22222222222")
            console.log(this.page);
            fetchTask(this.$store, this.page).then(() => {
	           this.lgd = this.$store.getters.TaskListData.resultData;
	           if (this.lgd.resultCode === '1') {
	              this.tableData = this.lgd.basePageObj.dataList;
	           	}else{
	           		this.titleNotice=this.lgd.resultMsg;
	           	}
	        });
            
        },
        handleCurrentChange(val) {
        	console.log(val)
        	this.page.page_number = val;
            console.log(`当前页: ${val}`);
            console.log(this.page)
            fetchTask(this.$store, this.page).then(() => {
	           this.lgd = this.$store.getters.TaskListData.resultData;
	           if (this.lgd.resultCode === '1') {
	              this.tableData = this.lgd.basePageObj.dataList;
	           	}else{
	           		this.titleNotice=this.lgd.resultMsg;
	           	}
	        });
        },
        sendplan(e){
        	this.flag = false;
        	this.circles.circles_num =  this.planForm.task_number;
        	this.isShowPlanDailog1 = true;
        	console.log(this.options)// 1
        	this.task_abutmentOne = '';
        	this.task_abutmentTwo = '';
        	this.planForm.task_linkIdNames = '';
        	this.planForm.task_abutments =[];
    		this.planForm.task_hourTime = '';
    		this.ziyuanAll = [];
    		this.circleNames = '';
        	fetchTaskCircle(this.$store, this.circles).then(() => {
	           this.pcm = this.$store.getters.TaskCircleData.resultData;
	           if (this.pcm.resultCode === '1') {
	           	this.options = [];
	           	this.value = '';
	           	this.ziyuanId=[];
	           	this.pcm.resultObj.queryDistributeTaskLinks.forEach((value) => {
				    if(value.status == "1"){
				    	console.log(value)
				    	this.options.push(value);
				    }
			  
				})
	           	}else{
	           		//this.titleNotice=this.pcm.resultMsg;
	           	}
	        });
        	
        	
        	
        },
       
        showSend(row, column, cell, event){
        	if(row != null && row != ''){
        		console.log("555555555555555")
	        	console.log(row)
	            let dom = _j(cell);
	            this.planForm.task_linkIds = '';
	        	this.planForm.task_linkIdNames = '';
	            this.planForm.task_number = row.picibianh;
	            this.planForm.task_sorts = row.sort;
	            this.ziYuanDate.AllzyPiCi = 'HY20171023111440';
				this.isTrue =false;
	        }else{
	        	this.isTrue =true;
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

.plan-name-td {
    cursor: pointer;
}

.plan-name-active {
    color: #02bdad;
}


.plan-name-td:hover {
    color: #02bdad;
}

.plan-send-td {
    cursor: pointer;
}

.plan-send-active {
    color: #02bdad;
}


.plan-send-td:hover {
    color: #02bdad;
}


.dialog-box {
    .el-dialog--small {
        width: 885px;
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

.dialog-box1 {
    .el-dialog--small {
        width: 485px;
    }
    .plan-form {
        .el-form-item {
            width: 400px;
            text-align: left;
            .el-form-item__content,
            .el-select {
                width: 280px;
            }
        }
    }
    
    .TaskBtn{
    	.el-button{
    		width: 100%;
    	}
    	.BtnCancel{
    		background-color: #BBBBBB;
    		color: #FFFFFF;
    	}
    }
    
    .el-form-item__label:before{
    	content: '*';
	    color: #ff4949;
	    margin-right: 4px;
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
