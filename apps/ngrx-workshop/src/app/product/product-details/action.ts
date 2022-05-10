import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Product Details Page] Add to cart button clicked',
  props<{ productId: string }>()
);

export const productDetailsOpened = createAction(
  '[Product Details Page] Opened'
);

export const productFetchedSuccess = createAction(
  '[Product Details page] product fetched',
  props<{ product: Product }>()
);

export const productFetchedError = createAction(
  '[Product Details page] product fetching error',
  props<{ errorMessage: string }>()
);
