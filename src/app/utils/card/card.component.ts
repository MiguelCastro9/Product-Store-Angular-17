import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import  {MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  product = input.required<Product>();
  productTitle = computed(() => this.product().title);

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

}
