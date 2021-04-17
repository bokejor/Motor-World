import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.sass']
})
export class SlideshowComponent implements OnInit {

  //VARIABLES PÚBLICAS O GLOBALES

	public slideJson:any;
	public renderSlide:boolean = true;

	@Output() clickButtonPublicar: EventEmitter<any>

	constructor() { 

		this.clickButtonPublicar = new EventEmitter()		

		// this.slideshowService.getSlideshow()
		// .subscribe( respuesta => {
			
		// 	// console.log("respuesta", respuesta)

		// 	this.slideJson = respuesta;

		// })
	}

	ngOnInit(): void {	
		
		/*=============================================
			JD SLIDER
		=============================================*/
		
		// $('.slideshow').jdSlider({

		// 	wrap:'.slide-inner',
		// 	isAuto: true,
		// 	isLoop: true,
		// 	interval: 7000,
		// 	isCursor:true,
		// 	slideShow: 2			
		// });

		$('.slideshow .btn').on('click', () => this.clickButtonPublicar.emit())
		

	}
	

}


