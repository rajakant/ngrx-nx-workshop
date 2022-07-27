import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productAdapter } from './reducer';
import * as routerSelectors from '../router/selectors';

export const productFeature = createFeatureSelector<ProductState>('product');

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const getProductsEntityState = createSelector(
  productFeature,
  (state) => state.products
);

export const getProducts = createSelector(getProductsEntityState, selectAll);

export const getCurrentProductId = routerSelectors.getRouterParam('productId');

export const getProductDictionary = createSelector(
  getProductsEntityState,
  selectEntities
);

export const getCurrentProduct = createSelector(
  getProductDictionary,
  getCurrentProductId,
  (products, id) => {
    if (id == null) return undefined;
    return products[id];
  }
);

//export const getProducts = (state: GlobalState) => state.product.products;
