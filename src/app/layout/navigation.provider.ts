import { Injectable } from '@angular/core';

@Injectable()
export class NavProvider {

	private parameters: {
		type: string,
		data: any
	}[] = [];

	constructor() {
	}

	public clearParameters() {
		this.parameters = [];
	}

	public setParameters(type: string, data: any) {
		this.parameters.push({
			type: type,
			data: data
		});
	}

	public getParameters(type: string) {
		let parameter = this.parameters.filter(
			(item) => {
				return item.type === type;
			}
		);
		if (parameter.length > 0) {
			return parameter[0].data;
		} else {
			return null;
		}
	}
}
