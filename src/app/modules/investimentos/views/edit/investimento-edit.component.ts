import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormCustomValidator } from '../../../../core/services/formCustomValidator.service';
import { InvestimentoDados } from '../../model/investimento.model';
import { FormField } from '../../model/resgateinvestimento.formfield';

@Component({
  selector: 'app-investimento-edit',
  templateUrl: './investimento-edit.component.html',
  styleUrls: ['./investimento-edit.component.scss']
})
export class InvestimentoEditComponent implements OnInit {
  form = new FormGroup({});
  model: InvestimentoDados = new InvestimentoDados();
  formFields: FormField[] = [];

  constructor(private formCustom: FormCustomValidator, public router: Router,) {
    if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.model) {
      console.log(this.router.getCurrentNavigation().extras.state.model);
      this.model.fromAPI(this.router.getCurrentNavigation().extras.state.model);
      console.log(this.model.acoes)
    } else {
      this.router.navigateByUrl("/");
      return;
    }
  }

  ngOnInit(): void {
    /*   this.form = this.formCustom.createForm(this.model);
      console.log(this.form) */
    this.initDinamicFormField();
  }

  initDinamicFormField() {
    this.model.acoes.map((acao, index) => {
      let formField = new FormField();
      formField.fieldName = 'a' + index;
      console.log(formField.fieldName)
      this.form.addControl(formField.fieldName, new FormControl('', Validators.required));
    })
    console.log(this.form)
  }

  onSubmit() {
    alert('clie')
  }
}
