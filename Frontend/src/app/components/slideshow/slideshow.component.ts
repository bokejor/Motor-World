import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Banners } from 'src/app/models/banners.model';
import {NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.sass'],
  providers: [NgbCarouselConfig]
})
export class SlideshowComponent implements OnInit {	
  
	paused: boolean;
	position: number;
	url: Array<string>;

	showNavigationIndicators = false;

	@Output() clickButtonPublicar: EventEmitter<any>
	@Input() banners: Banners;	

	constructor(config: NgbCarouselConfig, private router: Router, private activatedRoute: ActivatedRoute) { 

		this.clickButtonPublicar = new EventEmitter()			
    	config.showNavigationIndicators = false;
		this.url = [ 'home', 'motos', 'coches', 'comparador', 'marcas' ];	
						
	}

	ngOnInit(): void {	
	}

	onClickPublicar(){
		this.clickButtonPublicar.emit()
	}	

	onSlide(slideEvent: NgbSlideEvent){	
			
	
		this.activatedRoute.data.subscribe (data => {

			this.position = data.id;
			
		})
		
		if(slideEvent.source === NgbSlideEventSource.ARROW_LEFT){

			this.position === 0 ? this.position = 4 : this.position--;		
			
		}

		if(slideEvent.source === NgbSlideEventSource.ARROW_RIGHT){

			this.position === 4 ? this.position = 0 : this.position++;		
		
		}	

		this.router.navigate([this.url[this.position]]);

	}

}


