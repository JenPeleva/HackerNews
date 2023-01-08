import { Component, Input} from '@angular/core';
import { NewsItem } from 'src/app/app.component';
import { Subject} from 'rxjs';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent{
  @Input() item: NewsItem;
  @Input() imageSrc: string;
  @Input() srcSet: string;
  showOverlay: Subject<boolean> = new Subject<boolean>()

  constructor() { }
}
