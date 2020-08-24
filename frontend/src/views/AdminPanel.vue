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
        v-model="soundFile"
      ></v-file-input>
      <v-file-input
        :rules="fileRules"
        accept="image/svg+xml"
        placeholder="Pick a music icon"
        prepend-icon="mdi-image-area"
        label="Sound icon"
        dark
        v-model="soundIcon"
      ></v-file-input>
      <v-btn @click="addSound" :disabled="!valid">
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

  async mounted() {
    // const res = await this.$api.getSound(
    //   "15a0a3b7-1aad-4c4a-8b58-db5d8e825d87"
    // );
  }

  private fileRules = [(v: File) => !!v];

  private soundName = "";
  private soundFile: File | null = null;
  private soundIcon: File | null = null;

  public async addSound() {
    if (this.soundFile && this.soundIcon) {
      const presignedUrls = await this.$api.getUrlsForUpload(this.soundName);

      const uploadSoundPromise = this.$api.uploadFileUsingPresignedUrl(
        presignedUrls.upload_url_sound,
        this.soundFile
      );
      const uploadIconPromise = this.$api.uploadFileUsingPresignedUrl(
        presignedUrls.upload_url_icon,
        this.soundIcon
      );
      const uploadResponse = await Promise.all([
        uploadSoundPromise,
        uploadIconPromise
      ]);
      console.log(uploadResponse);
    }
  }
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
