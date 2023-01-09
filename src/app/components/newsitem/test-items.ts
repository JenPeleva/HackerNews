import {HackerNewsAuthor, HackerNewsItem} from './news.service';
import {NewsItem} from "../../app.component";

export const NEWS_ITEMS_IDS = [34236831, 34245841];

export const HACKER_NEWS_0: HackerNewsItem = {
  'by': 'amalgamated_inc',
  'descendants':1,
  'id': NEWS_ITEMS_IDS[0],
  'kids':[
  34263311
  ],
  'score':15,
  'text':'My #2 in a string of websites I&#x27;m trying to make this year.<p>When evaluating freelancing offers, I found myself writing a little script that did the math on how much more I&#x27;d need to charge.<p>Days off, self employment tax, health insurance.. lots of factors.<p>This simple web calculator does it for you.<p>Let me know if you have any feedback or additional factors I&#x27;ve forgotten to add!',
  'time':1672774689,
  'title':'Show HN: Freelancer Salary, calculator to match full time salaries',
  'type':'story',
  'url':'https://freelancersalary.com/'
}

export const HACKER_NEWS_1: HackerNewsItem = {
  "by":"raybb",
  "descendants":1,
  "id":34245841,
  "kids":[
    34248038
  ],
  "score":9,
  "time":1672842515,
  "title":"Man wrongly jailed by facial recognition, lawyer claims",
  "type":"story",
  "url":"https://www.theregister.com/2023/01/03/facial_recognition_jail/"
};

export const HACKER_NEWS_AUTHOR_0: HackerNewsAuthor = {
  "created":1668308951,
  "id":"amalgamated_inc",
  "karma":173,
  "submitted":[
    34294816,
    34294797,
    NEWS_ITEMS_IDS[0]
  ]
}

export const HACKER_NEWS_AUTHOR_1: HackerNewsAuthor = {
  "about": "@rayscript on Twitter",
  "created":1465705684,
  "id":"raybb",
  "karma":4284,
  "submitted":[
    34277088,
    34273678,
    NEWS_ITEMS_IDS[1]
  ]
}

export const AUTHOR_0 = {
  id: HACKER_NEWS_AUTHOR_0.id,
  karmaScore: HACKER_NEWS_AUTHOR_0.karma
};
export const AUTHOR_1 = {
  id: HACKER_NEWS_AUTHOR_1.id,
  karmaScore: HACKER_NEWS_AUTHOR_1.karma
};
export const HACKER_NEWS_AUTHORS: Array<HackerNewsAuthor> = [
  HACKER_NEWS_AUTHOR_0,
  HACKER_NEWS_AUTHOR_1
];
export const NEWS_ITEMS: NewsItem[] = [
  {
    title: HACKER_NEWS_0.title,
    score: HACKER_NEWS_0.score,
    url: HACKER_NEWS_0.url,
    author: AUTHOR_0,
    timestamp: HACKER_NEWS_0.time,
  },
  {
    title: HACKER_NEWS_1.title,
    score: HACKER_NEWS_1.score,
    url: HACKER_NEWS_1.url,
    author: AUTHOR_1,
    timestamp: HACKER_NEWS_1.time,
  }
]

export const HACKER_NEWS_MAP = new Map<number, HackerNewsItem>(
  [
    [ NEWS_ITEMS_IDS[0], HACKER_NEWS_0],
    [ NEWS_ITEMS_IDS[1], HACKER_NEWS_1]
  ]
)
