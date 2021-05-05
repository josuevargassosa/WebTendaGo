import { Router } from '@angular/router';
import { DataService } from './../../../services/data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss'],
})
export class HeaderPageComponent implements OnInit {

  textoBuscar = '';
  productos = false;
  productosLista: any[] = [];
  listaproductos:any = [];

  plataforma;
  @Output() propagar2 = new EventEmitter<string>();

  @Output() close: EventEmitter<any> = new EventEmitter();

  @Output() busqueda: EventEmitter<any> = new EventEmitter();

  @Output() resultados: EventEmitter<any> = new EventEmitter();
  
  constructor(private dataservice: DataService,private router: Router) { }

  ngOnInit() {
    this.plataforma = this.dataservice.getPlatform();
    this.dataservice.getProductos().then( (elem:any) => {
      elem.forEach( produc => {
        this.listaproductos.push(produc);
      });
      // console.log('Productos',this.listaproductos);
    })
  }

  home2() {
    console.log('click iamgen');
    this.close.emit('Este dato viajará hacia el padre');
  }

  perfil() {
    this.router.navigateByUrl('/tabs/perfil');
  }

  carrito() {
    this.router.navigateByUrl('/tabs/carrito');
  }

  search(producto) {
    this.productos = true;
    console.log('value',producto);
    this.resultados.emit(producto);
  }

  buscar(event) {

    this.busqueda.emit(event);

  }

}
