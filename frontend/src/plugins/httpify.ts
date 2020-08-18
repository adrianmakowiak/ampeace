import _Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $api: HttpClient;
  }
}

class HttpClient {
  url = process.env.VUE_APP_API_URL;

  private get(path: string) {
    return new Promise((resolve, reject) => {
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

  public async listSounds() {
    return this.get("sounds");
  }
}

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$api = new HttpClient();
  }
};
