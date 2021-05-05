import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from "@capacitor/core";

const {LocalStorage} = Plugins


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(    
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController
  ) {

    this.platform.ready().then(() => {
    });

  }


  login(data) {

    localStorage.getItem("users");
    
    // this.storage.get('users').then( (result) => {
    //   console.log('Data storage', result, 'Data login', data)
    //   if (result) {
    //     if (data.correo == result.correo && data.clave == result.clave) {
    //       console.log('Coincide datos');
    //       this.router.navigateByUrl('/tabs/inicio');
    //     } else {
    //       console.log('NO Coincide datos');
    //     }
    //     console.log('Esta registrado');
    //   } else {
    //     console.log('NO esta registrado');
    //   }
    // })

  }

  registro(datos) {

    localStorage.setItem(
      "users",
      JSON.stringify(datos)
    )


  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
