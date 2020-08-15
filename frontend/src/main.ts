import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import soundify from "./plugins/soundify";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

Vue.use(soundify);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
