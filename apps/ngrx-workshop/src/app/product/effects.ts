import { catchError, withLatestFrom, filter } from 'rxjs/operators';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productLisrActions from './product-list/actions';
import * as apiActions from './action';
import { exhaustMap, map, of } from 'rxjs';
import * as cartDetailsAction from '../cart/cart-details/actions';
import { Store } from '@ngrx/store';
import { GlobalState } from './reducer';
import * as selectors from './selectors';

@Injectable()
export class ProductsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly store: Store<GlobalState>
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
              apiActions.productFetchedError({ errorMessage: 'Error Happened' })
            )
          )
        )
      )
    );
  });
}
