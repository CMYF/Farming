import Vue from 'vue'
import qs from 'qs'
export function fetchHomePage() {
    return Vue.axios.get('/api/index-all-data')
}

export function fetchGetNav(token) {
    return Vue.axios.post('sys/login/loadMenus.do')
}

export function fetchGetSubNavById(idx) {
    return Vue.axios.post('/api/test-post', { 'id': idx.id })
}

export function fetchLogin(opt) {
    return Vue.axios.post('sys/login/login.do', qs.stringify({
        'id': opt.id,
        'pwd': opt.pwd
    }));
}

export function fetchEditMenu() {
    return Vue.axios.post('sys/menumanagementMenus.do?parentId=-1')
}

export function fetchUpdateMenu(opts) {
    return Vue.axios.post('sys/menumanagementUpdateNode.do', qs.stringify({
        ids: opts.id,
        menuname: opts.name,
        parentids: opts.parentId,
        menuaction: opts.path,
        menusort: opts.sore,
        menudesc: opts.desc,
        menustart: 1,
        menuicon: opts.menuicon
    }));
}
export function fetchAddMenu(opts) {
    return Vue.axios.post('sys/menumanagementNewNode.do', qs.stringify({
        menuname: opts.name,
        parentids: opts.parentId,
        menuaction: opts.path,
        menusort: opts.sore,
        menudesc: opts.desc,
        menustart: 1,
        menuicon: opts.menuicon
    }));
}
export function fetchDeleteMenu(opts) {
    return Vue.axios.post('sys/menumanagementDeleteNode.do', qs.stringify({
        ids: opts.id,
        menuname: opts.name,
        parentids: opts.parentId,
        menuaction: opts.path,
        menusort: opts.sore,
        menudesc: opts.desc
    }));
}

export function fetchAllUsers(opts) {
    return Vue.axios.post('sys/operatorDataGrid.do', qs.stringify({
        beginPage: opts.beginPage,
        pageSize: opts.pageSize,
        _lk_opercode: opts.acc,
        _lk_opername: opts.username
    }));
}
export function fetchUserById(opts) {
    return Vue.axios.post('sys/operatorLookRow.do', qs.stringify({
        ids: opts.id
    }));
}
export function fetchUpateUserById(opts) {
    return Vue.axios.post('sys/operatorUpdateRow.do', qs.stringify({
        opercode: opts.acc,
        opername: opts.username,
        ids: opts.id,
        opergender: opts.gender,
        operphone: opts.telphone,
        consultantno: opts.jobNo,
        operstatus: opts.status,
        roleids: opts.roleIds
    }));
}

export function fetchAllRoles(opts) {
    return Vue.axios.post('sys/rolemanagementDataGrid.do', qs.stringify({
        beginPage: opts.beginPage,
        pageSize: opts.pageSize,
        _lk_rolename: opts.roleName
    }));
}
export function fetchDelByIds(opts) {
    return Vue.axios.post('sys/rolemanagementDeleteRow.do', qs.stringify({
        deleteIds: opts.roleIds
    }));
}

export function fetchAddRole(opts) {
    return Vue.axios.post('sys/rolemanagementInsertRow.do', qs.stringify({
        rolename: opts.name,
        rolestatus: opts.region,
        roledesc: opts.desc,
        menuIds: opts.roleIds
    }));
}

export function fetchGetRoleById(opts) {
    return Vue.axios.post('sys/rolemanagementLookRow.do', qs.stringify({
        ids: opts.id
    }));
}
export function fetchUpdateById(opts) {
    return Vue.axios.post('sys/rolemanagementUpdateRow.do', qs.stringify({
        ids: opts.id,
        rolename: opts.name,
        rolestatus: opts.region,
        roledesc: opts.desc,
        menuIds: opts.roleIds
    }));
}

export function fetchTask(opts) {
    return Vue.axios.post('agriculture/taskInfo/queryTaskInfoLists.do', qs.stringify({
        'queryTaskInfoListsRequest.page_number': opts.num,
        'queryTaskInfoListsRequest.page_size': opts.size,
        'queryTaskInfoListsRequest.taskStatus': opts.states,
        'queryTaskInfoListsRequest.piCiBianH': opts.pici,
        'queryTaskInfoListsRequest.linkOperater': opts.operater,
        'queryTaskInfoListsRequest.productName': opts.proName
        
    }));
}

export function fetchSendTask(opts) {
    return Vue.axios.post('agriculture/taskInfo/distributeTaskInfo.do', qs.stringify({
        'distributeTaskInfoRequest.piCiBianH': opts.picNum,
        'distributeTaskInfoRequest.sort': opts.sorts,
        'distributeTaskInfoRequest.linkId': opts.linkIds,
        'distributeTaskInfoRequest.linkIdName': opts.linkIdNames,
        'distributeTaskInfoRequest.hours': opts.hourTime,
        'distributeTaskInfoRequest.abutment': opts.abutments,
        'distributeTaskInfoRequest.resoureinfo': opts.resoureinfos
    }));
}

export function fetchTaskCircle(opts) {
    return Vue.axios.post('agriculture/taskInfo/queryDistributeTaskLinks.do', qs.stringify({
        'queryDistributeTaskLinksRequest.piCiBianH': opts.pcbh,
    }));
}

export function fetchTaskZiyuan(opts) {
    return Vue.axios.post('agriculture/resource/dataGrid.do', qs.stringify({
        _in_type: opts.zyType,
        _lk_names: opts.zyName,
        columid:opts.zyColumid,
        piCiBianH: opts.zyPiCiBianH,
        status: opts.zyStatus,
		beginPage: opts.zyPage,
		pageSize: opts.zyPageSize
    }));
}

export function fetchPlanList(opts) {
    return Vue.axios.post('agriculture/planInfo/queryPlanInfoList.do', qs.stringify({
       'queryPlanInfoListRequest.page_number': opts.jhPageNum,
       'queryPlanInfoListRequest.page_size': opts.jhPageSize,
       'queryPlanInfoListRequest.picibianh': opts.jhPiCi,
	   'queryPlanInfoListRequest.jihuamc': opts.jhName,
	   'queryPlanInfoListRequest.zhixingzt': opts.jhStatus
    }));
}

export function fetchPlanNew(opts) {
    return Vue.axios.post('agriculture/planInfo/addPlanInfo.do', qs.stringify({
        'addPlanInfoRequest.jihuamc': opts.jhNames,
        'addPlanInfoRequest.guishud': opts.jhLandId,
        'addPlanInfoRequest.guishudName': opts.jhLandName,
		'addPlanInfoRequest.chanpinid': opts.jhProductId,
		'addPlanInfoRequest.chanpinmc': opts.jhProductName,
		'addPlanInfoRequest.mubiaocaijil': opts.jhTarget,
		'addPlanInfoRequest.xuanzeyumiaoc': opts.jhBed,
		'addPlanInfoRequest.dingzhis': opts.jhDingZhi,
		'addPlanInfoRequest.yumiaopans': opts.jhYuMiaoNum,
		'addPlanInfoRequest.jihuaksrq': opts.jhStartTime,
		'addPlanInfoRequest.jihuajsrq': opts.jhEndTime
		
    }));
}

export function fetchDelPlan(opts) {
    return Vue.axios.post('agriculture/planInfo/deletePlanInfo.do', qs.stringify({
       'deletePlanInfoRequest.piCiBianH': opts.picis
    }));
}

export function fetchProductList(opts) {
    return Vue.axios.post('agriculture/productInfo/queryProductInfoList.do', qs.stringify({
       'queryProductInfoListRequest.page_number': opts.cpPageNum,
       'queryProductInfoListRequest.page_size': opts.cpPageSize,
       'queryProductInfoListRequest.productName': opts.cpName,
	   'queryProductInfoListRequest.productId': opts.cpId
    }));
}

export function fetchOwnLand(opts) {
    return Vue.axios.post('agriculture/column/dataGrid.do');
}

export function fetchGetProducts(opts) {
    return Vue.axios.post('agriculture/productInfo/queryProductInfoList.do', qs.stringify({
        'queryProductInfoListRequest.page_number': opts.currentPage,
        'queryProductInfoListRequest.page_size': opts.pageSize,
        'queryProductInfoListRequest.productName': opts.productName,
        'queryProductInfoListRequest.productId': opts.productId
    }));
}
export function fetchSaveProductLinks(opts) {
    return Vue.axios.post('agriculture/productInfo/addProductInfo.do', qs.stringify({
        'addProductInfoRequest.chanpmc': opts.name,
        'addProductInfoRequest.guisd': opts.address,
        'addProductInfoRequest.fayl': opts.germinate,
        'addProductInfoRequest.yizcml': opts.transplant,
        'addProductInfoRequest.dankz': opts.weight,
        'addProductInfoRequest.caiszq': opts.pluck,
        'addProductInfoRequest.linksInfoJsonArray': opts.links,

    }));
}
export function fetchKuaidials(opts) {
    return Vue.axios.post('agriculture/column/dataGrid.do');
}

export function fetchLinkTemp(opts) {
    return Vue.axios.post('agriculture/productInfo/queryWorkLink.do', qs.stringify({
        'queryWorkLinkRequest.preLinkId': opts.linkId
    }));
}
export function fetchLinkNames() {
    return Vue.axios.post('agriculture/linkInfo/queryLinks.do');
}

export function delProductInfo(opts) {
    return Vue.axios.post('agriculture/productInfo/deleteProductInfo.do', qs.stringify({
        'deleteProductInfoRequest.productID': opts.id
    }));
}

// ---------------------------------------------------------------生产管理-----------------------------------------------------
export function fetchProductLists(opts) {
    return Vue.axios.post('agriculture/production/dataGrid.do', qs.stringify({
        beginPage: opts.beginPage,
        pageSize: opts.pageSize,
        _lk_picibianh: opts.no,
        _lk_chanpinmc: opts.name,
        _lk_linkidname: opts.link,
        zhixingzt: opts.state
    }));
}

export function fetchProductDetail(opts) {
    return Vue.axios.post('agriculture/production/showInfo.do', qs.stringify({
        picibianh: opts.no
    }));
}
// ##------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------归属地-----------------------------------------------------
export function fetchAddKuaidial(opts) {
    return Vue.axios.post('/agriculture/column/addOrUpdateData.do', qs.stringify({
        names: opts.name,
        parentid: opts.parentId,
        id: opts.id
    }));
}

export function fetchModifyKuaidial(opts) {
    return Vue.axios.post('agriculture/column/addOrUpdateData.do', qs.stringify({
        names: opts.name,
        parentid: opts.parentId,
    }));
}
export function fetchDelKuaidial(opts) {
    return Vue.axios.post('agriculture/column/deleteData.do', qs.stringify({
        id: opts.id
    }));
}
// ##------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------主页----------------------------------------------------------------------------
export function fetchLinkData(opts) {
    return Vue.axios.post('agriculture/index/output.do', qs.stringify({
        _lk_createtime: opts.startTime,
         _gk_createtime: opts.endTime,
         spaceday: opts.day,
         chanpids: opts.productIds
    }));
}
export function fetchProducts(opts) {
    return Vue.axios.post('agriculture/index/queryProductInfo.do');
}

export function fetchGetTaskInfoLists(opts){
    console.log('opts是什么？');
    console.log(opts);
    return Vue.axios.post('agriculture/index/queryProductionOverview.do', qs.stringify({
        dateFlag: opts.flag,
        beginPage: opts.beginPage,
        pageSize: opts.pageSize
    }));
}
export function fetchBatchScheduleDatas(opts) {
    return Vue.axios.post('agriculture/index/batchSchedule.do', qs.stringify({
        _lk_createdatetime: opts.startTime,
        _gk_createdatetime: opts.endTime
    }));
}
// ##------------------------------------------------------------------------------------------------------------------------------------

export function fetchAddResource(opts){
    return Vue.axios.post('agriculture/resource/addResource.do', qs.stringify({
        columid: opts.zyColumid,
        columname: opts.zyColumname,
		names: opts.zyName,		
		type:  opts.zyType,   
		amount:	opts.zyAmount,	
		holes:	opts.zyHoles,	
		areas:	opts.zyAreas,	 
		createtime:	opts.zyTime,  
		density: opts.zyDensity,
		code: opts.zyCode
    }));
}


export function fetchZiYuanNum(opts){
    return Vue.axios.post('agriculture/resource/genCodeRule.do', qs.stringify({
        _in_type: opts.zyType
    }));
}

export function fetchDeleteZiYuan(opts){
    return Vue.axios.post('agriculture/resource/deleteResource.do', qs.stringify({
        id: opts.ids
    }));
}

export function fetchPlanBack(opts){
    return Vue.axios.post('agriculture/taskInfo/withdrawTaskInfo.do', qs.stringify({
        'withdrawTaskInfoRequest.piCiBianH': opts.ypfPiCiBianH,
        'withdrawTaskInfoRequest.sort': opts.ypfSort
    }));
}