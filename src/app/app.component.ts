import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponentModule } from './calendar/calendar.module';

import { SharedModule } from './shared/shared.module';
import { Observable, Subject, Subscription } from 'rxjs';

import { list, ref, Database, set, onValue } from '@angular/fire/database';
import { ReservationService } from './services/reservation.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, SharedModule, CalendarComponentModule],
  providers: [ReservationService],
})
export class AppComponent implements OnInit {
  title = 'calendar';

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {}
}
