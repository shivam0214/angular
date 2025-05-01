import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { AddProductComponent } from './admin/pages/add-product/add-product.component';
import { ListProductsComponent } from './admin/pages/list-products/list-products.component';
const routes: Routes = [
  /* {
    path: 'admin',
    loadChildren: () => import('./admin/AdminRoutingModule').then(m => m.AdminRoutingModule)
  }, */
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) // Lazy load AdminModule
  },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: HomeComponent },
  /* { path: 'admin/add-product', component: AddProductComponent },
  { path: 'admin/list-products', component: ListProductsComponent }, */
  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
