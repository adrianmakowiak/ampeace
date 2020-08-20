import Vue from "vue";
import Vuex from "vuex";
import { api } from "../plugins/httpify";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sounds: []
  },
  mutations: {
    setSounds(state, payload) {
      state.sounds = payload;
    }
  },
  actions: {
    async setSounds(state) {
      const { items } = await api.listSounds();
      state.commit("setSounds", items);
    }
  },
  modules: {},
  getters: {
    getSounds: state => state.sounds
  }
});
