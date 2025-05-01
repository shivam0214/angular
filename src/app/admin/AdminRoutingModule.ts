import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'add-product', component: AddProductComponent },
      { path: 'list-products', component: ListProductsComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: '', redirectTo: 'list-products', pathMatch: 'full' } // Default admin route
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
