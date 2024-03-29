/*
 * Author: 17030360
 * Email:wdnybbz@163.com
 */
import * as types from "../mutation-types";

const getters = {
  total: state => state.total,
  list: state => state.list,
};

const state = {
  total: 0,
  list: [],
};

const actions = {

    list({ commit }, param) {
        return new Promise((resolve, reject) => {
            commit(types.BUSINESS_LIST, param);
        });
    },
};

const mutations = {
    [types.BUSINESS_LIST](state, param) {
        state.total = param.total;
        if (param.total === 0) {
            state.list = null;
        } else {
            state.list = [].concat(param.users);
        }
    },
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
