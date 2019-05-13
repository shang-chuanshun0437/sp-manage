import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import top from "./modules/top";
import leftSideSelect from "./modules/leftSideSelect";
import business from "./modules/business";
import interfaceAccess from "./modules/interfaceAccess";
import verifyCode from "./modules/verifyCode";
import role from "./modules/role";
import userRole from "./modules/userRole";

import getters from "./getters";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
      login,
      top,
      leftSideSelect,
      business,
      interfaceAccess,
      verifyCode,
      role,
      userRole
    },
    getters
});
