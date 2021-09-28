import { AbstractControl, Validators, FormGroup, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { isArray } from 'util';

export class ValidatorsExtra {

	static atLeastOne(control: AbstractControl): ValidationErrors {
		if (control.value.join('') === '') {
			return { atLeastOne: false };
		}
		return null;
	}

	static requiredFalse(control: AbstractControl): ValidationErrors {
		if (control.value) {
			return { requiredFalse: false };
		}
		return null;
	}

	// FUNÇÃO PARA FAZER FILTRO DE TRIM

	static trimValidators(control: AbstractControl): ValidationErrors {
		return (!control.value || control.value.trim().length > 2)
			? null : { 'required': true };
	}

	static requiredTrim(control: AbstractControl): ValidationErrors {
		console.log('requiredTrim');
		return (!control.value || control.value.trim().length === 0)
			? { 'required': true } : null
	}

	// NÃO PERMITE CAMPOS COM ESPAÇOS EM BRANCO
	static validateCampo(c: AbstractControl) {
		if (!c || !c.value) { return null; }
		let campo = c.value;
		console.log(campo.trim());
		if (!campo.trim()) {
			console.log('entrei aqui');
			return { text: { valid: false } };
		}
	}

	/* static validateCampo(c: FormControl) {
		if (!c || !c.value) { return null; }
		let campo = c.value.trim().replace(/(?:\s|\t|\n|\r)+/g, ' ');
		if (!campo) {
			return { text: { valid: false } };

		}
		return null;
	} */

	static addError(formControl: AbstractControl, error: any) {
		formControl.setErrors(formControl.errors ? { ...formControl.errors, ...error } : error);
	}

	static deleteError(formControl: AbstractControl, errorName: string) {
		if (formControl.errors && formControl.errors[errorName]) {
			delete formControl.errors[errorName];
			if (Object.keys(formControl.errors).length === 0) {
				formControl.setErrors(null);
			}
		}
	}

	static email(control: AbstractControl) {
		if (!control.value) {
			return null;
		}
		return Validators.email(control);
	}

	static coords(control: AbstractControl) {
		if (!control.value) {
			return null;
		}
		if (control.value.match && !control.value.match(/^\-{0,1}[0-9]{1,2}(\.[0-9]{1,6}){0,1}$/g)) {
			return { pattern: 'Padrão invalido, é esperado -{0,1}[0-9]{1,2}(\.[0-9]{1,6}){0,1} ' };
		}
		return null;
	}

	static corHex(control: AbstractControl) {
		let value = control.value;
		let error = { isCorHex: false, value: value };
		if (value) {
			if (typeof value !== 'string') {
				return error;
			}
			if (value.match && !value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g)) {
				return error;
			}
		}
		return null;
	}

	static addressNumber(control: AbstractControl) {
		let value = control.value;
		let error = { validAddressNumber: false };
		if (value) {
			if (typeof value !== 'string' && typeof value !== 'number') {
				return error;
			}
			if (Number(value) <= 0 && value !== 'S/N') {
				return error;
			}
		}
		return null;
	}

	static objectId(control: AbstractControl) {
		let value = control.value;
		let error = { isObjectID: false };
		if (value) {
			if (typeof value !== 'string' || value.length < 24) {
				return error;
			}
		}
		return null;
	}
	static arrayObjHasValue(atributo: string, valor: any) {
		return ((control: AbstractControl) => {
			let value = control.value;
			let error = { invalidAtributoValue: 'O objeto não possui o valor esperado' };
			if (value) {
				if (!isArray(value)) { return error; }
				for (let el of value) {
					if (el[atributo] !== valor) {
						return error;
					}
				}
			}
			return null;
		});
	}
	static validarDatas(menorDataControl: string, maiorDataControl: string) {
		return ((form: FormGroup) => {
			let menor = form.get(menorDataControl);
			let maior = form.get(maiorDataControl);
			const error = { vencimentoInvalido: `${menorDataControl} deve ser menor do que ${maiorDataControl}` };
			if (!menor.value || !maior.value) {
				ValidatorsExtra.deleteError(maior, 'vencimentoInvalido');
				return null;
			}
			if (new Date(maior.value) < new Date(menor.value)) {
				ValidatorsExtra.addError(maior, error);
				return error;
			}
			ValidatorsExtra.deleteError(maior, 'vencimentoInvalido');
			return null;
		});
	}

	static number(control: AbstractControl) {
		let value = control.value;
		let error = { isNumber: false };
		if (!Number(value) || typeof value === 'boolean') {
			return error;
		}
		return null;
	}

	static objectIdArray(control: AbstractControl) {
		let value = control.value;
		let error = { isObjectIDArray: false, value: [] };
		if (value) {
			if (!Array.isArray(value)) {
				return error;
			}
			for (let objectID of value) {
				if (typeof objectID !== 'string' || objectID.length < 24) {
					error.value.push(objectID);
					return error;
				}
			}
		}
		return null;
	}

	static array(control: AbstractControl) {
		let value = control.value;
		let error = { isValidArray: { value: value, expect: 'Array!' } };
		if (value) {
			if (!Array.isArray(value)) {
				return error;
			}
		}
		return null;
	}

	static date(control: AbstractControl) {
		let value = control.value;
		let error = { isDate: false, value: value };
		// if for um do tipo NgbDateStruct tenta converter
		if (value !== undefined && value !== null) {
			if (typeof value === 'string') {
				value = new Date(value);
			}
			if (value instanceof Date === false || isNaN(value)) {
				return error;
			}
		}
		return null;
	}

	static inEnumerateArray(enumareteArray: any[], atributo) {
		return ((control: AbstractControl) => {
			let value = control.value;
			let error = { isInEnumerateArray: false, value: value };
			if (value) {
				if (!enumareteArray.find(el => el[atributo] === value)) {
					return error;
				}
			}
			return null;
		});
	}

	static inEnumerateObject(enumerateObj: any, atributo = null) {
		return ((control: AbstractControl) => {
			let value = control.value;
			let error = { isInEnumerateObject: false, value: value };
			if (value) {
				if (!Object.keys(enumerateObj).find(attr => enumerateObj[attr] === atributo ? value[atributo] : value)) {
					return error;
				}
			}
			return null;
		});
	}

	static moreThanEquals(moreThanEquals: number) {
		return ((control: AbstractControl) => {
			let value = control.value;
			let error = { moreThanEquals: { value: value, expect: moreThanEquals } };
			if (value !== null && value !== undefined) {
				if (Number(value) < moreThanEquals) {
					return error;
				}
			}
			return null;
		});
	}

	static boolean(control: AbstractControl) {
		let value = control.value;
		let error = { isBoolean: false };
		if (typeof value !== 'boolean') {
			return error;
		}
		return null;
	}

	static formatCNPJ(control: AbstractControl) {
		let value = control.value;
		let error = { cnpjFormat: false };
		if (value) {
			if (!value.match(/[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}/g)) {
				return error;
			}
		}
		return null;
	}

	static valor(control: AbstractControl) {
		let value = control.value;
		let error = { formValid: false };
		if (value) {
			return error;
		}
		return null;
	}


	static telefone(control: AbstractControl) {
		let value = control.value;
		let error = { telefoneValid: false };
		if (value) {
			if (!value.match(/\([0-9]{2}\)[0-9]{4}[0-9]?-[0-9]{4}/g)) {
				return error;
			}
		}
		return null;
	}

	static cpf(control: AbstractControl) {
		let cpf = control.value;
		if (cpf === undefined || cpf === null) {
			return { cpfValid: false };
		}

		let cpfClean = cpf.replace(/\./g, '');
		cpfClean = cpfClean.replace('-', '');

		let firstDigito = cpfClean.substring(9, 10);
		let secDigito = cpfClean.substring(10, 11);

		let primDigitoValido = false;
		let secDigitoValido = false;

		let primParte = cpfClean.substring(0, 9);
		let secParte = cpfClean.substring(0, 10);
		let soma = 0;

		let j = 0;
		let number;

		let resto;
		let result;

		for (let i = 10; i >= 2; i--) {
			number = primParte.substring(j, j + 1);
			soma = soma + parseInt(number, 10) * i;
			j++;
		}

		resto = soma % 11;
		result = 11 - resto;
		if (result > 9 && firstDigito === '0') {
			primDigitoValido = true;
		} else if (result <= 9 && parseInt(firstDigito, 10) === result) {
			primDigitoValido = true;
		} else {
			return { cpfValid: false };
		}

		// segundo digito
		j = 0;
		soma = 0;
		for (let i = 11; i >= 2; i--) {
			number = secParte.substring(j, j + 1);
			soma = soma + parseInt(number, 10) * i;
			j++;
		}

		resto = soma % 11;
		result = 11 - resto; if (result > 9 && secDigito === '0') {
			secDigitoValido = true;
		} else if (result <= 9 && parseInt(secDigito, 10) === result) {
			secDigitoValido = true;
		} else {
			return { cpfValid: false };
		}

		if (secDigitoValido && primDigitoValido) {
			return null;
		}

	}

	static validCNPJ(control: AbstractControl) {
		let cnpj = control.value;
		if (!cnpj) {
			return { cnpjValid: false };
		}
		let cnpjClean = cnpj.replace(/\./g, '');
		cnpjClean = cnpjClean.replace('/', '');
		cnpjClean = cnpjClean.replace('-', '');

		let firstDigito = cnpjClean.substring(12, 13);
		let secDigito = cnpjClean.substring(13, 14);

		let primDigitoValido = false;
		let secDigitoValido = false;

		let primParte = cnpjClean.substring(0, 12);
		let secParte = cnpjClean.substring(0, 13);
		let soma = 0;

		let j = 0;
		let number;

		let resto;
		let result;

		for (let i = 5; i >= 2; i--) {
			number = primParte.substring(j, j + 1);
			soma = soma + parseInt(number, 10) * i;
			j++;
		}

		for (let i = 9; i >= 2; i--) {
			number = primParte.substring(j, j + 1);
			soma = soma + parseInt(number, 10) * i;
			j++;
		}

		resto = soma % 11;
		result = 11 - resto;
		if (resto < 2 && firstDigito === '0') {
			primDigitoValido = true;
		} else if (resto >= 2 && parseInt(firstDigito, 10) === result) {
			primDigitoValido = true;
		} else {
			return { cnpjValid: false };
		}

		// segundo digito
		j = 0;
		soma = 0;
		for (let i = 6; i >= 2; i--) {
			number = secParte.substring(j, j + 1);
			soma = soma + parseInt(number, 10) * i;
			j++;
		}

		for (let i = 9; i >= 2; i--) {
			number = secParte.substring(j, j + 1);
			soma = soma + parseInt(number, 10) * i;
			j++;
		}

		resto = soma % 11;
		result = 11 - resto;

		if (resto < 2 && secDigito === '0') {
			secDigitoValido = true;
		} else if (resto >= 2 && parseInt(secDigito, 10) === result) {
			secDigitoValido = true;
		} else {
			return { cnpj: false };
		}

		if (secDigitoValido && primDigitoValido) {
			return null;
		}
	}

	static duplicated(values: string[]): ValidatorFn {
		return (control: AbstractControl): ValidationErrors =>
			values.find(val => val.trim() === control.value.trim())
				? { duplicated: true } : null;
	}

	static removeEspacoBranco(value: string) {
		console.log(value.trim());
		return value.trim();
	}
}
