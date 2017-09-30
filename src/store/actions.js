import {
    fetchGetNav,
    fetchGetSubNavById,
    fetchEditMenu,
    fetchUpdateMenu,
    fetchAddMenu,
    fetchDeleteMenu
} from './../fetch/api'

export default {
    FETCH_GET_NAV: ({ commit, state }, token) => {
        return fetchGetNav(token).then((navData) => {
            commit('GET_NAV', { navData })
        })
    },
    FETCH_SUBNAV_BY_ID: ({ commit, state }, idx) => {
        console.log('FETCH_SUBNAV_BY_ID id 有吗？');
        console.log(idx);
        return fetchGetSubNavById(idx).then((subNavData) => {
            commit('GET_SUB_NAV', { subNavData });
        })
    },
    FETCH_EDIT_MENU: ({ commit, state }) => {
        console.log('FETCH EDIT MENU');
        return fetchEditMenu(state).then((menuData) => {
            commit('GET_EDIT_MENU', { menuData });
        })
    },
    UPDATE_MENU: ({ commit, state }, opts) => {
        console.log('update menu');
        return fetchUpdateMenu(opts).then((upMenuDatas) => {
            commit('UPDATE_MENU_NOW', { upMenuDatas })
        })
    },
    ADD_MENU: ({ commit, state }, opts) => {
        console.log('add menu');
        console.log(opts);
        return fetchAddMenu(opts).then((addMenuDatas) => {
            commit('ADD_MENU_NOW', { addMenuDatas })
        })
    },
    DELETE_MENU: ({ commit, state }, opts) => {
        console.log('del menu');
        console.log(opts);
        return fetchDeleteMenu(opts).then((delMenuDatas) => {
            commit('DELETE_MENU_NOW', { delMenuDatas })
        })
    }
}