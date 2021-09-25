import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { FormCustomValidator } from '../../../core/services/formCustomValidator.service';
import { UsuarioService } from '../../../modules/usuarios/usuarios/services/usuario.service';
import { AuthHttp } from '../../../core/services/auth.http';
import { StorageService } from '../../../core/services/storage.service';
import { SidebarService } from '../services/sidebar.service';

@Component({
    selector: 'app-header-presentation',
    templateUrl: './header-presentation.component.html',
    styleUrls: ['./header-presentation.component.scss']
})
export class HeaderPresentationComponent implements OnInit {
    @ViewChild('submenu') submenu: any;
    @ViewChild('alert') private alert: any;
    pushRightClass = 'push-right';
    public activeClass = 'desativado';
    isActive = false;
    showMenu = '';

    usuario: any = {};
    public form: FormGroup;

    constructor(
        private translate: TranslateService,
        public router: Router,
        public authService: AuthHttp,
        public usuarioService: UsuarioService,
        private formBuilder: FormBuilder,
        private formValidator: FormCustomValidator,
        private localStorage: StorageService,
        public sidebarService: SidebarService) {
        // this.user = this.auth.getUser();
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

    }
    eventCalled() {
        this.isActive = !this.isActive;
    }
    ngOnInit() {
        this.buildForm();
        this.usuario = this.authService.getLoggedUsuario();
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.localStorage.removeData('usuario');
        this.authService.logout();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    toggleActive() {
        if (this.submenu.nativeElement.classList.contains('show')) {
            this.activeClass = 'desativado';
        } else {
            this.activeClass = 'active';
        }
    }

    modalDismissed() {
        this.cleanPasswordFields();
    }

    cleanPasswordFields() {
        this.form.get('senhaAtual').setValue(null);
        this.form.get('novaSenha').setValue(null);
        this.form.get('confirmarSenha').setValue(null);
    }

    updatePassword() {
        const oldPassword = this.form.get('senhaAtual').value;
        const newPassword = this.form.get('novaSenha').value;
        const confPassword = this.form.get('confirmarSenha').value;
        if (confPassword === newPassword) {

            let data = {
                oldPassword: oldPassword,
                newPassword: newPassword,
                email: this.usuario.email
            };

            this.usuarioService.alterarSenha(data).then((result) => {
                this.alert.showCustomSuccess('Senha alterada com sucesso!', true);
                this.cleanPasswordFields();
            }).catch((err) => {
                this.alert.showCustomError('Não foi possível alterar a senha!');
            });
        } else if (oldPassword === newPassword) {
            this.alert.showCustomError('Nova Senha deve ser diferente da antiga.');
        } else {
            this.alert.showCustomError('Nova Senha e a Confirmação não conferem.');
        }
    }

    buildForm() {
        this.form = this.formBuilder.group({
            senhaAtual: ['', [Validators.required, Validators.minLength(3)]],
            novaSenha: ['', [Validators.required, Validators.minLength(3)]],
            confirmarSenha: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-valid': !this.isFieldValid(field) && this.form.get(field).touched
        };
    }

    isFieldValid(field: string) {
        return !this.form.get(field).valid && this.form.get(field).touched;
    }

    showFormErrorAlert() {
        if (this.isFieldValid('oldPassowrd')) {
            this.alert.showCustomError('Senha atual inválida');
        } else if (this.isFieldValid('novaSenha')) {
            this.alert.showCustomError('Nova senha está invalida!');
        }
        this.validateAllFormFields(this.form);
    }

    validateAllFormFields(formGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    changeSideMenuState() {
        this.sidebarService.changeShowMenuState();
    }

    cancel() {
        let el = <HTMLElement>document.getElementById('exit-bt');
        el.click();
    }
}
