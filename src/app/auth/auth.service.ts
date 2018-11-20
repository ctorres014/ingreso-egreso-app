import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// ES6 Modules or TypeScript
import swal from 'sweetalert2';
// firebase type
import * as fireBase from 'firebase';
//Rxjs
import { map } from 'rxjs/operators';
import { User } from './user.model';


@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private afDB: AngularFirestore,
              private _router: Router) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: fireBase.User) => {
      console.log(fbUser);
      // fbUser.getIdToken().then(token => { console.log( token );
      // });

    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
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
                                });

    })
    .catch(err => {
      swal('Error en el login', err.messagge, 'error');
    });
  }
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(result => {
      // console.log(result);
      this._router.navigate(['/']);
    })
    .catch(err => {
      swal('Error en el login', err.messagge, 'error');
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
