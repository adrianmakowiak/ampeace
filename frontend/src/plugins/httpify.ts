import _Vue from "vue";
import {
  PresignedPost,
  GetUrlsForUploadResponse,
  ListSoundsResponse,
  PostRequest,
  GetRequest,
  GetUrlParams
} from "../types";
declare module "vue/types/vue" {
  interface Vue {
    $api: HttpClient;
  }
}

class HttpClient {
  url = process.env.VUE_APP_API_URL;

  private getUrl(params: GetUrlParams): string {
    if (params.path) {
      return `${this.url}${params.path}`;
    } else if (params.url) {
      return params.url;
    } else {
      return this.url;
    }
  }

  private post<T>(params: PostRequest): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      fetch(this.getUrl(params), {
        method: "post",
        body: params.body,
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

  private get<T>(params: GetRequest): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      fetch(this.getUrl(params))
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
  private getFile(params: GetRequest) {
    return new Promise((resolve, reject) => {
      fetch(this.getUrl(params))
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
    return this.get<ListSoundsResponse>({ path: "sounds" });
  }

  public getSound(id: string) {
    return this.getFile({ path: `sounds/${id}` });
  }

  public getUrlsForUpload(
    soundName: string
  ): Promise<GetUrlsForUploadResponse> {
    return this.get<GetUrlsForUploadResponse>({
      path: `sounds/upload-url?name=${soundName}`
    });
  }

  public uploadFileUsingPresignedUrl(presignedPost: PresignedPost, file: File) {
    const formData = new FormData();
    Object.keys(presignedPost.fields).forEach(key => {
      formData.append(key, presignedPost.fields[key]);
    });
    formData.append("file", file);
    return this.post({ url: presignedPost.url, body: formData, path: "asd" });
  }
}

export const api = new HttpClient();

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$api = api;
  }
};
