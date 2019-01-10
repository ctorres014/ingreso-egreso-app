import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UnSetUserAction } from '../../auth/auth.actions';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  userName: string;
  subscriptionAuth: Subscription = new Subscription();

  constructor(public _authService: AuthService,
              private _ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
   this.subscriptionAuth = this.store.select('auth')
              .pipe(
                filter( auth => auth.user != null)
              )
              .subscribe( auth => {
                this.userName = auth.user.nombre;
              });
  }
  logOut() {
    this._authService.logout();
    this._ingresoEgresoService.cancelarSubs();
    this.store.dispatch( new UnSetUserAction());
  }
  ngOnDestroy() {
    this.subscriptionAuth.unsubscribe();
  }
}
