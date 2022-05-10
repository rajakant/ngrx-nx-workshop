import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import * as apiAction from './action';
import * as productDetailsAction from './product-details/action';
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
  on(apiAction.productsFetchedError, (state) => ({
    ...state,
    products: [],
  })),
  on(productDetailsAction.productFetchedSuccess, (state, { product }) => {
    const productClone = state.products ? [...state.products] : [];
    const indexOfProduct = productClone.findIndex((p) => p.id === product.id);
    productClone.splice(indexOfProduct, 1, product);
    return { ...state, products: productClone };
  })
);
