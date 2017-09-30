export default {
    getNavData (state) {
        return state.navData;
    },
    getSubNavData (state) {
        return state.subNavData;
    },
    getEditMenu(state) {
        return state.menuData.data;
    },
    getUpdateMenuDatas(state) {
        return state.upMenuDatas.data;
    },
    getAddMenuDatas(state) {
        return state.addMenuDatas.data;
    },
    delAddMenuDatas(state) {
        return state.delMenuDatas.data;
    }
}