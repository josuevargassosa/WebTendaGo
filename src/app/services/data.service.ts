
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  platform: string;
  dataUser;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private storage: Storage
  ) { }


  async getUser() {
    await this.storage.get('users').then( resultData => {
      this.dataUser = resultData
      console.log(this.dataUser);
      return this.dataUser;
    })
  }

  getDivisiones(){
    return new Promise(resolve=>{
      this.http.get('http://api.binasystem.com/tendaGO/divisions/all', {headers:{app_token:"645228AE9A064DC7A336D3830674RB53"}}).subscribe(data=>{
          resolve(data);
          // console.log(data);
      },error=>{
        console.log(error);
      });
    });
  }

  //Traer los datos de la empresa
  getEmpresa() {
    return new Promise(resolve=>{
      this.http.get('http://api.binasystem.com/tendaGO/user/company', {headers:{app_token:"645228AE9A064DC7A336D3830674RB53"}}).subscribe(data=>{
          resolve(data);
          console.log(data);
      },error=>{
        console.log(error);
      });
    });
  }

  

  //Todos los datos
  getProductos(){
    return new Promise(resolve=>{
      this.http.get('http://api.binasystem.com/tendaGO/products/all;search=4', {headers:{app_token:"645228AE9A064DC7A336D3830674RB53"}}).subscribe(data=>{
          resolve(data);
          // console.log(data);
      },error=>{
        console.log(error);
      });
    });
  }

  getProductosId(id){
    return new Promise(resolve=>{
      this.http.get(`http://api.binasystem.com/tendaGO/products/${id}`, {headers:{app_token:"645228AE9A064DC7A336D3830674RB53"}}).subscribe(data=>{
          resolve(data);
          console.log(data);
      },error=>{
        console.log(error);
      });
    });
  }

  postBuscarProductos(producto){
    console.log('Id Division', producto);
    return new Promise(resolve=>{
      this.http.post(`http://api.binasystem.com/tendaGO/products/search?`,{
        "StateForSearch": "All",
        "SearchTerm": producto
      }, {headers:{app_token:"645228AE9A064DC7A336D3830674RB53"}}).subscribe(data=>{
          resolve(data);
          // console.log(data);
      },error=>{
        console.log(error);
      });
    });
  }

  getProductosDivision(division){
    console.log('Id Division', division);
    return new Promise(resolve=>{
      this.http.post(`http://api.binasystem.com/tendaGO/products/search?`,{
        "StateForSearch": "All",
        "SearchTerm": division
      }, {headers:{app_token:"645228AE9A064DC7A336D3830674RB53"}}).subscribe(data=>{
          resolve(data);
          // console.log(data);
      },error=>{
        console.log(error);
      });
    });
  }

  segmentosPerfil(segmento) {
    this.router.navigateByUrl(`/perfil/${segmento}`);
  }

  divisionSeleccionada(division) {
    console.log('Hola', division);
    this.router.navigateByUrl(`/inicio/${division}`);
  }

  // Variable indentificador de plataforma
  setPlatform(platform) {
    this.platform = platform
  }

  getPlatform() {
    return this.platform;
  }
}
