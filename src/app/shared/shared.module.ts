import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class SharedModule {}
