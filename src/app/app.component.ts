import { DataService } from './services/data.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  plataforma = 'movil';

  public appPages = [
    {
      title: 'Inicio',
      url: '/tabs',
      icon: 'home'
    },
    {
      title: 'Carrito',
      url: '/tabs/carrito',
      icon: 'cart'
    },
    {
      title: 'Perfil',
      url: '/tabs/perfil',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private data: DataService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    console.log('Antes del platform');
    this.platform.ready().then(() => {
      console.log('Despues del platform');
      if (this.platform.is('android') || this.platform.is('ios')){
        console.log('movil');
        this.plataforma = 'movil'
        this.data.setPlatform('movil');
      } else {
        console.log('web');
        this.plataforma = 'web'
        this.data.setPlatform('web');
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  Onlogout() {
    
  }
}
