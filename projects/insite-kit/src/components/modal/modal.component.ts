import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'ik-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  bootstrap = bootstrap;

  open() {
    $('#baseModal').modal('show');
  }

  close() {
    $('#baseModal').modal('hide');
  }
}
