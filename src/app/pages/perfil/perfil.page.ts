import { Storage } from '@ionic/storage';
import { DataService } from './../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  seccion = this.route.snapshot.paramMap.get('seccion');

  dataUser;
  plataforma = '';
  publisherEstado = 'Dashboard'
  perfilComp: boolean;
  loginComp: boolean;
  seccionPerfil;
  perfilSecciones = [
    {
      nombre: 'Dashboard',
      value:"Dashboard"
    },
    {
      nombre: 'Editar Perfil',
      value:"Editar Perfil"
    },
    {
      nombre: 'Historial Ordenes',
      value:"Historial Ordenes"
    },
    {
      nombre: 'Detalles Ordenes',
      value:"Detalles Ordenes"
    },
    {
      nombre: 'Direcciones',
      value:"Direcciones"
    },
    {
      nombre: 'Editar Direccion',
      value:"Editar Direccion"
    },
    {
      nombre: 'Contrasena',
      value:"Contrasena"
    },
    {
      nombre: 'Cerrar Session',
      value:"Cerrar Session"
    },
  ]

  editarPerfil = [
    {
      titulo: 'primer nombre',
    },
    {
      titulo: 'primer nombre',
    },
    {
      titulo: 'primer nombre',
    },
    {
      titulo: 'primer nombre',
    },
  ]

  constructor(
    public platform: Platform, 
    private dataservice: DataService,
    private router: Router, 
    private route: ActivatedRoute,
    private storagee: Storage
  ) { }

  ngOnInit() {

    const data = localStorage.getItem("users");

    const dataJson = JSON.parse(data);

    if (dataJson) {
      this.seccion = 'perfil';
      console.log('Data user', dataJson);
      this.dataUser = dataJson;
    } else {
      this.seccion = 'login';
    }

    this.plataforma = this.dataservice.getPlatform();
  }


  home() {
    this.router.navigateByUrl('/tabs/inicio');
  }

  perfil() {
    this.router.navigateByUrl('/tabs/perfil');
  }

  carrito() {
    this.router.navigateByUrl('/tabs/carrito');
  }

  configuraciones() {
    
  }

  segmentChanged2(event) {
    const valorSegmento = event.detail.value;
    console.log(valorSegmento)
    this.publisherEstado = valorSegmento;

    if (valorSegmento == 'Cerrar Session') {
      localStorage.removeItem('users')
      this.seccion = 'login';
    }

    // this.subs.unsubscribe();
    // this.reservasData(this.publisherEstado);
  }

  // async editarPerfil() {
  //   const modal = await this.modalController.create({
  //     component: EditarPerfilComponent,
  //     cssClass: 'my-custom-class'
  //   });
  //   return await modal.present();
  // }


}
