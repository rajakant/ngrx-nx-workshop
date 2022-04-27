import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';
export const productsFetched = createAction(
  '[Product API] products fetched',
  props<{ products: Product[] }>()
);
