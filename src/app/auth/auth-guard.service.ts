import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(public authService: AuthService) { }

  // El modulo ya se encuentra cargado.
  // Tener en cuenta para el lazyLoad
  canActivate() {
    return this.authService.isAuth();
  }

  // Esto verifica antes de que el modulo sea cargado
  canLoad() {
    return this.authService.isAuth()
                .pipe(
                  // Cuantas notificaciones va a emitir el observable antes
                  // de cancelar la subscripcion
                  take(1)
                );
  }

}
