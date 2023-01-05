import { Component, Input, OnInit } from '@angular/core';
import {Author} from "../../app.component";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  @Input() author: Author;

  constructor() { }

  ngOnInit(): void {
  }

}
