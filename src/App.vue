<template>
  <v-app class="app">
    <v-app-bar
      app
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      color="brown lighten-1"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Soundify</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-checkbox
        v-model="collapseOnScroll"
        color="white"
        hide-details
      ></v-checkbox>
    </v-app-bar>
    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Home from "./views/Home.vue";

export default Vue.extend({
  name: "App",

  components: {
    Home
  },

  data: () => ({
    collapseOnScroll: true
  })
});
</script>

<style>
#app {
  background-color: #a1887f;
}
</style>
