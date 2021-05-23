import { Component, OnInit } from '@angular/core';
import { Banners } from 'src/app/models/banners.model';
import { Post } from '../../models/post.model';
import { postsService } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  banner: Banners;

  arrayPosts: Post[];

  constructor(private postService: postsService) { 

    this.banner =  {
      image: ['../../../../assets/img/home1.png', '../../../../assets/img/home2.png'],
      title: 'BIENVENIDO A MOTOR WORLD',
      subtitle: 'Compra, vende, publica tu anuncio',
      button: true
  }

    this.arrayPosts = []; 
    
   
   }

   async ngOnInit() {

    const response = await this.postService.getAllPosts();       
    this.arrayPosts = response;
       
 
  }

  cleanPost($event){   
    
  }

}
