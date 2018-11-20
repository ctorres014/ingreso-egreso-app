import { Component, OnInit } from '@angular/core';
// Service
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }
  login(data: any) {
    this._authService.login(data.email, data.password);
  }
}
