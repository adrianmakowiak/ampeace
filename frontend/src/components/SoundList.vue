<template>
  <v-container class="soundListContainer" fluid>
    <v-row justify="space-around" class="mb-2">
      <SoundListItem icon="mdi-weather-pouring" />
      <SoundListItem icon="mdi-weather-windy" />
      <SoundListItem icon="mdi-wave" />
      <SoundListItem icon="mdi-weather-snowy" />
    </v-row>
    <v-row justify="space-around" class="mb-2">
      <SoundListItem icon="mdi-tree" />
      <SoundListItem icon="mdi-weather-lightning" />
      <SoundListItem icon="mdi-train" />
      <SoundListItem icon="mdi-fire" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import SoundListItem from "./SoundListItem.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    SoundListItem
  }
})
export default class SoundList extends Vue {}
</script>

<style scoped>
.soundListContainer {
  width: 80%;
  max-width: 800px;
}
</style>
