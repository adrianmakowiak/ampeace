import _Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $api: HttpClient;
  }
}

type ListSoundsResponse = {
  items: Sound[];
};

type Sound = {
  PK: "sound";
  SK: string;
  sound_name: string;
  sound_type: string;
};

class HttpClient {
  url = process.env.VUE_APP_API_URL;

  private get<T>(path: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      fetch(`${this.url}${path}`)
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then(data => {
          console.log("data", data);
          resolve(data);
        })
        .catch(error => {
          console.log("error", error);
          reject(error);
        });
    });
  }

  private getFile(path: string) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}${path}`)
        .then(response => {
          console.log(response);
          if (!response.ok) throw Error(response.statusText);

          if (response.body) {
            return response.body.getReader().read();
          }
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          console.log("error", error);
          reject(error);
        });
    });
  }

  public listSounds() {
    return this.get<ListSoundsResponse>("sounds");
  }

  public getSound(id: string) {
    return this.getFile(`sounds/${id}`);
  }
}

export const api = new HttpClient();

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$api = api;
  }
};
