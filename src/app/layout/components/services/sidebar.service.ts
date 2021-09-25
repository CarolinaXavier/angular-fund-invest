import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
	public showMenu = 'must-show';

	constructor() {
	}

	public changeShowMenuState() {
		if (this.showMenu === 'must-show') {
			this.showMenu = '';
		} else {
			this.showMenu = 'must-show';
		}
	}
}
