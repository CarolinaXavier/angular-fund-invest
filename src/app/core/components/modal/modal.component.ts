import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  private isNovoResgate = false;
  private isButton: any;
  public title = '';
  public msg: any[] = [];

  constructor(public activeModal: NgbActiveModal,
    public router: Router,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit() { }

  setDialogProps(props: any) {
    this.title = props.title || 'Dialog';
    this.msg = props.msg;
    this.isButton = props.isButton;
  }

  actionTaken(result?: any) {
    if (result) {
      this.activeModal.close(JSON.stringify(result));
    } else {
      this.activeModal.close('');
    }
  }

}

