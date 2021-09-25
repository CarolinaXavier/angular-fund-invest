import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  formartCurrency(value: number, isSymbol: boolean) {
   return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BR' }).format(value);
   
  }
}
