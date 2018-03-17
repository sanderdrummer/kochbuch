
export class Api {
  
  static url = 'https://shoppinglist-fab45.firebaseio.com/';
  static apiKey = 'AIzaSyDKjWfRUP08276cQslfxYP6K7wyq2WxXUA';

  static get (path: string) {
    return fetch(Api.getUrl(path)).then(res => res.json());
  }

  static post (path: string, data: object) {
    return fetch(Api.getUrl(path), Api.getRequestInit(data, 'POST')).then(res => res.json());    
  }

  static patch (path: string, data: object) {
    return fetch(Api.getUrl(path), Api.getRequestInit(data, 'PATCH')).then(res => res.json());    
  }

  private static getUrl(path: string): RequestInfo {
    return Api.url + path;
  }

  private static getRequestInit(data: object, method: string): RequestInit | undefined {
    return {
      method: method,
      body: JSON.stringify(data),
      headers: new Headers()
    };
  }
}