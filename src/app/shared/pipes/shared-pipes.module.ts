import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatPipe } from './format.pipe';


@NgModule({
	imports: [
		CommonModule
	],
	declarations: [FormatPipe],
	exports: [FormatPipe]
})
export class SharedPipesModule { }
