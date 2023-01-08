import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from 'src/app/app.component';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  @Input() item: NewsItem;
  @Input() imageSrc: string;
  @Input() srcSet: string;

  constructor() { }

  ngOnInit(): void {
  }
}
