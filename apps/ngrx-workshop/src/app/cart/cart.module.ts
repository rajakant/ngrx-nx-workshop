import { EffectsModule } from '@ngrx/effects';
import { CartDetailsModule } from './cart-details/cart-details.module';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { cartReducer, CART_FEATURE_KEY } from './reducer';
import { CommonModule } from '@angular/common';
import { CartIconModule } from './cart-icon/cart-icon.module';
import { CartEffects } from './effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    CartIconModule,
    CartDetailsModule,
    StoreModule.forFeature(CART_FEATURE_KEY, cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
  exports: [CartIconComponent],
})
export class CartModule {}
