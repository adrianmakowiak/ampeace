import _Vue from "vue";
import { PresignedPost, GetUrlsForUploadResponse } from "../types";
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

  private post<T>(url: string, body: RequestInit["body"]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      fetch(url, {
        method: "post",
        body,
        mode: "cors"
      })
        .then(res => {
          if (res.status === 204) {
            return resolve();
          }

          return res.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private get<T>(path: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      fetch(`${this.url}${path}`)
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private getFile(path: string) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}${path}`)
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          if (response.body) {
            return response.body.getReader().read();
          }
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
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

  public getUrlsForUpload(
    soundName: string
  ): Promise<GetUrlsForUploadResponse> {
    return this.get<GetUrlsForUploadResponse>(
      `sounds/upload-url?name=${soundName}`
    );
  }

  public uploadFileUsingPresignedUrl(presignedPost: PresignedPost, file: File) {
    const formData = new FormData();
    Object.keys(presignedPost.fields).forEach(key => {
      formData.append(key, presignedPost.fields[key]);
    });
    formData.append("file", file);
    return this.post(presignedPost.url, formData);
  }
}

export const api = new HttpClient();

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$api = api;
  }
};
