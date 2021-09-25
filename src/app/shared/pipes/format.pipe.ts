import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import localePtBr from '@angular/common/locales/pt';
@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(value: string, args?: string): any {

    if (!value) { return ''; }

    switch (args) {
      case 'cnpj': return this.cnpj(value);
      case 'cpf': return this.cpf(value);
      case 'cpfcnpj':  return this.cpfcnpj(value);
      case 'currencybr': return this.currencybr(+value);
      default: return value;
    }
  }


  cnpj(value: string): string {
    return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  cpf(value: string): string {
    return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  cpfcnpj(value: string): string {
    value = value.replace(/\D/g, '');

    if (value.length === 11) {
      return this.cpf(value);
    } else if (value.length === 14) {
      return this.cnpj(value);
    }
  }

  currencybr(value: number): any {
    if (!value) { value = 0; }
    return  new CurrencyPipe('BRL').transform(value, 'BRL', true, '1.2-2', 'pt-BR');
  }
}
