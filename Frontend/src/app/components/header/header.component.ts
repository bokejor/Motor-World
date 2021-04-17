import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  contentMenu: Array<object>;
  contentSubmenu: Array<object>;
  isAuth: boolean;

  @Output() clickButtonPublicar: EventEmitter<any>

  constructor() { 

    this.contentMenu = [
      { path: "/home", name: "HOME"},
      { path: "/motos", name: "MOTOS"},
      { path: "/coches", name: "COCHES"},
      { path: "/comparador", name: "COMPARADOR"},
      { path: "/marcas", name: "MARCAS"}

    ];

    this.contentSubmenu = [
      { path: "/favoritos", name: "Mis Favoritos"},
      { path: "/anuncios", name: "Mis Anuncios"},
           
    ];

    this.clickButtonPublicar = new EventEmitter()

    this.isAuth = false;

  }

  ngOnInit(): void {    
  }

  onClickPublicar(){
    this.clickButtonPublicar.emit();
  }

  onNavClick(){}

  cleanPost(){}

  logout(){}

}
