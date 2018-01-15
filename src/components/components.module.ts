import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar';
import { SidebarEditComponent } from './sidebar-edit/sidebar-edit';
import { SidebarCreateComponent } from './sidebar-create/sidebar-create';
import { ViewToolsComponent } from './view-tools/view-tools';
import { ModEditorComponent } from './mod-editor/mod-editor';
import { ProductsComponent } from './products/products';
import { OrdersComponent } from './orders/orders';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
@NgModule({
	declarations: [NavbarComponent,
    SidebarEditComponent,
    SidebarCreateComponent,
    ViewToolsComponent,
    ModEditorComponent,
    ProductsComponent,
    OrdersComponent,
    LoginComponent,
    RegisterComponent],
	imports: [],
	exports: [NavbarComponent,
    SidebarEditComponent,
    SidebarCreateComponent,
    ViewToolsComponent,
    ModEditorComponent,
    ProductsComponent,
    OrdersComponent,
    LoginComponent,
    RegisterComponent]
})
export class ComponentsModule {}
