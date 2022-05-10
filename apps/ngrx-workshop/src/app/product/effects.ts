import { catchError, withLatestFrom, filter } from 'rxjs/operators';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productLisrActions from './product-list/actions';
import * as apiActions from './action';
import { exhaustMap, map, of, switchMap } from 'rxjs';
import * as cartDetailsAction from '../cart/cart-details/actions';
import { Store } from '@ngrx/store';
import * as selectors from './selectors';
import * as productDetailsActions from './product-details/action';

@Injectable()
export class ProductsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly store: Store
  ) {}

  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        productLisrActions.productsOpened,
        cartDetailsAction.cartDetailsOpened
      ),
      withLatestFrom(this.store.select(selectors.getProducts)),
      filter(([, products]) => {
        return !(products && products.length);
      }),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) => apiActions.productsFetchedSuccess({ products })),
          catchError(() =>
            of(
              apiActions.productsFetchedError({
                errorMessage: 'Error Happened',
              })
            )
          )
        )
      )
    );
  });

  fetchCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productDetailsActions.productDetailsOpened),
      withLatestFrom(this.store.select(selectors.getCurrentProductId)),
      switchMap(([, id]) =>
        this.productService.getProduct(id ?? '').pipe(
          map((product) =>
            productDetailsActions.productFetchedSuccess({ product })
          ),
          catchError(() =>
            of(
              productDetailsActions.productFetchedError({
                errorMessage: 'Product fetched apis failed',
              })
            )
          )
        )
      )
    );
  });
}
