import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NewsService} from './components/newsitem/news.service';
import {Observable, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import { Helper } from './helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  imgSrc = 'assets/images/image';
  news: Observable<NewsItem[]> = this.newsService.getTopNewsIds().pipe(
    map(result => {
      Helper.shuffle(result);
      return result.slice(0, 10);
    }),
    switchMap(x => this.newsService.getNewsItemsByIds(x).pipe(
      map(Helper.sortAsc())
    ))
  );

  constructor(private newsService: NewsService) {}

  getSrcSet(index: number): string {
    return `${this.imgSrc}${index}.jpg 510w, ${this.imgSrc}-lg-${index}.jpg 350w`;
  }
}

export interface NewsItem {
  title: string;
  score: number;
  url: string;
  author: Author;
  timestamp: number;
}

export interface Author {
  id: string;
  karmaScore: number;
}
