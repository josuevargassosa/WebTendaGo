import { DataService } from './../services/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  plataforma = 'movil';

  constructor(private data:DataService) {}

  ngOnInit() {
    this.plataforma =  this.data.getPlatform();
  }

}
