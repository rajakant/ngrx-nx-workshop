import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import * as apiAction from './action';

export interface GlobalState {
  product: ProductState;
}
export interface ProductState {
  products?: Product[];
}
const initialState: ProductState = {
  products: undefined,
};

export const produtsReducer = createReducer(
  initialState,
  on(apiAction.productsFetchedSuccess, (state, { products }) => ({
    ...state,
    products: [...products],
  })),
  on(apiAction.productFetchedError, (state) => ({
    ...state,
    products: [],
  }))
);
