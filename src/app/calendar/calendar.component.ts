import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ModalService } from '../components/modal/modal.service';
import { inject } from '@angular/core';
import { Database, object, ref, set, list } from '@angular/fire/database';
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  private database: Database = inject(Database);

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  segment: Date;
  @ViewChild('modalView', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  constructor(private modalService: ModalService) {
    console.log(this.database);
  }
  ngOnInit(): void {}

  test() {}

  addEvent(timeStart: number): void {
    this.events = [
      ...this.events,
      {
        title: 'Booked',
        start: new Date(timeStart),
        end: new Date(timeStart + 30 * 60 * 1000),
        color: { primary: 'grey', secondary: 'lightgrey' },
      },
    ];
  }

  segmentClicked(event: any, view: TemplateRef<Element>) {
    this.segment = event.date;
    if (
      new Date(event.date).getTime() >=
      new Date().getTime() + 60 * 60 * 1000
    ) {
      this.addEvent(new Date(event.date).getTime());
      this.modalService.open(this.vcr, view, {
        animations: {
          modal: {},
          overlay: {
            enter: 'fade-in 0.8s',
            leave: 'fade-out 0.3s forwards',
          },
        },
        size: {
          width: '40rem',
        },
      });
    }
  }

  close() {
    this.modalService.close();
  }
}
