import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// ES6 Modules or TypeScript
import swal from 'sweetalert2';
// firebase type
import * as fireBase from 'firebase';
// NGRX
import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
//Rxjs
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AppState } from '../app.reducer';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';




@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private afDB: AngularFirestore,
              private store: Store<AppState>,
              private _router: Router) { }
  private userSubscription: Subscription = new Subscription();

  initAuthListener() {
    this.userSubscription = this.afAuth.authState.subscribe((fbUser: fireBase.User) => {
      if(fbUser) {
        this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
                  .subscribe((usuarioObj: any) => {
                    const newUser = new User(usuarioObj);
                    console.log(newUser);
                    this.store.dispatch(new SetUserAction(newUser));
                  });
      } else {
        this.userSubscription.unsubscribe();
      }
      // fbUser.getIdToken().then(token => { console.log( token );
      // });

    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
                    .then( resp => {
                      const user: User = {
                        uid: resp.user.uid,
                        nombre: nombre,
                        email: resp.user.email
                      };

                      this.afDB.doc(`${user.uid}/usuario`)
                                .set(user)
                                .then(() => {
                                  this._router.navigate(['/']);
                                  this.store.dispatch(new DesactivarLoadingAction());
                                });

    })
    .catch(err => {
      swal('Error en el login', err.messagge, 'error');
      this.store.dispatch(new DesactivarLoadingAction());
    });
  }
  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(result => {
      this.store.dispatch(new DesactivarLoadingAction());
      this._router.navigate(['/']);
    })
    .catch(err => {
      swal('Error en el login', err.messagge, 'error');
      this.store.dispatch(new DesactivarLoadingAction());
    });
  }
  logout() {
    this._router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }
  isAuth() {
    return this.afAuth.authState
               .pipe(
                  map(fbUser => {
                    if(fbUser == null) {
                      this._router.navigate(['/login']);
                    }
                    return fbUser != null;
                  })
                );
  }
}
