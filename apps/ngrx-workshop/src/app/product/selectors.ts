import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './reducer';
import * as routerSelectors from '../router/selectors';

export const productFeature = createFeatureSelector<ProductState>('product');

export const getProducts = createSelector(
  productFeature,
  (state) => state.products
);

export const getCurrentProductId = routerSelectors.getRouterParam('productId');

export const getCurrentProduct = createSelector(
  getProducts,
  getCurrentProductId,
  (products, id) => {
    if (id == null || !products) return undefined;
    return products?.find((p) => p.id === id);
  }
);

//export const getProducts = (state: GlobalState) => state.product.products;
