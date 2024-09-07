import { Component, inject } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormComponent } from '../../utils/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  productsService = inject(ProductsService);
  router = inject(Router);
  message = inject(MatSnackBar);

  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  onSubmit(product: Product) {
    this.productsService.edit(this.product.id, product)
    .subscribe(() => {
      this.message.open('Product updated!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigateByUrl("/");
    })
  }
}
