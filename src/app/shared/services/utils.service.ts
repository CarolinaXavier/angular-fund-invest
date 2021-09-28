import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  formartCurrency(value: number, isSymbol: boolean) {
    console.log(value)
      if (isSymbol)
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
      else
        return new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 3 }).format(value);
  }
}
