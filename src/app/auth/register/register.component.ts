import { Component, OnInit } from '@angular/core';
// Service
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit(data: any) {
    this._authService.crearUsuario(data.nombre, data.email, data.password);
  }
}
