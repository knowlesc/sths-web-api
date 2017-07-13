import * as rssParser from 'rss-parser';

export function getNews() {
  return new Promise((resolve, reject) => {
    const feed = process.env.NEWS_FEED_URL;
    if (!feed) {
      reject('No NEWS_FEED_URL provided.');
    }

    rssParser.parseURL(feed, (err, parsed) => {
      if (err) {
        reject(err);

        return;
      }

      const response = {
        link: parsed.feed.link,
        more: parsed.feed.entries.length > 5,
        items: parsed.feed.entries.map((entry) => {
          return {
            creator: entry.creator,
            title: entry.title,
            link: entry.link,
            pubDate: entry.pubDate,
            content: entry.content
          };
        }).slice(0, 5)}
      ;

      resolve(response);
    });
  });
}
