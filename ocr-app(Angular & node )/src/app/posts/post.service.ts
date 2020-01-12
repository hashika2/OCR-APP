import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs"; 
import { map } from "rxjs/operators";
import { Post } from "./post.module";
import { Router } from '@angular/router';


@Injectable({ providedIn: "root" })
export class PostService{
    
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts :Post[] , postsCount : number}>();
  private textId : string ;

  constructor(private http: HttpClient , private router:Router) {}

  getPosts(postsPerPage : number , currentPage : number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message:string , posts:any , maxPosts: number }>(
      "http://localhost:3000/api/posts" + queryParams
      )
      .pipe(map((postData) => {
        return { posts : postData.posts.map( post => {
          return {
            title : post.title,
            content : post.content,
            id : post._id,
            imagePath: post.imagePath
          };
        }),
        maxPosts : postData.maxPosts
      }
      })) 
      .subscribe( (transformedPostsData ) =>{
        this.posts = transformedPostsData.posts;
        this.postsUpdated.next({posts :[...this.posts] , postsCount: transformedPostsData.maxPosts});
      });
  }

  getPostUpdateListner(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
     return this.http.get<{_id:string , title:string , content: string , imagePath: string}>("http://localhost:3000/api/posts/" + id);
  }

  addPost(title: string, content: string , image : File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image , title);
    this.http.post<{message:string , post : Post}>("http://localhost:3000/api/posts" , postData)
      .subscribe(resposeData => {
        this.router.navigate(["/"]);
      });
  }

  readImage(image:File){
    const postData = new FormData();
    postData.append('image', image);
    this.http.post<{textId:string}>("http://localhost:3000/api/posts/upload" , postData)
    .subscribe(response => {
      this.textId = response.textId;
      console.log("text : "+ response.textId);
    })
  }

  getText(){
    const textId = this.textId;
    console.log("text : "+ textId);
    this.http.get<{text:string}>("http://localhost:3000/api/posts/" +  textId)
    .subscribe(response => {
      console.log(response.text);
    });
  }

  updatePost(postId: string , title: string, content: string , image : File | string ){
    let postData : Post | FormData;
    if(typeof(image) === 'object'){
      postData = new FormData();
      postData.append('title' , title);
      postData.append('content', content);
      postData.append('image', image , title);
    }else{
      postData = { 
        id: postId , 
        title : title , 
        content: content , 
        imagePath : image
      }
    }

    this.http.put<{message:string}>("http://localhost:3000/api/posts/" + postId , postData)
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  postDelete(postId : string){
    return this.http.delete<{message:string}>("http://localhost:3000/api/posts/" + postId)
      // .subscribe(() => {
      //   const updatedPosts = this.posts.filter(post => post.id !== postId);
      //   this.posts = updatedPosts;
      //   this.postsUpdated.next([...this.posts]);
      // });
  }
} 