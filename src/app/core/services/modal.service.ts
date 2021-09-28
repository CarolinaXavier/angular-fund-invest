import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef;

  constructor(private ngbModal: NgbModal) {}

  open(props): Promise<any> {
    this.modalRef = this.ngbModal.open(ModalComponent, {
      backdrop: 'static',
    });

    this.modalRef.componentInstance.setDialogProps(props);
    return this.modalRef.result;
  }
}
