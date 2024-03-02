import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponentModule } from './calendar/calendar.module';
import { ModalService } from './components/modal/modal.service';
import { ModalContentComponent } from './components/modal-content/modal-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponentModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'calendar';

  @ViewChild('view', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  constructor(private modalService: ModalService) {}

  openModalTemplate(view: TemplateRef<Element>) {
    this.modalService.open(this.vcr, view, {
      animations: {
        modal: {
          enter: 'enter-slide-down 0.8s',
        },
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

  openModalComponent() {
    this.modalService.open(ModalContentComponent, {
      animations: {
        modal: {
          enter: 'enter-scaling 0.3s ease-out',
          leave: 'fade-out 0.3s forwards',
        },
        overlay: {
          enter: 'fade-in 1s',
          leave: 'fade-out 0.3s forwards',
        },
      },
      size: {
        width: '40rem',
      },
    });
  }

  close() {
    this.modalService.close();
  }
}
