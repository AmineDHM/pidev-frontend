import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-services/post.service';
import { Post } from './post';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  public posts: Post[] = [];
  title!: string;
  text!: string;
  fileURL!:string;
  username!:any;

  public badWords:string[]=["hello", "test","badword"]
  
  constructor(private postservice : PostService) { }

  ngOnInit(): void {
    this.getAllPosts();
    localStorage.setItem("username","khalil")
    this.username=localStorage.getItem("username");
    
  }
  AddPost() {
    if(this.badWords.find(v => (this.text === v))){
      console.log("ahi !!")
      return;
    }
    else{
      var post={

        title: this.title,
        text: this.text,
        fileURL: this.fileURL
      }
      
      this.postservice.addIPost(post).subscribe(data=>{
        this.getAllPosts();
      });
      this.text=""

    }
   
  }

  public getAllPosts(): void {
    this.postservice.getAllPosts().subscribe(data=>{
     this.posts=data;
    }
    );
  }


  deletePost(id:any){
    this.postservice.deleteIPost(id).subscribe(data=>{
      this.getAllPosts();
    }
    );

  }

  // public searchPosts(key: string): void {
  //   console.log(key);
  //   const results: Post[] = [];
  //   for (const post of this.posts) {
  //     if (post.text.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //      ) {
  //       results.push(post);
  //     }
  //   }
  //   this.posts = results;
  //   if (results.length === 0 || !key) {
  //     this.getAllPosts();
  //   }
  // }
  }


