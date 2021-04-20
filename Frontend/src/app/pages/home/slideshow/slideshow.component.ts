import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.sass']
})
export class SlideshowComponent implements OnInit {

	images: string[];

  //VARIABLES PÚBLICAS O GLOBALES

	public slideJson:any;
	public renderSlide:boolean = true;

	@Output() clickButtonPublicar: EventEmitter<any>

	constructor() { 

		this.clickButtonPublicar = new EventEmitter()	
		this.images = [
			'../../../../assets/img/coches.png'			
		]			
	}

	ngOnInit(): void {			

	}

	onClickPublicar(){
		this.clickButtonPublicar.emit()
	}
	

}


