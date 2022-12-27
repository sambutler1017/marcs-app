import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'projects/insite-kit/src/components/modal/modal.component';
import { StoreService } from 'src/service/store-service/store.service';

@Component({
  selector: 'app-delete-store-modal',
  templateUrl: './delete-store-modal.component.html',
  styleUrls: ['./delete-store-modal.component.scss'],
})
export class DeleteStoreModalComponent {
  @ViewChild('deleteStoreModal') modal: ModalComponent;
  @Input() storeId: string;

  modalLoading = false;

  constructor(
    private readonly storeService: StoreService,
    private readonly toastService: ToastrService,
    private readonly router: Router
  ) {}

  onDeleteStore() {
    this.modalLoading = true;
    this.storeService.deleteStore(this.storeId).subscribe({
      next: () => {
        this.modal.close();
        this.modalLoading = false;
        this.toastService.success('Store successfully deleted!');
        this.router.navigate(['/store/overview']);
      },
      error: () =>
        this.toastService.success('Store could not be deleted at this time!'),
    });
  }
}
