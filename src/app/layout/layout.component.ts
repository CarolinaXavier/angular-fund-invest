import { Component, OnInit } from '@angular/core';
import { SidebarService } from './components/services/sidebar.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    private username = 'Usuário';
    valor: boolean;

    constructor(public sidebarService: SidebarService) {

    }

    async ngOnInit() {
    }
}
