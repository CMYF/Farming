<template >
    <el-row class="pro-box">
        <el-breadcrumb separator="/" class="plan-box">
        	<el-breadcrumb-item>
                <span class="iconfont">&#xe771;</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>计划管理</el-breadcrumb-item>
        	</el-breadcrumb>
        <el-col :span="23" class="pro-content">
        	 
             <el-row class="info-box">
		    	<el-col  class="product-box">
		            <el-form :inline="true" :model="page" class="screen-form">
		                <el-form-item>
		                    <el-input v-model="page.page_pici" placeholder="请输入批次号"></el-input>
		                </el-form-item>
		                <el-form-item>
		                    <el-input v-model="page.page_name" placeholder="请输入产品名称"></el-input>
		                </el-form-item>
		                <el-form-item>
		                   <el-select v-model="value10" clearable  placeholder="选择使用状态"  >
							    <el-option
							      v-for="item in zyState"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
		                </el-form-item>
		                <el-form-item>
		                    <el-button class="screen-btn" @click.stop="screenPlan">筛选</el-button>
		                </el-form-item>
		                <el-form-item style="float: right;">
		                    <el-button class="screen-btn" @click="delPlanList" :disabled="isTrue" >删除</el-button>
		                </el-form-item>
		                <el-form-item style="float: right;">
		                   <el-button class="screen-btn" @click="bulidPlan"  >新建</el-button>
		                </el-form-item>
		            </el-form>
		            
		            
		            
		            <div class="product-tab-box">
		                <el-table ref="singleTable"  border :data="tableData" highlight-current-row  style="width: 100%;text-align: center; " @current-change="planChange"   >
		                	
		                    <el-table-column type="index" label="序号" width="70">
		                    </el-table-column>
		                    <el-table-column property="jihuamc" label="计划名称" width="200" className="plan-name-td">
		                    </el-table-column>
		                    <el-table-column property="picibianh" label="批次编号" width="180">
		                    </el-table-column>
		                    <el-table-column property="chanpinmc" label="产品名称" width="180">
		                    </el-table-column>
		                    <el-table-column property="jihuaksrq" label="计划开始时间" width="190">
		                    </el-table-column>
		                    <el-table-column property="jihuajsrq" label="计划结束时间" width="190">
		                    </el-table-column>
		                    <el-table-column property="shijistartdatetime" label="实际开始时间" width="190">
		                    </el-table-column>
		                    <el-table-column property="shijienddatetime" label="实际结束时间" width="190">
		                    </el-table-column>
		                    <el-table-column property="zhixingzt" label="任务状态" width="120">
		                    	<template scope="scope">
		                    		<span v-if="scope.row.status=== 10" style="color: #ff0000">{{ scope.row.zhixingzt }}</span>
			                        <span v-if="scope.row.status=== 20" style="color: #fecb00">{{ scope.row.zhixingzt }}</span>
			                       <span v-if="scope.row.status=== 30" style="color: #00d6c4">{{ scope.row.zhixingzt }}</span>
			                        <span v-if="scope.row.status=== 40" style="color: #82d111">{{ scope.row.zhixingzt }}</span>
			            		 </template>
		                    </el-table-column>
		                </el-table>
		                 <el-pagination class="page-box" :total="pageTotle" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.page_number" :page-sizes="[10,20,30,40,50]" :page-size="page.page_size" layout="sizes, prev, pager, next" >
                		</el-pagination>
		            </div>
		        </el-col>
		        <el-dialog class="dialog-box" title="新增计划" :visible.sync="isShowPlanDailog" @close="closeDialog">
		            <el-form :model="newPlan" :inline="true" :rules="rules" ref="newPlan" class="plan-form">
		                <el-form-item label="计划名称" :label-width="formLabelWidth" prop="Names">
		                    <el-input v-model="newPlan.Names" :maxlength="35"  auto-complete="off"></el-input>
		                </el-form-item>
		                <el-form-item label="归属地" :label-width="formLabelWidth" prop="LandId">
		                    <div class="block" >
							  <el-cascader
							    expand-trigger="hover"
							    :options="options5"
							    v-model="selectedOptions2"
							    @change="handleChange">
							  </el-cascader>
							</div>
		                </el-form-item>
		
		                </el-form-item>
		                
		                <el-form-item label="产品名称" :label-width="formLabelWidth" prop="ProductName">
		                    <el-select v-model="newPlan.ProductName" filterable placeholder="请选择" @change="getProductID">
							    <el-option
							      v-for="item in productNames"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
		                </el-form-item>
		                <el-form-item label="开始日期" :label-width="formLabelWidth" prop="StartTime" class="startDates">
		                    <div class="block">
							    <el-date-picker
							      v-model="newPlan.StartTime"
							      type="datetime"
							      @change="getTimeOne"
							      placeholder="选择日期时间">
							    </el-date-picker>
							</div>
							<div class='el-form-item__error error1'>开始日期为空</div>
							<div class='el-form-item__error error2'>开始日期大于结束时间</div>
		                </el-form-item>
		                <el-form-item label="结束日期" :label-width="formLabelWidth" prop="EndTime" class="endDates">
		                   <div class="block">
						    <el-date-picker
						      v-model="newPlan.EndTime"
						      @change="getTimeTwo"
						      type="datetime"
						      placeholder="选择日期时间">
						    </el-date-picker>
						  </div>
						  <div class='el-form-item__error error3'>结束日期为空</div>
						  <div class='el-form-item__error error4'>结束日期小于开始时间</div>
		                </el-form-item>
		                <el-form-item label="目标采收量" :label-width="formLabelWidth" prop="Target">
		                    <el-input  v-model.number="newPlan.Target"  :maxlength="7" auto-complete="off" ></el-input>
		                </el-form-item>
		                <el-form-item label="选择育苗床" :label-width="formLabelWidth"  class="ymBed">
		                    <el-input v-model= "zyArrays" :disabled="isFlag"  @focus="zyData($event)"  auto-complete="off"></el-input>
		                </el-form-item>
		                <el-form-item label="定植数" :label-width="formLabelWidth" prop="DingZhi" >
		                    <el-input v-model.number="newPlan.DingZhi" :maxlength="7"  auto-complete="off"></el-input>
		                </el-form-item>
		                <el-form-item label="育苗盘数" :label-width="formLabelWidth" prop="YuMiaoNum" >
		                    <el-input v-model.number="newPlan.YuMiaoNum" :maxlength="7"  auto-complete="off"></el-input>
		                </el-form-item>
		                 <el-form-item label="" :label-width="formLabelWidth" >
		                   
		                </el-form-item>
		            </el-form>
		            <el-row class="TaskBtn">
		        		<el-col :span="6" :offset="4">
						    <el-button type="success" @click="sendPlanComfire" :disabled="flag" >确定</el-button>
					    </el-col>
					    <el-col :span="6" :offset="4">
					    	<el-button class="BtnCancel"  @click="cancelPlans">取消</el-button>
					    </el-col>
		        	</el-row>
		        </el-dialog>
		        
		        
		        <el-dialog class="ymdialog" title="选择育苗床" :visible.sync="dialogFormVisible">
				  <el-checkbox-group  v-model="checkedCities1">
				    <el-checkbox v-for="ziyuan in ziyuanId"  :label="ziyuan.id" :key="ziyuan.id"    @change="selets(ziyuan.id,ziyuan.names,$event)">{{ziyuan.names}}</el-checkbox>
				  </el-checkbox-group>
				  
				    <el-button class="primarys" type="primary" @click="dialogFormVisible = false">确 定</el-button>
				</el-dialog>
		        
		    </el-row>
        </el-col>
    </el-row>
</template>
<script>
import _j from 'jquery'
import { mapGetters } from 'vuex'
import store from './../store/index'	
	
function fetchPlanList(store, opt) {
    return store.dispatch('GETPLAN', {
       jhPageNum: opt.page_number,
       jhPageSize: opt.page_size,
       jhPiCi: opt.page_pici,
       jhName: opt.page_name,
       jhStatus: opt.page_status
    });
}

function fetchPlanNew(store, opt) {
    return store.dispatch('GETPLANNEW', {
        jhNames: opt.Names,
        jhLandId: opt.LandId,
        jhLandName: opt.LandName,
		jhProductId: opt.ProductId,
		jhProductName: opt.ProductName,
		jhTarget: opt.Target,
		jhBed: opt.Bed,
		jhDingZhi: opt.DingZhi,
		jhYuMiaoNum: opt.YuMiaoNum,
		jhStartTime: opt.StartTime,
		jhEndTime: opt.EndTime
    });
}


function fetchProductList(store, opt) {
    return store.dispatch('PRODUCTLIST', {
       cpPageNum: opt.products_number,
       cpPageSize: opt.products_size,
       cpName: opt.products_name,
       cpId: opt.products_id
    });
}

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

function fetchOwnLand(store, opt) {
    return store.dispatch('GETOWBLAND', {
      landtToken: opt.tokens
    })
}

function fetchDelPlan(store, opt) {
    return store.dispatch('DELPLAN', {
      	picis:opt.del_pici
    })
}


export default {
	store,
    data() {
        return {
        	pageTotle: 1,
        	isFlag: true,
        	flag: false,
        	isTrue: true,
        	options5:[],
        	
        	zyState: [              
                  {
                    label: '待派发',
                    value: 10
                },
                {
                    label: '已派发',
                    value: 20
                },
                {
                    label: '处理中',
                    value: 30
                },
                {
                    label: '已处理',
                    value: 40
                }
            ],
        	
        	selectedOptions2: [],
        	
        	rules: {
	          Names: [
	            { required: true, message: '请输入计划名称', trigger: 'blur' },
	            { min: 3, max: 35, message: '长度在 3 到 35 个字符', trigger: 'blur' }
	          ],
	          LandId: [
	            { required: true, message: '请选择活动区域', trigger: 'change' }
	          ],
	          ProductName: [
	            { required: true, message: '请产品名称', trigger: 'change' }
	          ],
			
	          Target: [
	           { required: true, message: '请输入目标采收量' },
	           { type: 'number', message: '必须为数字值'}
	          ],
	        
	          DingZhi: [
	            { required: true, message: '请输入定植数'},
	            { type: 'number', message: '必须为数字值'}
	          ],
			  YuMiaoNum: [
	            { required: true, message: '请输入育苗盘数'},
	            { type: 'number', message: '必须为数字值'}
	          ]
	        },
        	
        	
        	newPlan:{
        		Names: '',
        		LandId: '',
        		LandName: '',
        		ProductId: '',
        		ProductName: '',
        		Target: '',
        		Bed: '',
        		DingZhi: '',
        		YuMiaoNum: '',
        		StartTime: '',
        		EndTime: ''
        	},
        	
        	delplans:{
        		del_pici: ''
        	},
        	value10: '',
        	page:{
        		page_number: 1,
                page_size: 10,
                page_pici: '',
                page_name: '',
                page_status: ''
        	},
			value: '',
			options:[],
			products:{
				products_number: 1,
				products_size: '',
				products_name: '',
				products_id: ''
			},
			
			productNames:[],
	        value8: '',
		     
		    checkedCities1:[],
		    
        	dialogFormVisible: false,
			
            planForm: {
                no: '',
                name: '',
                link: '',
                state: ''
            },
           
            formLabelWidth: '120px',
            currentPage4: 4,
            isShowPlanDailog: false,
            
            tableData: [],
//          multipleSelection: [],
            ziYuanDate:{
		        AllzyType: 1,
		        AllzyName: '',
		        AllzyStatus: 0,
		        AllzyColumid: '',
				AllzyPage: '',
				AllzyPageSize: ''
	        },
	        
	        ownLandAll:{
	        	tokens: localStorage.token
	        },
	        
	        landIdArray:[],
	        landNameArray:[],
            ziyuanId:[],
            ziyuanAll:[],
            zyArray:[],
            zyArrays: '',
            startTimes: '',
            endTimes: ''
        }
    },
    beforeMount() {
		
		fetchPlanList(this.$store, this.page).then(() => {
           this.jh = this.$store.getters.PlanData.resultData;
           if (this.jh.resultCode === '1') {
           	console.log(this.jh)
              this.tableData = this.jh.basePageObj.dataList;
              this.pageTotle = this.jh.basePageObj.totalRows;
              console.log(this.tableData)
           	}else{
           		//this.titleNotice=this.jh.resultMsg;
           	}
        });

    },
    
    
    
    methods: {
    	closeDialog(){
    		this.$refs.newPlan.resetFields();
    	},
    	cancelPlans(){
    		this.isShowPlanDailog = false;
    		 this.$refs.newPlan.resetFields();
    	},
    	
    	planChange(val) {
    		console.log("66666666666")
    		console.log(val)
	       if(val == null){
         		this.isTrue = true;
         		return;
         	}else{
         		this.delplans.del_pici = val.picibianh;
		        console.log('22222222222222')
		        console.log(val)
		        this.isTrue = false;
         	}
	
	     },
	    	
//	    handleSelectionChange(val) {
//	        this.multipleSelection = val;
//	
//	     },	
	    	
    	delPlanList(){
    		//this.delplans.del_pici = this.multipleSelection[0].picibianh;
    		//console.log(this.multipleSelection[0].picibianh)
    		console.log(this.delplans.del_pici)
    		
    		this.$confirm('此操作将删除该计划, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
    		
    		
	    		fetchDelPlan(this.$store, this.delplans).then(() => {
		           this.jh = this.$store.getters.DelPlanData.resultData;
		           console.log()
		           if (this.jh.resultCode === '1' && this.jh.resultObj.argi_response_code === "1") {
		           		 this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
		           	
			           fetchPlanList(this.$store, this.page).then(() => {
				           this.jh = this.$store.getters.PlanData.resultData;
				           if (this.jh.resultCode === '1') {
				           	console.log(this.jh)
				              this.tableData = this.jh.basePageObj.dataList;
				              this.pageTotle = this.jh.basePageObj.totalRows;
				              console.log(this.tableData)
				           	}else{
				           		
				           	}
				        });
		           	}else{
		           		this.$message({
				            type: 'error',
				            message: '删除失败'
				          });
		           		
		           	}
		        });
	        
	         }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
    	},
    	
    	
//  	delList(){
//  		this.multipleSelection.forEach((item) => {
//	        	this.tableData.forEach((el,index)=>{
//	        		if(el.picibianh == item.picibianh){
//	        			console.log(el.chanpinid)
//	        			console.log(item.chanpinid)
//	        			this.tableData.splice(index,1)
//	        		}
//	        		
//	        	})
//      	})
//  	},
    	
    	getTimeOne(date){
    		if(date != undefined ){
    			this.startTimes = this.newPlan.StartTime.getTime();
	    		console.log(this.startTimes)
	    		_j(".startDates .error1").hide()
		        if(this.endTimes <= this.startTimes && this.endTimes != ''){
    				_j(".startDates .error2").show()
    				_j(".endDates .error4").hide();
    				this.newPlan.StartTime = date;
    			}else{
    				_j(".startDates .error2").hide()
    				_j(".endDates .error4").hide();
    				this.newPlan.StartTime = date;
    			}
		        
		        
    		}else{
    			return;
    		}
    		
       	},
    	
    	getTimeTwo(date){
    		if(date != undefined){
    			
    			this.endTimes = this.newPlan.EndTime.getTime();
	    		console.log(this.endTimes)
	          	_j(".endDates .error3").hide();
	          	if(this.endTimes <= this.startTimes && this.startTimes != ''){
    				_j(".endDates .error4").show();
    				_j(".startDates .error2").hide()
    				this.newPlan.EndTime = date;
    			}else{
    				_j(".endDates .error4").hide();
    				_j(".startDates .error2").hide()
    				this.newPlan.EndTime = date;
    			}
    		}else{
    			return;
    		}
    		
       	},
    	
    	handleChange(value) {
    		this.isFlag = false;
    		this.zyArrays = '';
    		this.ziyuanAll = [];
    		this.zyArray = [];
    		this.checkedCities1 = [];
    		this.landIdArray =  [];
    		this.landNameArray = [];
    		console.log("5555555")
	        console.log(value);  
	        this.newPlan.LandId =  '';
	        this.newPlan.LandName = '';
	        value.forEach((item) =>{
	        	this.landIdArray.push(item.split("-")[0]);
	        	this.landNameArray.push(item.split("-")[1]);
	        })
	        this.newPlan.LandId = this.landIdArray.join("/");
	        this.newPlan.LandName = this.landNameArray.join("/")
	        console.log(this.newPlan.LandId)
	        console.log(this.newPlan.LandName)
	        console.log(this.selectedOptions2)
	     },
    	bulidPlan(){
    		console.log(this.products)
    		this.isShowPlanDailog = true;
    		this.flag = false;
    		this.isFlag = true;
    		this.selectedOptions2 = [];
    		this.checkedCities1 = [];
    		this.landIdArray =  [];
    		this.landNameArray = [];
    		this.newPlan.LandId =  '';
	        this.newPlan.LandName = '';
	        this.productNames = [];
	        this.value8 = '';
	         this.newPlan.ProductId = '';
	         this.zyArrays = '';
	         this.ziyuanAll = [];
	         _j(".startDates .error1").hide();
	         _j(".startDates .error2").hide();
	  		_j(".endDates .error3").hide();
	  		_j(".endDates .error4").hide();
	          _j(".ymBed .el-form-item__content .el-form-item__error").remove();
    		fetchProductList(this.$store, this.products).then(() => {
	           this.cp = this.$store.getters.ProductListData.resultData;
	           if (this.cp.resultCode === '1') {
	           	console.log('``````````````````````')
	           	console.log(this.cp)
	             this.cp.basePageObj.dataList.forEach((item)=>{
	             	this.productNames.push({lable:item.chanpid,value:item.chanpmc})
	             })
	             console.log(this.productNames)
	           	}else{
	           		
	           	}
	        });
	         this.ownLandCheck()
	        
    	},
    	
    	getProductID(value8){
    		 if(value8 != null && value8 != ''){
    		 	let obj = {};
		      console.log(this.productNames)
		      obj = this.productNames.find((item)=>{
		          return item.value === value8;
		      	});
		    	 this.newPlan.ProductId = obj.lable;
		    	 this.newPlan.ProductName = value8;
    		}
		      
    	},
    	
    	zyData(e){
    		let dom = _j(e.currentTarget);
    		dom.blur();
    		this.dialogFormVisible = true;
    		this.ziYuanDate.AllzyColumid =this.landIdArray[this.landIdArray.length-1];
    		fetchTaskZiyuan(this.$store, this.ziYuanDate).then(() => {
	           this.allzy = this.$store.getters.TaskZiyuanData.resultData;
	           if (this.allzy.resultCode === '1') {
	           //	let $this =this;
	           this.ziyuanId=[];
	           this.allzy.basePageObj.dataList.forEach((item) => {
				    this.ziyuanId.push({id:item.id,names:item.names})
				})
				console.log(this.ziyuanId)    
	           	}else{
	           		
	           	}
	        });
	        
	       
    	},
    		
    	selets(ids,names,e){
    		if(e.target.checked == true){
    			this.ziyuanAll.push(ids)
    			this.zyArray.push(names)
    			console.log(this.zyArray)
    			console.log("3333")
    			this.zyArrays = this.zyArray.join(",")
    			this.newPlan.Bed = this.ziyuanAll.join("/")+"/";
    			if(ids != ''){
    				 _j(".ymBed .el-form-item__content .el-form-item__error").remove();
    			}
    		}else{
    			this.ziyuanAll.forEach((item,index)=>{
    				if(item == ids){
	    				this.ziyuanAll.splice(index,1)
	    				this.zyArray.splice(index,1)
    				}
    				
    			})
    			this.zyArrays = this.zyArray.join(",")
  				this.newPlan.Bed = this.ziyuanAll.join("/")+"/";
  				if(this.zyArrays == ''){
  					_j(".ymBed .el-form-item__content").append("<div class='el-form-item__error'>请选择育苗床</div>")
  				}
  				
    			
    			
    		}
    		
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

	sendPlanComfire() {
				if(this.startTimes == "" && this.endTimes == ""){
	  				_j(".startDates .error1").show();
	  				_j(".endDates .error3").show();
	  				return;
	  			}else if(this.startTimes == "" && this.endTimes != ""){
	  				_j(".startDates .error1").show();
	  				return;
	  			}else if(this.startTimes != "" && this.endTimes == ""){
	  				_j(".endDates .error3").show();
	  				return;
	  			}
	  			
	  			if(this.newPlan.Bed == "/" || this.newPlan.Bed == ""){
	  				 _j(".ymBed .el-form-item__content").append("<div class='el-form-item__error'>请选择育苗床</div>");
	  				 return;
	  			}
	  			console.log(this.newPlan)
				 this.$refs.newPlan.validate((valid) => {
		          if (valid) {
		            this.flag = true;
		            
		            fetchPlanNew(this.$store, this.newPlan).then(() => {
			           this.mess = this.$store.getters.NewPlanData.resultData;
			           if (this.mess.resultCode === '1') {
			           		this.flag = false;
							this.isShowPlanDailog = false;
							fetchPlanList(this.$store, this.page).then(() => {
					           this.jh = this.$store.getters.PlanData.resultData;
					           if (this.jh.resultCode === '1') {
					              this.tableData = this.jh.basePageObj.dataList;
								  this.pageTotle = this.jh.basePageObj.totalRows;	
					           	}else{
					           		
					           	}
					        });
							
							
			           	console.log(this.mess)
			           	}else{
			           		this.flag = false;
			           		this.$message.error(this.mess.resultMsg);
			           	}
			        });
		            
		            
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		        
		       
    		
  			
		
	},
    	 
	
	
	
	
    	
    	remoteMethod(query) {
		    if (query !== '') {
		      this.loading = true;
		      setTimeout(() => {
		        this.loading = false;
		        this.options4 = this.list.filter(item => {
		          return item.label.toLowerCase()
		            .indexOf(query.toLowerCase()) > -1;
		        });
		      }, 200);
		    } else {
		      this.options4 = [];
		    }
		},
    	 tableRowClassName(row, index) {
		            //把每一行的索引放进row
		            row.index = index
		  },
    	
    	
        screenPlan() {
        	if(this.value10 != ""){
        		this.page.page_status= this.value10;
        	}else{
        		this.page.page_status = "";
        	}
        	this.page.page_number = 1;
	        fetchPlanList(this.$store, this.page).then(() => {
	           this.jh = this.$store.getters.PlanData.resultData;
	           if (this.jh.resultCode === '1') {
	              this.tableData = this.jh.basePageObj.dataList;
	              this.pageTotle = this.jh.basePageObj.totalRows;
	           	}else{
	           		//this.titleNotice=this.jh.resultMsg;
	           	}
	        });
        },
        handleSizeChange(val) {
        	console.log(val)
        	this.page.page_size = parseInt(val);
            console.log(`每页 ${val} 条`);
            console.log("22222222222")
            console.log(this.page);
            fetchPlanList(this.$store, this.page).then(() => {
	           this.jh = this.$store.getters.PlanData.resultData;
	           if (this.jh.resultCode === '1') {
	           	console.log(this.jh)
	              this.tableData = this.jh.basePageObj.dataList;
	              this.pageTotle = this.jh.basePageObj.totalRows;
	              console.log(this.tableData)
	           	}else{
	           		//this.titleNotice=this.jh.resultMsg;
	           	}
	        });
            
        },
        handleCurrentChange(val) {
        	console.log(val)
        	this.page.page_number = val;
            console.log(`当前页: ${val}`);
            console.log(this.page)
            fetchPlanList(this.$store, this.page).then(() => {
	           this.jh = this.$store.getters.PlanData.resultData;
	           if (this.jh.resultCode === '1') {
	           	console.log(this.jh)
	              this.tableData = this.jh.basePageObj.dataList;
	              this.pageTotle = this.jh.basePageObj.totalRows;
	              console.log(this.tableData)
	           	}else{
	           		this.titleNotice=this.jh.resultMsg;
	           	}
	        });
        },
//     showPlanInfo(row, column, cell, event) {
//          let currRowData = row;
//          let dom = _j(cell);
//          console.log(dom)
//          if (!dom.hasClass('plan-name-td')) {
//              return;
//          }
//          this.isShowPlanDailog = true;
//          _j('.plan-name-td').removeClass('plan-name-active');
//          dom.addClass('plan-name-active');
//      },
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
        }, 
        
    }
   
}
</script>
<style lang="scss">
.plan-box {
    height: 60px;
    line-height: 60px;
    padding-left: 2%;
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
            .error1{
            	display: none;
            }
            .error2{
            	display: none;
            }
            .error3{
            	display: none;
            }
            .error4{
            	display: none;
            }
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
    
    .TaskBtn{
    	margin-top: 20px;
    }
}

.ymdialog{
	
	.primarys{
		float: right;
		margin: 20px 10px;
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
