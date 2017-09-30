import Vue from 'vue'

export default {
    GET_NAV: (state, { navData }) => {
        console.log('getNav-------------------');
        console.log(navData);
       state.navData = navData;
    },
    GET_SUB_NAV: (state, { subNavData }) => {
        console.log('get sub nav=========================');
        console.log(subNavData);
        state.subNavData = subNavData;
    },
    GET_EDIT_MENU: (state, { menuData }) => {
        console.log('get edit menu=======================');
        console.log(menuData);
        state.menuData = menuData;
    },
    UPDATE_MENU_NOW: (state, { upMenuDatas }) => {
        console.log('更新菜单---------------------++');
        console.log(upMenuDatas);
        state.upMenuDatas = upMenuDatas;
    },
    ADD_MENU_NOW: (state, { addMenuDatas }) => {
        console.log('添加菜单---------------------++');
        console.log(addMenuDatas);
        state.addMenuDatas = addMenuDatas;
    },
    DELETE_MENU_NOW: (state, { delMenuDatas }) => {
        console.log('添加菜单---------------------++');
        console.log(delMenuDatas);
        state.delMenuDatas = delMenuDatas;
    }
}