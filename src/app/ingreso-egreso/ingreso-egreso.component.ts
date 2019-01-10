import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  tipo = 'ingreso';
  cargando: boolean;
  loadingSub: Subscription = new Subscription();

  constructor(private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
   this.loadingSub = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading );
    this.forma = new FormGroup({
      'descripcion': new FormControl('', [Validators.required]),
      'monto': new FormControl(0, [Validators.min(0)])
    });
  }

  crearIngresoEgreso() {
    const ingresoEgreso = new IngresoEgresoModel({ ...this.forma.value, tipo: this.tipo});
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
                              .then(() => {
                                  this.forma.reset({ monto: 0 });
                                  swal('Creado', ingresoEgreso.descripcion, 'success');
                              })
                              .catch(err => { console.log(err); });
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }

}
