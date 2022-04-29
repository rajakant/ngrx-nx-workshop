import { createReducer, on } from '@ngrx/store';
import * as productDetailsAction from '../product/product-details/action';
import * as actions from './actions';

export const CART_FEATURE_KEY = 'cart';

export interface CartState {
  cartItems?: { [productId: string]: number };
}

const initialState: CartState = {};

export const cartReducer = createReducer(
  initialState,
  on(productDetailsAction.addToCart, (state, { productId }) => {
    const newQuantity =
      state.cartItems && state.cartItems[productId]
        ? state.cartItems[productId] + 1
        : 1;
    return {
      ...state,
      cartItems: {
        ...state.cartItems,
        [productId]: newQuantity,
      },
    };
  }),
  on(actions.fetchCartItemSuccess, (state, { cartItems }) => ({
    ...state,
    cartItems: cartItems.reduce(
      (acc: { [productId: string]: number }, { productId, quantity }) => {
        acc[productId] = quantity;
        return acc;
      },
      {}
    ),
  }))
);
