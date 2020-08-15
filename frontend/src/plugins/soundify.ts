import { Howl, Howler } from "howler";
import _Vue from "vue";

interface SoundsList {
  [id: string]: Howl;
}
interface Soundify {
  sounds: SoundsList;
  play(id: string): void;
  stop(id: string): void;
}

declare module "vue/types/vue" {
  interface Vue {
    $sound: Soundify;
  }
}

Howler.autoUnlock = false;

class Soundify {
  sounds: SoundsList = {};

  public play(id: string) {
    console.log(this);
    console.log("addNew");
    if (this.sounds[id]) {
      this.sounds[id].play();
      return;
    }
    const sound = new Howl({
      src: [`${id}.mp3`],
      html5: true,
      loop: true,
      volume: 0.5,
      format: ["mp3"],
      onload: function() {
        console.log("song loaded!");
        sound.play();
      },
      onend: function(e) {
        console.log(e);
      },
      onloaderror: function(id, error) {
        console.log("loadError: " + id + " - " + error);
      },
      onstop: function(e) {
        console.log(e);
      },
      onplayerror: function(e, t) {
        console.log(e);
        console.log(t);
      }
    });
    this.sounds[id] = sound;
    console.log(Howler.volume());
  }

  public stop(id: string) {
    this.sounds[id].stop();
  }

  public volume(id: string, value: number) {
    console.log(value);
    this.sounds[id].volume(value / 100);
  }

  public globalVolume(value: number) {
    Howler.volume(value / 100);
  }

  public globalMute(muted: boolean) {
    Howler.mute(muted);
  }
}

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$sound = new Soundify();
  }
};
