import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvestimentoAcoes } from "./investimento.interface";

export class InvestimentoDados {
	nome: string;
	objetivo: string;
	saldoTotalDisponivel: number;
	indicadorCarencia: string;
	valorTotalResgatar: number | 0;
	acoes: InvestimentoAcoes[];
	valoreResgate: number;
	constructor() { }

	public fromAPI(json: any) {
		Object.assign(this, json);
	}

	public fromFormGroup(form: FormGroup) {
		const value = form.value;
		this.acoes = value.acoes.filter(val => val.acao).map(val => val.acao);
	}

	public toFormGroup() {
		return {
			index : [this.valoreResgate, Validators.required],
		};
	}

}