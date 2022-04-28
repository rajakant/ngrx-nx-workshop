import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './reducer';

export const productFeature = createFeatureSelector<ProductState>('product');

export const getProducts = createSelector(
  productFeature,
  (state) => state.products
);

//export const getProducts = (state: GlobalState) => state.product.products;
