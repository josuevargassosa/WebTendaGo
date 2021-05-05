import { Router } from '@angular/router';
import { AuthenticationService } from './../../../services/authentication.service';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginData = {
    correo: '',
    clave: ''
  }

  registroData = {
    correo: '',
    clave: '',
    nombre: '',
  }

  plataforma;

  constructor(
    public dataservice: DataService,
    private auth: AuthenticationService,
    private router: Router
  ) { 

  }

  ngOnInit() {
    this.plataforma = this.dataservice.getPlatform();
  }


  home() {
    this.router.navigateByUrl('/tabs/inicio');
  }

  login() {
    this.auth.login(this.loginData);
    location.reload();
  }


  registro(data) {
    this.auth.registro(data);
    location.reload();
  }
}
