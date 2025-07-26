export class PlacesCache {
  private static createKey<T extends Record<string, any>>(
    url: string,
    options: T,
  ) {
    return `${url}${JSON.stringify(options)}`;
  }

  public static cacheRequest<T extends Record<string, any>>(
    url: string,
    options: T,
  ) {
    const key = this.createKey(url, options);
    return <T>(response: T) => {
      return localStorage.setItem(key, JSON.stringify(response));
    };
  }

  public static checkCache<T extends Record<string, any>>(
    url: string,
    options: T,
  ) {
    const key = this.createKey(url, options);
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
}
