import { Component, Input, OnInit } from '@angular/core';
import {Author} from "../../app.component";
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  @Input() author: Author;
  authorIcon = faUser;
  karmaIcon = faHeart;

  constructor() { }

  ngOnInit(): void {
  }

}
