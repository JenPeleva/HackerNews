import {HttpClient} from '@angular/common/http';
import {AUTHOR_BY_ID_URL, NEWS_ITEM_BY_ID_URL, NewsService, SERVICE_BASE_URL, TOP_STORIES_URL} from './news.service';
import {NewsItem} from '../../app.component';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {HACKER_NEWS_AUTHORS, HACKER_NEWS_MAP, NEWS_ITEMS, NEWS_ITEMS_IDS} from './test-items';

fdescribe('NewsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let newsService: NewsService;
  let baseUrl = SERVICE_BASE_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    newsService = TestBed.inject(NewsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(newsService).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    const ids = [...NEWS_ITEMS_IDS];

    newsService.getTopNewsIds().subscribe((data) => {
      expect(data).toEqual(ids)
      }
    )

    const req = httpTestingController.expectOne(TOP_STORIES_URL);
    expect(req.request.method).toEqual('GET');

    req.flush(ids);

    httpTestingController.verify();
  })

  it('getNewsItemsByIds() returns an array of NewsItems', fakeAsync(() => {
    const hackerNewsItems = [...NEWS_ITEMS_IDS];
    const newsItems = [...NEWS_ITEMS];
    const newsItemsIds = [...NEWS_ITEMS_IDS];
    const hackerNewsAuthors = [...HACKER_NEWS_AUTHORS];

    newsService.getNewsItemsByIds(hackerNewsItems).subscribe(data =>{
        expect(data).toBeDefined();
        data.forEach((item: NewsItem, index) => {
          expect(item).toEqual(newsItems[index]);
        })
      }
    )

    const testNewsRequests: TestRequest[] = [];

    newsItemsIds.forEach((id: number, index: number) => {
      testNewsRequests.push(httpTestingController.expectOne(NEWS_ITEM_BY_ID_URL(id)));

      const newsItemReq = testNewsRequests[index];
      expect(newsItemReq.request.method).toEqual('GET');
      newsItemReq.flush(HACKER_NEWS_MAP.get(id) as any);
    });

    const testAuthorRequests: TestRequest[] = [];

    newsItemsIds.forEach((id: number, index: number) => {
      testAuthorRequests.push(httpTestingController.expectOne(AUTHOR_BY_ID_URL(hackerNewsAuthors[index].id)))

      const authorReq = testAuthorRequests[index];
      expect(authorReq.request.method).toEqual('GET');
      console.log(HACKER_NEWS_AUTHORS[index]);
      authorReq.flush(HACKER_NEWS_AUTHORS[index] as any);
    })
  }))
});
