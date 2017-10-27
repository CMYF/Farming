import Vue from 'vue'
import qs from 'qs'
export function fetchHomePage() {
    return Vue.axios.get('/api/index-all-data')
}

export function fetchGetNav(token) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c//sys/login/loadMenus.do', qs.stringify({
      'loginedtoken': token
    }))
}

export function fetchGetSubNavById(idx) {
    return Vue.axios.post('/api/test-post', { 'id': idx.id })
}

export function fetchLogin(opt) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/login/login.do', qs.stringify({
        'id': opt.id,
        'pwd': opt.pwd
    }));
}

export function fetchEditMenu() {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/menumanagementMenus.do?parentId=-1')
}

export function fetchUpdateMenu(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/menumanagementUpdateNode.do', qs.stringify({
        ids: opts.id,
        menuname: opts.name,
        parentids: opts.parentId,
        menuaction: opts.path,
        menusort: opts.sore,
        menudesc: opts.desc,
        menustart: 1,
        menuicon: opts.menuicon,
        loginedtoken: opts.token
    }));
}
export function fetchAddMenu(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/menumanagementNewNode.do', qs.stringify({
        menuname: opts.name,
        parentids: opts.parentId,
        menuaction: opts.path,
        menusort: opts.sore,
        menudesc: opts.desc,
        menustart: 1,
        menuicon: opts.menuicon,
        loginedtoken: opts.token
    }));
}
export function fetchDeleteMenu(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/menumanagementDeleteNode.do', qs.stringify({
        ids: opts.id,
        menuname: opts.name,
        parentids: opts.parentId,
        menuaction: opts.path,
        menusort: opts.sore,
        menudesc: opts.desc,
        loginedtoken: opts.token
    }));
}

export function fetchAllUsers(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/operatorDataGrid.do', qs.stringify({
        loginedtoken: opts.token,
        beginPage: opts.beginPage,
        pageSize: opts.pageSize,
        _lk_opercode: opts.acc,
        _lk_opername: opts.username
    }));
}
export function fetchUserById(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/operatorLookRow.do', qs.stringify({
        loginedtoken: opts.token,
        ids: opts.id
    }));
}
export function fetchUpateUserById(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/operatorUpdateRow.do', qs.stringify({
        loginedtoken: opts.token,
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
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/rolemanagementDataGrid.do', qs.stringify({
        loginedtoken: opts.token,
        beginPage: opts.beginPage,
        pageSize: opts.pageSize,
        _lk_rolename: opts.roleName
    }));
}
export function fetchDelByIds(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/rolemanagementDeleteRow.do', qs.stringify({
        loginedtoken: opts.token,
        deleteIds: opts.roleIds
    }));
}

export function fetchAddRole(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/rolemanagementInsertRow.do', qs.stringify({
        loginedtoken: opts.token,
        rolename: opts.name,
        rolestatus: opts.region,
        roledesc: opts.desc,
        menuIds: opts.roleIds
    }));
}

export function fetchGetRoleById(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/rolemanagementLookRow.do', qs.stringify({
        loginedtoken: opts.token,
        ids: opts.id
    }));
}
export function fetchUpdateById(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/rolemanagementUpdateRow.do', qs.stringify({
        loginedtoken: opts.token,
        ids: opts.id,
        rolename: opts.name,
        rolestatus: opts.region,
        roledesc: opts.desc,
        menuIds: opts.roleIds
    }));
}

export function fetchTask(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/taskInfo/queryTaskInfoLists.do', qs.stringify({
        'queryTaskInfoListsRequest.page_number': opts.num,
        'queryTaskInfoListsRequest.page_size': opts.size,
        'queryTaskInfoListsRequest.taskStatus': opts.states,
        'queryTaskInfoListsRequest.piCiBianH': opts.pici,
        'queryTaskInfoListsRequest.linkOperater': opts.operater,
        'queryTaskInfoListsRequest.productName': opts.proName
        
    }));
}

export function fetchSendTask(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/taskInfo/distributeTaskInfo.do', qs.stringify({
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
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/taskInfo/queryDistributeTaskLinks.do', qs.stringify({
        'queryDistributeTaskLinksRequest.piCiBianH': opts.pcbh,
    }));
}

export function fetchTaskZiyuan(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/resource/dataGrid.do', qs.stringify({
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
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/planInfo/queryPlanInfoList.do', qs.stringify({
       'queryPlanInfoListRequest.page_number': opts.jhPageNum,
       'queryPlanInfoListRequest.page_size': opts.jhPageSize,
       'queryPlanInfoListRequest.picibianh': opts.jhPiCi,
	   'queryPlanInfoListRequest.jihuamc': opts.jhName,
	   'queryPlanInfoListRequest.zhixingzt': opts.jhStatus
    }));
}

export function fetchPlanNew(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/planInfo/addPlanInfo.do', qs.stringify({
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
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/planInfo/deletePlanInfo.do', qs.stringify({
       'deletePlanInfoRequest.piCiBianH': opts.picis
    }));
}

export function fetchProductList(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/productInfo/queryProductInfoList.do', qs.stringify({
       'queryProductInfoListRequest.page_number': opts.cpPageNum,
       'queryProductInfoListRequest.page_size': opts.cpPageSize,
       'queryProductInfoListRequest.productName': opts.cpName,
	   'queryProductInfoListRequest.productId': opts.cpId
    }));
}

export function fetchOwnLand(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/column/dataGrid.do', qs.stringify({
       loginedtoken: opts.landtToken
    }));
}

export function fetchGetProducts(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/productInfo/queryProductInfoList.do', qs.stringify({
        'queryProductInfoListRequest.page_number': opts.currentPage,
        'queryProductInfoListRequest.page_size': opts.pageSize,
        'queryProductInfoListRequest.productName': opts.productName,
        'queryProductInfoListRequest.productId': opts.productId
    }));
}
export function fetchSaveProductLinks(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/productInfo/addProductInfo.do', qs.stringify({
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
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/column/dataGrid.do', qs.stringify({
        loginedtoken: opts.token
    }));
}

export function fetchLinkTemp(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/productInfo/queryWorkLink.do', qs.stringify({
        'queryWorkLinkRequest.preLinkId': opts.linkId
    }));
}
export function fetchLinkNames() {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/linkInfo/queryLinks.do');
}

export function delProductInfo(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/productInfo/deleteProductInfo.do', qs.stringify({
        'deleteProductInfoRequest.productID': opts.id
    }));
}

// ---------------------------------------------------------------生产管理-----------------------------------------------------
export function fetchProductLists(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/production/dataGrid.do', qs.stringify({
        loginedtoken: opts.token,
        beginPage: opts.beginPage,
        pageSize: opts.pageSize,
        _lk_picibianh: opts.no,
        _lk_chanpinmc: opts.name,
        _lk_linkidname: opts.link,
        zhixingzt: opts.state
    }));
}

export function fetchProductDetail(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/production/showInfo.do', qs.stringify({
        picibianh: opts.no,
        loginedtoken: opts.token
    }));
}
// ##------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------归属地-----------------------------------------------------
export function fetchAddKuaidial(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c//agriculture/column/addOrUpdateData.do', qs.stringify({
        loginedtoken: opts.token,
        names: opts.name,
        parentid: opts.parentId,
        id: opts.id
    }));
}

export function fetchModifyKuaidial(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/column/addOrUpdateData.do', qs.stringify({
        loginedtoken: opts.token,
        names: opts.name,
        parentid: opts.parentId,
    }));
}
export function fetchDelKuaidial(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/column/deleteData.do', qs.stringify({
        loginedtoken: opts.token,
        id: opts.id
    }));
}
// ##------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------主页----------------------------------------------------------------------------
export function fetchLinkData(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/index/output.do', qs.stringify({
        loginedtoken: opts.token,
        _lk_createtime: opts.startTime,
         _gk_createtime: opts.endTime,
         spaceday: opts.day,
         chanpids: opts.productIds
    }));
}
export function fetchProducts(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/index/queryProductInfo.do ', qs.stringify({
        loginedtoken: opts.token
    }));
}

export function fetchGetTaskInfoLists(opts){
    console.log('opts是什么？');
    console.log(opts);
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/index/queryProductionOverview.do', qs.stringify({
        loginedtoken: opts.token,
        dateFlag: opts.flag,
        beginPage: opts.beginPage,
        pageSize: opts.pageSize
    }));
}
export function fetchBatchScheduleDatas(opts) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/index/batchSchedule.do', qs.stringify({
        loginedtoken: opts.token,
        _lk_createdatetime: opts.startTime,
        _gk_createdatetime: opts.endTime
    }));
}
// ##------------------------------------------------------------------------------------------------------------------------------------

export function fetchAddResource(opts){
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/resource/addResource.do', qs.stringify({
        loginedtoken: opts.zyToken,
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
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/resource/genCodeRule.do', qs.stringify({
        _in_type: opts.zyType
    }));
}

export function fetchDeleteZiYuan(opts){
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/resource/deleteResource.do', qs.stringify({
        loginedtoken: opts.token,
        id: opts.ids
    }));
}

export function fetchPlanBack(opts){
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/taskInfo/withdrawTaskInfo.do', qs.stringify({
        'withdrawTaskInfoRequest.piCiBianH': opts.ypfPiCiBianH,
        'withdrawTaskInfoRequest.sort': opts.ypfSort
    }));
}