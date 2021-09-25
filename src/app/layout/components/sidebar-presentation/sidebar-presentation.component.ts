import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthHttp } from '../../../core/services/auth.http';

import { BaseListComponent } from '../../../core/views/base-list.component';
import { StorageService } from '../../../core/services/storage.service';
import { SidebarService } from '../services/sidebar.service';

import { AppConfig } from '../../../../environments/environment';

@Component({
    selector: 'app-sidebar-presentation',
    templateUrl: './sidebar-presentation.component.html',
    styleUrls: ['./sidebar-presentation.component.scss']
})
export class SidebarPresentationComponent extends BaseListComponent implements OnInit {
    isActive = false;
    showMenu = '';

    appVersion = '';

    usuario: any = {};
    permissoes: any;

    constructor(
        private translate: TranslateService,
        public router: Router,
        public authService: AuthHttp,
        private localStorage: StorageService,
        public sidebarService: SidebarService) {
        super(authService);
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.usuario = this.authService.getLoggedUsuario();
        this.permissoes = this.usuario.permissoes.wizesystems.modulos;
        this.appVersion = AppConfig.version;
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        this.localStorage.removeData('usuario');
    }
}
