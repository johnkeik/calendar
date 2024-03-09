import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ModalService } from '../components/modal/modal.service';
import { inject } from '@angular/core';
import { Database, object, ref, set, list } from '@angular/fire/database';
import { ReservationService } from '../services/reservation.service';
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  segment: Date;
  @ViewChild('modalView', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];
  reservationData: any[] = [];
  private subscription: Subscription;
  constructor(
    private modalService: ModalService,
    private reservationService: ReservationService,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.subscription = this.reservationService.getData().subscribe((data) => {
      if (!data) return;
      this.events = Object.keys(data).map((date) => {
        console.log('changing');
        const timeStart = parseInt(date, 10);
        const event: CalendarEvent = {
          title: 'booked',
          start: new Date(timeStart),
          end: new Date(timeStart + 30 * 60 * 1000),
          color: { primary: 'grey', secondary: 'lightgrey' },
        };
        return event;
      });
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  test() {}

  addEvent(timeStart: number): void {
    this.reservationService.addData(timeStart);
    // this.events = [
    //   ...this.events,
    //   {
    //     title: 'Booked',
    //     start: new Date(timeStart),
    //     end: new Date(timeStart + 30 * 60 * 1000),
    //     color: { primary: 'grey', secondary: 'lightgrey' },
    //   },
    // ];
  }

  segmentClicked(event: any, view: TemplateRef<Element>) {
    this.segment = event.date;
    // if (
    //   new Date(event.date).getTime() >=
    //   new Date().getTime() + 60 * 60 * 1000
    // ) {
    //   this.addEvent(new Date(event.date).getTime());
    //   this.modalService.open(this.vcr, view, {
    //     animations: {
    //       modal: {},
    //       overlay: {
    //         enter: 'fade-in 0.8s',
    //         leave: 'fade-out 0.3s forwards',
    //       },
    //     },
    //     size: {
    //       width: '40rem',
    //     },
    //   });
    // }
    this.addEvent(new Date(event.date).getTime());
  }

  close() {
    this.modalService.close();
  }
}
