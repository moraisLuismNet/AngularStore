import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { StoreService } from './store.service';
import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    StoreComponent,
    CategoriesComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule, StoreRoutingModule, SharedModule, FormsModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule
  ],
  providers: [StoreService]
})
export class StoreModule { }
