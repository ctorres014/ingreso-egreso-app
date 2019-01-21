import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRouteingModule } from './app-routing.module';
// NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// FireBase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// Components
import { AppComponent } from './app.component';
// Enviroment
import { environment } from '../environments/environment';
// Services
import { AuthGuardService } from './auth/auth-guard.service';
// Custom Modules
import { AuthModule } from './auth/auth.module';
// import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    // IngresoEgresoModule,
    AppRouteingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [ AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
