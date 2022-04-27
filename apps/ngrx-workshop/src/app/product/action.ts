import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const productsFetchedSuccess = createAction(
  '[Product API] products fetched',
  props<{ products: Product[] }>()
);

export const productFetchedError = createAction(
  '[Product API] products fetching error'
);
