import Vue from 'vue'
import qs from 'qs'
export function fetchHomePage () {
     return Vue.axios.get('/api/index-all-data')
}

export function fetchGetNav (token) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c//sys/login/loadMenus.do', qs.stringify({
        'loginedtoken': token
    }))
}

export function fetchGetSubNavById (idx) {
    return Vue.axios.post('/api/test-post', {'id': idx.id})
}

export function fetchLogin (opt) {
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