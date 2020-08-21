<template>
  <div class="admin-panel">
    <v-form class="form" v-model="valid">
      <v-text-field
        v-model="soundName"
        :counter="10"
        :rules="nameRules"
        label="Sound name"
        required
        dark
      ></v-text-field>
      <v-file-input
        :rules="fileRules"
        accept="audio/*"
        placeholder="Pick a music file"
        prepend-icon="mdi-music"
        label="Sound file"
        dark
        :value="soundFile"
      ></v-file-input>
      <v-file-input
        :rules="fileRules"
        accept="image/svg+xml"
        placeholder="Pick a music icon"
        prepend-icon="mdi-image-area"
        label="Sound icon"
        dark
        :value="soundIcon"
      ></v-file-input>
      <v-btn :disabled="!valid">
        add
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminPanel extends Vue {
  private valid = false;
  private nameRules = [
    (v: string) => !!v || "Name is required",
    (v: string) =>
      (v && v.length <= 10) || "Name must be less than 10 characters"
  ];

  private fileRules = [(v: any) => !!v];

  private soundName = "";
  private soundFile = null;
  private soundIcon = null;
}
</script>

<style scoped>
.admin-panel {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  width: 100%;
}

.form {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
}
</style>
