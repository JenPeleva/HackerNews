import {Component, OnInit} from '@angular/core';
import {NewsService} from "./news.service";
import {shuffle} from "./utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  news: NewsItem[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getTopNewsIds().subscribe((result: number[]) => {
        shuffle(result);
        const randomNewsIds = result.slice(0, 10);

        this.newsService.getNewsItemsByIds(randomNewsIds).subscribe((items) => {
          this.news = items.sort((a, b) => a.score - b.score);
        })
    })

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
