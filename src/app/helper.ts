import { NewsItem } from "./app.component";

export class Helper {

  //shuffles array randomly (Fisher Yates Method)
  static shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  //sort in ascending order
  static sortAsc(): (a: Array<NewsItem>) => Array<NewsItem> {
    return (array: Array<NewsItem>) => array.sort((a: NewsItem, b: NewsItem) => a.score - b.score);
  }
}
