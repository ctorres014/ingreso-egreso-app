import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsActions, UnSetItemsActions } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  ingresoEgresoListenerSubs: Subscription = new Subscription();
  ingresoEgresoItemsSubs: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore,
              private authService: AuthService,
              private store: Store<AppState>) { }

  initIngresoEgresoListener() {
   this.ingresoEgresoListenerSubs = this.store.select('auth')
    // Mediante el operador pipe permite transformar la respuesta
    // y con el operador filter permite establecer una condicion
    // para ejecutar el subscribe en caso de true sino no se ejecuta
              .pipe(
                filter( auth => auth.user != null)
              )
              .subscribe(auth => { this.ingresoEgresoItem(auth.user.uid); });
  }

  private ingresoEgresoItem(uid: string) {
   this.ingresoEgresoItemsSubs = this.afDB.collection(`${uid}/ingresos-egresos/item`)
              .snapshotChanges()
              .pipe(
                map( docData => {
                  return docData.map( doc => {
                    return { uid: doc.payload.doc.id,
                            ...doc.payload.doc.data()
                           };
                  });
                })
              )
              .subscribe((coleccion: any) => {
                this.store.dispatch(new SetItemsActions(coleccion));
              });
  }
  cancelarSubs() {
    this.ingresoEgresoItemsSubs.unsubscribe();
    this.ingresoEgresoListenerSubs.unsubscribe();
    this.store.dispatch( new UnSetItemsActions());
  }
  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {
    const user = this.authService.getUsuario();
    // ingresos-egresos => Nombre de la coleccion
    // item => sub collection de ingresos-egresos
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
              .collection('item').add({...ingresoEgreso});
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/item/${uid}`)
              .delete();
  }


}
