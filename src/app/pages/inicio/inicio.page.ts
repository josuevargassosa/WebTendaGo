import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IonSearchbar, Platform, ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  seccion = this.route.snapshot.paramMap.get('seccion');

  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  @Output()
  propagar = new EventEmitter<string>();
  
  @Output()
  propagar2 = new EventEmitter<string>();

  @Output()
  verDetalle = new EventEmitter<string>();


  @ViewChild(IonSearchbar) ionSearchbar: IonSearchbar ;


  // Variables
  segmentos2 = []
  segmentos = [1,1,1,1,1,1,1,1];
  listaproductos:any = [];
  filtroLista: any = [];
  filtro = [];

  carritoArr = [];

  divisionI = '';
  divisionArreglo = [];
  divisionInterfaz = false;
  detalleProductoP;
  pageActual: number = 1
  plataforma = '';
  textoBuscar = '';
  productosLista: any[] = [];
  buscando = false;
  slideOpts = {
    slidesPerView: 1,
    // freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  constructor(public dataservice: DataService, public platform: Platform,
    private router: Router, private menu: MenuController,
    private route: ActivatedRoute, public modalController: ModalController) {
      this.seccion = 'inicio';
      console.log(this.seccion);
     }

  ngOnInit() {

    // this.seccion = this.route.snapshot.paramMap.get('seccion');

    this.seccion = 'inicio';
    console.log(this.seccion);

    // this.route.paramMap.subscribe( params => {
    //   this.seccion = params.get('seccion');    
    //   console.log(this.seccion);
    // });

    this.plataforma = this.dataservice.getPlatform();

    this.dataservice.getDivisiones().then( (elem:any) => {
      elem.forEach( produc => {
        this.segmentos2.push(produc);
      });
    })

    // this.datosEmpresa = this.dataservice.getEmpresa();

    // this.dataservice.getProductos().then( (elem:any) => {
    //   elem.forEach( produc => {

    //     this.dataservice.getEmpresa(produc.IdEmpresa).subscribe( res => {
    //       const data = [
    //         {
    //           producto: produc,
    //           empresa: res
    //         }
    //       ] 

    //     })
    //     this.listaproductos.push(produc);
    //   });
    //   console.log('Productos',this.listaproductos);
    // })
  }

  input(event) {
    console.log('Ingreso',event); 

    this.seccion = 'resultados';
    console.log(this.seccion);

    this.filtroLista = this.listaproductos.slice(-10)
    console.log(this.filtroLista);
    this.filtro = this.listaproductos;
  }

  filterList(event) {
    console.log('filtrando',event); 
    const searchTerm = event.srcElement.value;
    console.log(searchTerm);

    if(!searchTerm) {
      console.log('!return');
      this.filtroLista = this.filtro;
      return;

    }
    this.filtroLista = this.filtro;
    this.filtro = this.filtroLista = this.filtroLista.filter((elemt:any) => {
    if (elemt && searchTerm) {
      // console.log(elemt);
      return (elemt.Producto.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      };
    });
  }

  search(producto) {
    this.seccion = 'resultados';
    console.log(this.seccion);

    console.log('value',producto);
  }

  cancelSearch() {

    this.seccion = 'inicio';

  }


  segmentChanged(event) {

    this.seccion = 'division';
    console.log(this.seccion);


    this.textoBuscar = '';
    this.divisionArreglo = [];
    this.divisionInterfaz = false;
    this.divisionI = event.target.value;
    console.log(this.divisionI);

    this.dataservice.getProductosDivision(this.divisionI).then( (elem:any) => {
      console.log('Divisiones Pagina', elem);
        elem.forEach( produc => {
        this.divisionArreglo.push(produc);
      });
    });

  }

  regresarHome(event) {

    this.seccion = 'inicio';
    console.log(this.seccion);

  }

  regresarInicioP(event) {

    this.seccion = 'inicio';
    console.log(this.seccion);
    console.log(event);

  }

  AgregarCarrito (item) {
    console.log(item);
    const dataCarrito = localStorage.getItem("carrito");

    if(dataCarrito) {
      this.carritoArr = JSON.parse(dataCarrito);
    } else {
      
    }

    const arr = {
        producto: item,
        cantidad: 1
    }
    
    this.carritoArr.push(arr);


    localStorage.setItem("carrito",JSON.stringify(this.carritoArr))

  
    this.router.navigateByUrl('/tabs/carrito');
  }

  verDetalles(event) {


    this.seccion = 'detalle';
    console.log(event);
    this.detalleProductoP = event;
  }

  home() {

    this.seccion = 'inicio';
    console.log(this.seccion);

  }

  regresarInicio() {

    this.seccion = 'inicio';
    console.log(this.seccion);
  }

  regresarDivision(division) {

    this.seccion = 'division';
    this.dataservice.getProductosDivision(division).then( (elem:any) => {
      console.log('Divisiones Pagina', elem);
        elem.forEach( produc => {
        this.divisionArreglo.push(produc);
      });
    });
    console.log(division);
  }

  perfil() {
    this.router.navigateByUrl('/tabs/perfil');
  }

  carrito() {
    this.router.navigateByUrl('/tabs/carrito');
  }

  busquedaInicio(event) {

    this.seccion = 'busqueda';
    console.log(this.seccion);

    const valor:string = event.detail.value;
    this.buscando = true;

  if(valor.length === 0) {
    this.seccion = 'inicio';
    this.productosLista = [];
    return;
    }

    this.dataservice.postBuscarProductos(valor).then((resp:any) => {
    console.log(resp);
    this.productosLista = resp;
    this.buscando = false;
    });
    console.log(valor);
  }

}
