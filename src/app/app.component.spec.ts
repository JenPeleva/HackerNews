import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DebugElement } from '@angular/core';
import {AppComponent, NewsItem} from './app.component';
import { Helper } from './helper';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {of} from 'rxjs';
import {By} from "@angular/platform-browser";
import {NewsItemComponent} from "./components/newsitem/news-item.component";
import {AuthorComponent} from "./components/author/author.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faHeart, faUser} from '@fortawesome/free-solid-svg-icons';

const NEWS_ARRAY: Array<NewsItem> = [
  {
    title: 'test',
    score: 4,
    url: 'test.com',
    author: { id: 'test', karmaScore: 2},
    timestamp: 123343
  },
  {
    title: 'test',
    score: 1,
    url: 'test.com',
    author: { id: 'test', karmaScore: 2},
    timestamp: 123343
  },
  {
    title: 'test1',
    score: 3,
    url: 'test1.com',
    author: { id: 'test1', karmaScore: 5},
    timestamp: 434342
  }];

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NewsItemComponent,
        AuthorComponent
      ],
      imports: [FontAwesomeModule],
      providers: [HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1.-text-center.-mb-xlg')?.textContent).toContain('Hacker news');
  });

  it('Helper.shuffle() should shuffle array randomly', () => {
    const arr = [1, 2 , 3, 5, 6, 7];
    const comparisonArray = [...arr];
    Helper.shuffle(arr);
    expect(JSON.stringify(arr)).not.toEqual(JSON.stringify(comparisonArray));
  });

  it('Helper.sort() should provide a sort by ascending function', () => {
    const fn = Helper.sortAsc();
    const arr = [...NEWS_ARRAY];
    fn(arr);

    const arrLength = arr.length;
    expect(isArraySorted(arr, arrLength)).toBeTrue();
  });

  it('check news items', fakeAsync(() => {
    const arr = [...NEWS_ARRAY];
    component.news = of(arr);
    tick(1000);
    fixture.detectChanges();

    const listOfItems: DebugElement[] = queryAllByCss("ul.-list-style-none > li");

    //check number of news items
    expect(listOfItems.length).toBe(arr.length);

    listOfItems.forEach((element: DebugElement, index) => {
      const nativeElement: HTMLElement = element.nativeElement;
      checkNewsItem(nativeElement, index, arr)
    });
  }));

  function checkNewsItem(nativeElement: HTMLElement, index: number, itemsArray: Array<NewsItem>) {
      const currentItem = itemsArray[index];
      const img = nativeElement.querySelector('.news-item__image');
      const title = nativeElement.querySelector('.news-item__title a');
      const score = nativeElement.querySelector('.news-item__score');
      const date = nativeElement.querySelector('.news-item__date');
      const authorId = nativeElement.querySelector('[data-test="authorId"]');
      const karmaScore = nativeElement.querySelector('[data-test="authorKarma"]');
      expect(img).toBeDefined();
      expect(title).toBeDefined();
      expect(score).toBeDefined();
      expect(date).toBeDefined();
      expect(authorId).toBeDefined();
      expect(karmaScore).toBeDefined();
      expect(img!.getAttribute('src')).toEqual(`assets/images/image${index}.jpg`);
      expect(title!.innerHTML).toEqual(currentItem.title);
      expect(score!.innerHTML).toContain(`${currentItem.score} points`);
      expect(new Date(date!.innerHTML).getDate()).toEqual(new Date(currentItem.timestamp*1000).getDate());
      expect(authorId!.innerHTML).toContain(currentItem.author.id);
      expect(karmaScore!.innerHTML).toContain(currentItem.author.karmaScore.toString());
  }

  function isArraySorted(arr: Array<NewsItem>, arrLength: number): boolean {
    if (arrLength == 1 || arrLength == 0)
      return true;

    if (arr[arrLength - 1] < arr[arrLength - 2])
      return false;

    return isArraySorted(arr, arrLength - 1);
  }

  function queryAllByCss(selector: string) {
    return fixture.debugElement.queryAll(By.css(selector))
  }

  function queryByCss(selector: string) {
    return fixture.debugElement.query(By.css(selector))
  }
});
