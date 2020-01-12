import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-scaned-image',
  templateUrl: './scaned-image.component.html',
  styleUrls: ['./scaned-image.component.css']
})
export class ScanedImageComponent implements OnInit {
  text : string;

  constructor(private postsService : PostService) { }

  ngOnInit() {
    this.postsService.getText()
      // .subscribe( response => {
      //   this.text = response.text;
      //   console.log(response.text);
      // })
  }

}
