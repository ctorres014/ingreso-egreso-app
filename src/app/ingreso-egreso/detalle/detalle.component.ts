import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgresoModel[];
  detalleSubs: Subscription = new Subscription();

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
   this.detalleSubs = this.store.select('ingresoEgreso')
              .subscribe(data => {
                this.items = data.items;
              });
  }

  borrarItem(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
                              .then(() => {
                                swal('Borrado', `El detalle ${uid} fue eliminado`, 'success');
                              }).catch( err => console.log(err));
  }
  ngOnDestroy() {
    this.detalleSubs.unsubscribe();
  }
}
