import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.page.html',
  styleUrls: ['./perfil-empresa.page.scss'],
})
export class PerfilEmpresaPage implements OnInit {

  plataforma = 'web';
  datosEmpresa:any;
  listaProductos:any;

  id = this.route.snapshot.paramMap.get('seccion');

  constructor(
    private data: DataService,
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute
  ) { 
    this.plataforma = this.data.getPlatform();
    this.data.getEmpresa().then( res => {
      this.datosEmpresa = res;
    });
  }

  ngOnInit() {
    this.plataforma = this.data.getPlatform();
    this.data.getEmpresa().then( res => {
      this.datosEmpresa = res;
      console.log('Datos empresa pagina empreas', this.datosEmpresa)
    });

    this.data.getProductos().then( res => {
      const data:any = res
      this.listaProductos = data.slice(-6);
      console.log('Data', this.listaProductos);
    });

  }

  regresar() {
    console.log('Regresar');
    this._location.back();
  }

}
