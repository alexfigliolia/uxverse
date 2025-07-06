export class Media {
  public static preloadImage(src: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  public static preloadVideo(src: string) {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.onloadedmetadata = () => resolve(video);
      video.onerror = reject;
      video.src = src;
      video.load();
    });
  }
}
