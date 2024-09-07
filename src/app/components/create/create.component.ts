import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormComponent } from '../../utils/form/form.component';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  productsService = inject(ProductsService);
  router = inject(Router);
  message = inject(MatSnackBar);

  onSubmit(product: Product) {
    this.productsService.save(product)
    .subscribe(() => {
      this.message.open('Product saved!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigateByUrl("/");
    })
  }
}
