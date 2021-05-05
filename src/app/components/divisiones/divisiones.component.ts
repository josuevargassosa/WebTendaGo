import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-divisiones',
  templateUrl: './divisiones.component.html',
  styleUrls: ['./divisiones.component.scss'],
})
export class DivisionesComponent implements OnInit {


  @Input() divisionC:[];
  @Output() propagar = new EventEmitter<string>();
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() regresarInicio: EventEmitter<any> = new EventEmitter();

  //Variables
  productosDiv = [];
  pageActual: number = 1
  nombreDivision;

  constructor(private data: DataService, private router: Router, private modal:ModalController) { }

  ngOnInit() {
    console.log('Divisones', this.divisionC);
    
    if (this.divisionC.length == 0) {
      console.log('No tiene datos');
    } else {
      console.log('Si tiene datos');
    }
  }

  home() {
    this.regresarInicio.emit('Este dato viajará hacia el padre');
  }

  verProducto(id) {
    console.log(id);
    this.open.emit(id);
    // this.router.navigate(['/producto', id])
  }

}
