import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Plugins } from "@capacitor/core";

const {Storage} = Plugins

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  productos = [
    {
      nombre: 'Camiseta negra',
      precio: 155,
      descripcion: 'La mejor camisa del mercado',
      urlImage: 'https://tendago.binasystem.com/Images/TendaGO-horizontal.png'
    }
  ]

  options = {
    step: 1,
    min: null,
    max: null,
    disabled: false,
    readonly: false
};

  plataforma = '';
  dataCarrito = [];
  counter: number = 0;
  dataUser;

  carritoArr = [];

  constructor(
    public platform: Platform, 
    private dataservice: DataService,
    private router: Router
    ) {
    console.log('Constructor Carrito');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter Carrito');

    // Traer datos del storage del usuario
    const dataUser = localStorage.getItem("user");
    this.dataUser = JSON.parse(dataUser);



    // Traer datos del storage del carrito temporal
    const data = localStorage.getItem("carrito");

    this.dataCarrito = JSON.parse(data);
    console.log(this.dataCarrito);
  }

  ngOnInit() {

    const data = localStorage.getItem("carrito");

    this.dataCarrito = JSON.parse(data);
    console.log(this.dataCarrito);

    this.plataforma = this.dataservice.getPlatform();

    // const ret = await Storage.get({ key: '1' });
    // this.dataCarrito = JSON.parse(ret.value);
    // console.log('Data storage', this.dataCarrito);
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

  home() {
    // const url = "/tabs/inicio?seccion='inicio'";
    // this.router.navigateByUrl(url);


    // this.router.navigate(['tabs/inicio', seccion.split('/')[0]]);

    this.router.navigateByUrl('/tabs/inicio');
  }

  inicio() {
    this.router.navigateByUrl('/tabs/inicio');
  }

  perfil() {
    this.router.navigateByUrl('/tabs/perfil');
  }

  carrito() {
    this.router.navigateByUrl('/tabs/carrito');
  }

  input(): void {
    // this.onChange(this.value);
  }

  onTouched = () => {};

  // JSON "set" example
  comprar() {

    const dataUser = localStorage.getItem("user");

  }

  quitarProducto(item) {

    console.log('Producto', item)
    const dataCarrito = localStorage.getItem("carrito");

    if(dataCarrito) {
      this.carritoArr = JSON.parse(dataCarrito);
      console.log('Datos carritos', this.carritoArr);

      const existe = this.carritoArr.findIndex( prod => prod.producto.Id == item.producto.Id)

      
      console.log('Existe', existe);

      if ( existe !== -1 ) {
        this.carritoArr.splice( existe, 1 );
        console.log('Nuevo arr', this.carritoArr);
        this.dataCarrito = [];
        this.dataCarrito = this.carritoArr;
        localStorage.setItem("carrito",JSON.stringify(this.carritoArr))
      } else {
        console.log('No entro arr', this.carritoArr);
      }


    } else {
      
    }

    // localStorage.removeItem('carrito','red')
  }

  // JSON "get" example
  async getObject() {
    const ret = await Storage.get({ key: 'compra' });
    this.dataCarrito = JSON.parse(ret.value);
    console.log('Data storage', this.dataCarrito);
  }



}
