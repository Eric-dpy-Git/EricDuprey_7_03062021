import Vue from "vue";
import App from "./App.vue";
/* import router from "./router"; */
//state ----------------------------------------------
//reapeted from store/index.js

//state management
import store from "./store";

//-------------------------------------------------------
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

const moment = require("moment");
require("moment/locale/fr");

Vue.use(require("vue-moment"), {
  moment,
});

import VueRouter from "vue-router";
import Routes from "./router/index";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

/* new Vue({
  render: (h) => h(App),
  router: router,
  store,
}).$mount("#app"); */

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
