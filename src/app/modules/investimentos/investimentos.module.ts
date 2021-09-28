import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InvestimentosListComponent } from './views/list/investimentos-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvestimentoEditComponent } from './views/edit/investimento-edit.component';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { BRCurrencyMaskConfig } from 'src/app/shared/config/BRCurrencyMaskConfig';

const routes: Routes = [
  { path: '', redirectTo: 'investimento/list' },
  { path: 'investimento/list', component: InvestimentosListComponent },
  { path: 'investimento/edit', component: InvestimentoEditComponent }
];

@NgModule({
  declarations: [
    InvestimentosListComponent,
    InvestimentoEditComponent
  ],
  entryComponents: [
    InvestimentosListComponent,
    InvestimentoEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedPipesModule,
    CurrencyMaskModule,
  ],
  exports: [RouterModule],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: BRCurrencyMaskConfig }]
})
export class InvestimentosModule { }
