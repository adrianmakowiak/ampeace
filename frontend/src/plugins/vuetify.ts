import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify, { greeting: "hello jane" });

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  }
});
