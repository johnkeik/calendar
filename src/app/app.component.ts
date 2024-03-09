import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponentModule } from './calendar/calendar.module';

import { SharedModule } from './shared/shared.module';
import { Observable, Subject, Subscription } from 'rxjs';

import { list, ref, Database, set, onValue } from '@angular/fire/database';
import { ReservationService } from './services/reservation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'calendar';
  reservationData: any[] = [];
  private subscription: Subscription;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.subscription = this.reservationService.getData().subscribe((data) => {
      console.log(data);
      this.reservationData = Object.keys(data).map((date) => {
        return { date, ...data[date] };
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addData() {
    this.reservationService.addData();
  }
}
