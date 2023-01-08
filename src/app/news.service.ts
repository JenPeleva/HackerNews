import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Author, NewsItem} from "./app.component";
import {catchError, forkJoin, Observable, switchMap} from "rxjs";
import { map } from 'rxjs/operators';
import {handleError} from "./utils";

export const SERVICE_BASE_URL = "https://hacker-news.firebaseio.com";
export const TOP_STORIES_URL = `${SERVICE_BASE_URL}/v0/topstories.json`;
export const NEWS_ITEM_BY_ID_URL = (id: number) => `${SERVICE_BASE_URL}/v0/item/${id}.json`;
export const AUTHOR_BY_ID_URL = (id: string) => `${SERVICE_BASE_URL}/v0/user/${id}.json`;

@Injectable({
  providedIn: "root"
})
export class NewsService {

  constructor(private http: HttpClient) {}

  getNewsItemsByIds(ids:Array<number>): Observable<NewsItem[]> {
    const observables: Observable<NewsItem>[] = ids.map(itemId =>
      this.getNewsItemById(itemId)
    );
   return forkJoin(observables);
  }

  getNewsItemById(id: number): Observable<NewsItem> {
    return this.http.get<HackerNewsItem>(NEWS_ITEM_BY_ID_URL(id)).pipe(
      switchMap(result => this.getNewsAuthorById(result.by).pipe(
        map((newsAuthor: Author)  => ({
          title: result.title,
          score: result.score,
          url: result.url,
          author: newsAuthor,
          timestamp: result.time
        }))
        ),
      ),
      catchError(handleError)
    )
  }

  getTopNewsIds(): Observable<number[]> {
    return this.http.get<number[]>(TOP_STORIES_URL)
      .pipe(catchError(handleError));
  }

  getNewsAuthorById(authorId: string): Observable<Author> {
      return this.http.get<HackerNewsAuthor>(AUTHOR_BY_ID_URL(authorId)).pipe(
        map(author =>
          ({
            id: author.id,
            karmaScore: author.karma
          }) as Author),
        catchError(handleError)
      );
  }
}

export interface HackerNewsItem {
  title: string;
  url: string;
  by: string;
  id: number;
  kids: number[];
  score: number;
  parent: number;
  text: string;
  time: number;
  type: string;
}

export interface HackerNewsAuthor {
  created: number;
  id: string;
  karma: number;
  submitted: number[]
}
