import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/components/news-feed/post';
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiServerUrl}/forumCrud/ListOfPosts`);
  }
  public addIPost(Post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiServerUrl}/posts/addPostupload`, Post);
  }


  public deleteIPost(PostId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/posts/DeletePost  ${PostId}`);
  }
}


