import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Author, NewsItem} from "./app.component";
import {catchError, forkJoin, Observable, of, switchMap, throwError} from "rxjs";
import { map } from 'rxjs/operators';

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
      this.getNewsItemById(itemId).pipe(
        catchError(this.handleError)
      )
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
      catchError(this.handleError)
    )
  }

  getTopNewsIds(): Observable<number[]> {
    return this.http.get<number[]>(TOP_STORIES_URL)
      .pipe(catchError(this.handleError));
  }

  getNewsAuthorById(authorId: string): Observable<Author> {
      return this.http.get<HackerNewsAuthor>(AUTHOR_BY_ID_URL(authorId)).pipe(
        map(author =>
          ({
            id: author.id,
            karmaScore: author.karma
          }) as Author),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

export interface HackerNewsItem {
  title: string;
  url: string;
  by: string;
  id: number;
  kids: number[];
  score: number;
  time: number;
  type: string;
  text?: string;
  parent?: number;
  descendants?: number;
}

export interface HackerNewsAuthor {
  created: number;
  id: string;
  karma: number;
  submitted: number[]
  about?: string;
}
