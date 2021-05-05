import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const {Storage} = Plugins

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

  plataforma;
  @Input() detalleProductoC:any;
  dataProducto;
  division;
  text = "HOLA";
  carrito = [];

  counter: number = 0;

  @Output() regresarDivisionVar: EventEmitter<any> = new EventEmitter();
  @Output() regresarInicioVar: EventEmitter<any> = new EventEmitter();

  constructor(
    private dataservice: DataService, private router: Router) { }

  async ngOnInit() {


    console.log(this.detalleProductoC);
    await this.dataservice.getProductosId(this.detalleProductoC).then( data => {
      this.dataProducto = data;
      this.division = this.dataProducto.Division
      console.log(this.division.toLocaleLowerCase());
    });
    this.plataforma = this.dataservice.getPlatform();
  }

  async AgregarCarrito() {

    

    const dataCarrito = localStorage.getItem("carrito");

    if(dataCarrito) {
      this.carrito = JSON.parse(dataCarrito);
    } else {
      
    }

    const arr = {
        producto: this.dataProducto,
        cantidad: this.counter
    }
    

    this.carrito.push(arr);

    console.log('Datos CARRTIO',this.carrito);

    localStorage.setItem("carrito",JSON.stringify(this.carrito))

    console.log('Datos carrito',this.carrito);
    
    

    this.router.navigateByUrl('/tabs/carrito');
    
  }

  onIncrement() {
    console.log('Incrementar');
    this.counter = this.counter + 1 ;
    console.log(this.counter);
  }

  onDecrement() {
    console.log('Decrementar');
    if (this.counter > 0) {
      this.counter = this.counter - 1
      console.log(this.counter);
    }

  }

  regresarInicio() {
    this.regresarInicioVar.emit();
  }

  regresarDivison() {
    this.regresarDivisionVar.emit(this.dataProducto.Division);
  }

}
