import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoPageRoutingModule } from './carrito-routing.module';

import { CarritoPage } from './carrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CarritoPage]
})
export class CarritoPageModule {}
