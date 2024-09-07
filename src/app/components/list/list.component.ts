import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/Product';
import { CardComponent } from '../../utils/card/card.component';
import { ProductsService } from './../../services/products.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component ({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirmation</h2>
    <mat-dialog-content>
    Do you want to remove this product ?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
    <button mat-button (click)="onNo()">No</button>
    <button mat-raised-button color="primary" (click)="onYes()" cdkFocusInitial>Yes</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatButtonModule, MatDialogModule
  ]
})
export class ConfirmationDialogComponent{

  dialogRef = inject(MatDialogRef);

  onNo() {
    this.dialogRef.close(false);
  }

  onYes() {
    this.dialogRef.close(true);
  }

}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  productsService = inject(ProductsService);
  products = signal<Product[]>(inject(ActivatedRoute).snapshot.data['products']);
  router = inject(Router);
  dialog = inject(MatDialog);

  onEdit(product: Product) {
    this.router.navigate(['/edit', product.id]);
  }

  onDelete(product: Product) {
    this.dialog.open(ConfirmationDialogComponent)
    .afterClosed()
    .pipe(filter((answer) => answer === true))
    .subscribe(() => {
      this.productsService.delete(product.id).subscribe(() => {
        this.productsService.getAll().subscribe((data) => {
          // this way Angular doesn't need to recompute everything again, this way it reacts reactively to the signal.
          this.products.set(data);
        });
      });
    })
  }
}
