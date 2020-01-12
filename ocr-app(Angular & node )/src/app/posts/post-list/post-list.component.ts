import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Post } from "../post.module";
import { PostService } from '../post.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  userAuthonticated = false;
  private postSub: Subscription;
  private authServiceSubscribe: Subscription;

  constructor(public postService: PostService , private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage , this.currentPage);
    this.postSub = this.postService.getPostUpdateListner()
      .subscribe( (postData : {posts : Post[] , postsCount : number} ) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postsCount;
      });
    this.userAuthonticated = this.authService.getIsAuth();
    this.authServiceSubscribe = this.authService.getAuthStatusListner()
      .subscribe(
        isAuthonticated => {
        this.userAuthonticated = isAuthonticated;
      }
    );

  }
  onPageChange(postsData : PageEvent){
    this.currentPage = postsData.pageIndex + 1;
    this.postsPerPage = postsData.pageSize;
    this.postService.getPosts(this.postsPerPage , this.currentPage)
  }

  onDelete(postId : string){
    this.postService.postDelete(postId)
    .subscribe(()=>{
      this.postService.getPosts(this.postsPerPage , this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authServiceSubscribe.unsubscribe();
  }

}
