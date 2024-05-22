class EmbedUtil {
  public extractEmbedUrls(message: string): string[] {
    const urlPattern = /https?:\/\/[^\s]+/g;
    const urls = message.match(urlPattern) || [];
    const embedUrls: string[] = [];

    const xPattern =
      /https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/.*\/status\/(\d+)/;
    const youtubePattern =
      /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/;

    urls.forEach((url) => {
      if (xPattern.test(url) || youtubePattern.test(url)) {
        embedUrls.push(url);
      }
    });

    return embedUrls;
  }
}

export default new EmbedUtil();
