import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { PopupService } from 'projects/insite-kit/src/service/popup/popup.service';
import { BlockDatesService } from 'src/service/block-dates-service/block-dates.service';

@Component({
  selector: 'app-delete-block-out-date-modal',
  templateUrl: './delete-block-out-date-modal.component.html',
  styleUrls: ['./delete-block-out-date-modal.component.scss'],
})
export class DeleteBlockOutDateModalComponent {
  @ViewChild('deleteBlockOutDateModal') modal: ModalComponent;
  @Input() blockDateId: number;
  @Output() delete = new EventEmitter<any>();

  loading: boolean;

  constructor(
    private readonly blockDatesService: BlockDatesService,
    private readonly popupService: PopupService
  ) {}

  onDeleteBlockOutDate() {
    this.loading = true;
    this.blockDatesService.deleteBlockOutDate(this.blockDateId).subscribe({
      next: () => {
        this.modal.close();
        this.loading = false;
        this.popupService.success('Block out date successfully deleted!');
        this.delete.emit();
      },
      error: () => {
        this.modal.close();
        this.loading = false;
        this.popupService.error(
          'Could not delete block out date at this time!'
        );
      },
    });
  }
}
