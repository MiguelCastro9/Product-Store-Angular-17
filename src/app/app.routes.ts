import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ProductsService } from './services/products.service';

export const routes: Routes = [
  {
    // loads data as soon as the component is called.
    path: '',
    resolve: {
      products: () => {
          const productsService = inject(ProductsService);
          return productsService.getAll();
        }
      },
    component: ListComponent
  },
  {
    // lazy loading routing in angular.
    // fragments the application so that the 'createComponent' component is created only when accessing the route.
    path: 'create',
    loadComponent: () =>
      import('./components/create/create.component').then(
        (m) => m.CreateComponent
      )
  },
  {
    path: 'edit/:id',
    resolve: {
      product: (router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const productsService = inject(ProductsService);
        return productsService.getId(router.paramMap.get('id') as string);
      }
    },
    loadComponent: () =>
      import('./components/edit/edit.component').then(
        (m) => m.EditComponent
      )
  }
];
