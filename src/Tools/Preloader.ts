export class Preloader {
  public static loadImage(src: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = reject;
      image.src = src;
    });
  }
}
