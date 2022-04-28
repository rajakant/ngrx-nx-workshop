import { CartDetailsModule } from './cart-details/cart-details.module';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { cartReducer, CART_FEATURE_KEY } from './reducer';
import { CommonModule } from '@angular/common';
import { CartIconModule } from './cart-icon/cart-icon.module';

@NgModule({
  imports: [
    CommonModule,
    CartIconModule,
    CartDetailsModule,
    StoreModule.forFeature(CART_FEATURE_KEY, cartReducer),
  ],
  exports: [CartIconComponent],
})
export class CartModule {}
