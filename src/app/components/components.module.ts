import { InicioComponentComponent } from './shop/inicio-component/inicio-component.component';
import { ProductoComponent } from './producto/producto.component';
import { DivisionesComponent } from './divisiones/divisiones.component';
import { MyAccountComponent } from './account/my-account/my-account.component';
import { LoginComponent } from './account/login/login.component';
import { EditarPerfilComponent } from './account/editar-perfil/editar-perfil.component';
import { HeaderPageComponent } from './headers/header-page/header-page.component';

import { HeaderInicioComponent } from './headers/header-inicio/header-inicio.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { IonicModule, } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  entryComponents: [
    HeaderInicioComponent,
    HeaderPageComponent,
    EditarPerfilComponent,
    LoginComponent,
    MyAccountComponent,
    DivisionesComponent,
    ProductoComponent,
    InicioComponentComponent
  ],
  declarations: [
    HeaderInicioComponent,
    HeaderPageComponent,
    EditarPerfilComponent,
    LoginComponent,
    MyAccountComponent,
    DivisionesComponent,
    ProductoComponent,
    InicioComponentComponent
    
  ],
  exports: [
    HeaderInicioComponent,
    HeaderPageComponent,
    EditarPerfilComponent,
    LoginComponent,
    MyAccountComponent,
    DivisionesComponent,
    ProductoComponent,
    InicioComponentComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxPaginationModule,
    MatMenuModule
  ]
})
export class ComponentsModule { }
