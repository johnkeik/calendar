import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [],
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.scss',
})
export class ModalContentComponent {
  @Input() date: Date;
  @Output()
  close: EventEmitter<void> = new EventEmitter();

  constructor(private modalService: ModalService) {}

  closeModal(): void {
    this.close.emit();
  }
}
