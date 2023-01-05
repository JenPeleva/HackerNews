import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from 'src/app/app.component';

@Component({
  selector: 'app-newsitem',
  templateUrl: './newsitem.component.html',
  styleUrls: ['./newsitem.component.scss']
})
export class NewsitemComponent implements OnInit {
  @Input() item: NewsItem;
  @Input() imageSrc: string;

  constructor() { }

  ngOnInit(): void {
  }

}
