import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar';
import { KevinComponent } from './kevin/kevin';


@NgModule({
	declarations: [ ToolbarComponent,
    KevinComponent],
	imports: [],
	exports: [ ToolbarComponent,
    KevinComponent],
  entryComponents:[],
})

export class ComponentsModule {}
