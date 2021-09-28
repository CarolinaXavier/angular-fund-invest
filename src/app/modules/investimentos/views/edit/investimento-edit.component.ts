import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FormCustomValidator } from '../../../../core/services/formCustomValidator.service';
import { ModalService } from '../../../../core/services/modal.service';
import { InvestimentoDados } from '../../model/investimento.model';
import { FormField } from '../../model/resgateinvestimento.formfield';

@Component({
  selector: 'app-investimento-edit',
  templateUrl: './investimento-edit.component.html',
  styleUrls: ['./investimento-edit.component.scss'],
})
export class InvestimentoEditComponent implements OnInit {
  form = new FormGroup({});
  model: InvestimentoDados = new InvestimentoDados();
  formFields: FormField[] = [];
  msgError: string = '';
  totalResgatar: number | 0.0;
  totalResgateInfo: any;
  constructor(
    private formCustom: FormCustomValidator,
    public router: Router,
    private modalService: ModalService,
    private ref: ChangeDetectorRef,
    private utilService: UtilsService
  ) {
    if (
      this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.model
    ) {
      this.model.fromAPI(this.router.getCurrentNavigation().extras.state.model);
    } else {
      this.router.navigateByUrl('/');
      return;
    }
  }

  ngOnInit(): void {
    this.initDinamicFormField();
    this.onHandleUpdateValeu();
  }

  initDinamicFormField() {
    this.model.acoes.map((acao, index) => {
      let formField = new FormField();
      formField.fieldName = 'form' + index;
      acao.formInputName = formField.fieldName;
      this.form.addControl(
        formField.fieldName,
        new FormControl('', [Validators.required])
      );
    });
  }

  onHandleUpdateValeu() {
    this.model.acoes.forEach((acao, index) => {
      acao.valorTotalResgatar = this.onHandleCalculeTotalRegate(
        acao.percentual,
        this.model.saldoTotalDisponivel
      );
    });
  }

  onHandleCalculeTotalRegate(percentual, valorTotalResgatar) {
    const value = (percentual / 100) * valorTotalResgatar;
    return value;
  }

  onHandleKeyup({ valorTotalResgatar, nome }, valorInformado, formInputName) {
    const valorResgate = parseFloat(this.form.get(formInputName).value).toFixed(
      2
    );
    const valorTotalResg = this.utilService.formartCurrency(
      valorTotalResgatar,
      true
    );
    if (valorResgate > valorTotalResgatar) {
      this.openModal(
        'Atenção',
        `O valor informado de ${valorInformado} para resgate da AÇÃO: ${nome} é maior que o disponível de ${valorTotalResg}`,
        true
      );
      this.form.get(formInputName).setValue('');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.openModal(
        'RESGATE EFETUADO COM SUCESSO!',
        'O valor solicitado estará em sua conta em até 5 dias',
        true
      );
    } else {
      this.formCustom.validateAllFormFields(this.form);
      const listAtributeInvalid = this.formCustom.getInvalidFields(this.form);
      if (listAtributeInvalid.length < this.model.acoes.length) {
        this.removeFormValidators();
      } else {
        this.openModal('ATENÇÃO', 'Preencha pelo menos um campo !!!', false);
        this.formCustom.validateAllFormFields(this.form);
      }
    }
  }

  removeFormValidators() {
    this.model.acoes.forEach(({ formInputName }) => {
      const inputValue = this.form.get(formInputName).value;
      if (inputValue == '') this.form.get(formInputName).setValue(0);
    });
    if (this.form.valid) {
      this.openModal(
        'RESGATE EFETUADO COM SUCESSO!',
        'O valor solicitado estará em sua conta em até 5 dias',
        true
      );
      this.clearForm();
    }
  }

  openModal(title: string, msg: string, isButton: boolean) {
    this.modalService.open({
      title: title,
      msg: msg,
      isButton: isButton,
    });
  }

  clearForm() {
    this.model.acoes.forEach(({ formInputName }) => {
      const inputValue = this.form.get(formInputName).value;
      if (inputValue == '') this.form.get(formInputName).setValue('');
    });
    this.ref.detectChanges();
  }
}
