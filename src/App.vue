<template>
  <v-app class="app">
    <v-app-bar app color="brown lighten-1" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Soundify</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="slider">
        <v-slider
          @end="sliderUpdateValue"
          @click:append="volumeIconClick"
          :value="globalVolume"
          dark
          :append-icon="soundIcon"
          hide-details="true"
        ></v-slider>
      </div>
    </v-app-bar>
    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script lang="ts">
// import Vue from "vue";
import { Component, Vue } from "vue-property-decorator";

import Home from "./views/Home.vue";

@Component({
  name: "App",
  components: {
    Home
  }
})
export default class App extends Vue {
  private globalVolume = 100;
  private muted = false;

  public sliderUpdateValue(newValue: number): void {
    this.globalVolume = newValue;
    this.$sound.globalVolume(newValue);
  }

  get soundIcon() {
    return this.muted ? "mdi-volume-off" : "mdi-volume-high";
  }

  public volumeIconClick(): void {
    this.muted = !this.muted;
    this.$sound.globalMute(this.muted);
  }
}
</script>

<style>
#app {
  background-color: #a1887f;
}
.slider {
  width: 96px;
}
</style>
