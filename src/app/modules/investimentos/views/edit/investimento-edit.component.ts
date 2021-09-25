import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvestimentoDados } from '../../model/investimento.interface';

@Component({
  selector: 'app-investimento-edit',
  templateUrl: './investimento-edit.component.html',
  styleUrls: ['./investimento-edit.component.scss']
})
export class InvestimentoEditComponent implements OnInit {
  form: FormGroup;
  model:InvestimentoDados;
  constructor(fb: FormBuilder, public router: Router,) {
    this.form = fb.group({
      item: ["", Validators.required]
    });
    if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.model) {
      console.log(this.router.getCurrentNavigation().extras.state.model);
      this.model = this.router.getCurrentNavigation().extras.state.model;
    } else {
      this.router.navigateByUrl("/");
      return;
    }
  }

  ngOnInit(): void {
  }

}
