import { Component, OnInit, OnDestroy } from '@angular/core';
// Service
import { AuthService } from '../auth.service';
// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
// rxjs
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  cargando: boolean;
  subscription: Subscription;
  constructor(private _authService: AuthService,
              private store: Store<AppState>) { }

  ngOnInit() {
    // I need subscribe at change the UI
    this.subscription = this.store.select('ui')
                                  .subscribe(ui => {
                                    this.cargando = ui.isLoading;
                                  });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSubmit(data: any) {
    this._authService.crearUsuario(data.nombre, data.email, data.password);
  }
}
