import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvestimentoAcoes } from "./investimento.interface";

export enum InvestimentoTipo {
	SEM_CARENCIA = 'S',
	EM_CARENCIA =  'N'
}

export class InvestimentoDados {

	nome: string;
	objetivo: string;
	saldoTotalDisponivel: number;
	indicadorCarencia: string;
	valorTotalResgatar: number | 0.0;
	acoes: InvestimentoAcoes[];
	valoreResgate: number;

	constructor() { }

	public fromAPI(json: any) {
		Object.assign(this, json);
	}
}