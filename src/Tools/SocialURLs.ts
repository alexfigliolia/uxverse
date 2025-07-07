export class SocialURLs {
  public static instagramProfile(username: string) {
    return `"https://www.instagram.com/${username}"`;
  }

  public static tiktokProfile(username: string) {
    return `https://www.tiktok.com/@${username}`;
  }

  public static youtubeChannel(username: string) {
    return `https://www.youtube.com/@${username}`;
  }
}
