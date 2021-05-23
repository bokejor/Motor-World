import { Injectable } from '@angular/core';
import { Post } from './../models/post.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class postsService {

  url: string;

  constructor(private http: HttpClient) {

    this.url = 'http://localhost:3030/post';

  }

  getAllPosts(): Promise<any>{

    return this.http.get<any>(this.url).toPromise();

  }
}
