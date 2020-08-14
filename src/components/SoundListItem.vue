<template>
  <div
    @click="soundActivateHandler"
    :class="{ itemContainer: true, active: isActive }"
  >
    <v-icon size="96">{{ icon }}</v-icon>
    <v-slider
      @click="sliderClick"
      @end="sliderUpdateValue"
      :value="sliderValue"
      :class="{ slider: true, disabled: !isActive }"
      dark
      dense
    ></v-slider>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SoundListItem extends Vue {
  @Prop() private icon!: string;
  private isActive = false;
  private sliderValue = 50;

  public sliderClick(event: Event) {
    event.stopPropagation();
  }

  public sliderUpdateValue(newValue: number): void {
    this.sliderValue = newValue;
    this.$sound.volume(this.icon, newValue);
  }

  public soundActivateHandler(): void {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.$sound.play(this.icon);
    } else {
      this.$sound.stop(this.icon);
    }
  }
}
</script>

<style scoped>
.itemContainer.active {
  opacity: 1;
}
.itemContainer {
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.itemContainer:hover {
  opacity: 1;
}
.slider {
  width: 80%;
}
.slider.disabled {
  opacity: 0;
}
</style>
