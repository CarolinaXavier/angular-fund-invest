import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InvestimentosListComponent } from './views/list/investimentos-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { InvestimentoEditComponent } from './views/edit/investimento-edit.component';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';

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
    SharedPipesModule
  ],
  exports: [RouterModule]
})
export class InvestimentosModule { }
