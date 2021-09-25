import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home' },
            {
                path: '',
                loadChildren: () => import('../modules/investimentos/investimentos.module').then(m => m.InvestimentosModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class LayoutRoutingModule { }
