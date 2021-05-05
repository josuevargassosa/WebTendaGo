import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../../services/data.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-inicio-component',
  templateUrl: './inicio-component.component.html',
  styleUrls: ['./inicio-component.component.scss'],
})
export class InicioComponentComponent implements OnInit {


  @Output() detalleProd: EventEmitter<any> = new EventEmitter();

  plataforma;
  productos=[];
  datosEmpresa:any;

  informacionAdic = [
    {
      titulo: "Free Shipping",
      subtitlo: "Para ordenes mayore de $50",
    },
    {
      titulo: "Support 24/7",
      subtitlo: "Call us time",
      
    },
    {
      titulo: "100% Safety",
      subtitlo: "Only secure payments",
      
    },
    {
      titulo: "Hot Offers",
      subtitlo: "Discounts up to 90%",
      
    },
  ]

  slideOpts = {
    slidesPerView: 1,
    autoplay:true,
    speed: 100,
  };

  slideOptsDestacados = {
    slidesPerView: 4.3,
  };

  slideOptsDestacadosMovil = {
    slidesPerView: 1,
  };


  constructor(
    private dataservice: DataService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.plataforma = this.dataservice.getPlatform();
    this.dataservice.getEmpresa().then( res => {
      // console.log('Datos de la empresa',res);
      this.datosEmpresa = res;
    })

    this.dataservice.getProductos().then( (item:any) => { 
      this.productos = item.slice(0,10)
    });
  }

  verDetalleProd(id) {
    this.detalleProd.emit(id);
  }

  verEmpresa(id) {
    console.log('Ver empresa');
    const ruta = (`/perfil-empresa/${id}`)
    this.router.navigateByUrl(ruta);
  }

}
