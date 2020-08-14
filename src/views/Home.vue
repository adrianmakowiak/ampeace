<template>
  <div class="home">
    <SoundList msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import SoundList from "@/components/SoundList.vue";

export default {
  name: "Home",
  components: {
    SoundList
  }
};
</script>
