import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as apiAction from './action';
import * as productDetailsAction from './product-details/action';
export interface ProductState {
  products: EntityState<Product>;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter({
  selectId: (product: Product) => product.id,
  sortComparer: (a: Product, b: Product) => {
    if (a.price > b.price) {
      return 0;
    }
    return -1;
  },
});

const initialState: ProductState = {
  products: productAdapter.getInitialState(),
};

export const produtsReducer = createReducer(
  initialState,
  on(apiAction.productsFetchedSuccess, (state, actions) => ({
    ...state,
    products: productAdapter.upsertMany(actions.products, state.products),
  })),
  on(apiAction.productsFetchedError, (state) => ({
    ...state,
    //products: productAdapter.getInitialState(),
  })),
  on(productDetailsAction.productFetchedSuccess, (state, { product }) => {
    return {
      ...state,
      products: productAdapter.upsertOne(product, state.products),
    };
  })
);
