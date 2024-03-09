import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { ReservationService } from './services/reservation.service';

@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
  ],
  declarations: [AppComponent],
  exports: [],
  bootstrap: [AppComponent],
  providers: [ReservationService],
})
export class AppModule {}
