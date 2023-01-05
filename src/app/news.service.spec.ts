import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {NewsService, SERVICE_BASE_URL, TOP_STORIES_URL} from './news.service';
import {NewsItem} from "./app.component";
import {of} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const AUTHOR_ID = "amalgamated_inc";
const AUTHOR = {
  id: AUTHOR_ID,
  karmaScore: 103
};
const NEWS_ITEMS: NewsItem[] = [
  {
    title: "Show HN: Freelancer Salary, calculator to match full time salaries",
    score: 15,
    url: "https://freelancersalary.com/",
    author: AUTHOR,
    timestamp: 1672774689,
  },
  {
    title: "Man wrongly jailed by facial recognition, lawyer claims",
    score: 9,
    url: "https://www.theregister.com/2023/01/03/facial_recognition_jail/",
    author: {
      id: "raybb",
      karmaScore: 4276
    },
    timestamp: 1672842515,
  }
]

const NEWS_ITEMS_IDS = [34236831, 34245841];

fdescribe('NewsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let newsService: NewsService;
  let baseUrl = SERVICE_BASE_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
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

  fit('can test HttpClient.get', () => {
    newsService.getTopNewsIds().subscribe(data =>
    expect(data).toEqual(NEWS_ITEMS_IDS))

    const req = httpTestingController.expectOne(TOP_STORIES_URL);
    expect(req.request.method).toEqual('GET');

    req.flush(NEWS_ITEMS_IDS);

    httpTestingController.verify();
  })
});
