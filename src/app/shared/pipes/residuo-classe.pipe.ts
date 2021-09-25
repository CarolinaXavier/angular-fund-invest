import { Residuo } from '@app/modules/residuos/models/residuo.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'residuoClasse'
})
export class ResiduoClassePipe implements PipeTransform {
  transform(residuos: Residuo[], classe: number): any {
    return residuos.filter(r => r.classe === classe);
  }
}
