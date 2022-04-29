import { createAction, props } from '@ngrx/store';
import { CartItem } from '@ngrx-nx-workshop/api-interfaces';

export const timerTick = createAction('[Cart Effects] periodic timer tick');

export const fetchCartItemSuccess = createAction(
  '[Cart API] fetch item success',
  props<{ cartItems: CartItem[] }>()
);

export const fetchCartItemError = createAction(
  '[Cart API] fetch item error',
  props<{ errorMessage: string }>()
);
