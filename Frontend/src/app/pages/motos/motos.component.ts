import { Component, OnInit } from '@angular/core';
import { Banners } from 'src/app/models/banners.model';
import { Post } from 'src/app/models/post.model';
import { postsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-motos',
  templateUrl: './motos.component.html',
  styleUrls: ['./motos.component.sass']
})
export class MotosComponent implements OnInit {

  banner: Banners;
  arrayPosts: Post[];

  constructor(private postService: postsService) { 

    this.banner =  {
        image: ['../../../../assets/img/home1.png', '../../../../assets/img/home2.png'],
        title: 'MOTOS',
        subtitle: 'Filtra por tu moto preferida',
        button: true
    }

    this.arrayPosts = [];
    
    
   
   }

  async ngOnInit() {

    const response = await this.postService.getAllPosts();       

    this.arrayPosts = response.data;      
 
  }

}
