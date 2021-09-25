import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavProvider } from './navigation.provider';
import { SidebarService } from './components/services/sidebar.service';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        LayoutComponent
    ],
    providers: [
        NavProvider,
        SidebarService
    ]
})
export class LayoutModule { }
