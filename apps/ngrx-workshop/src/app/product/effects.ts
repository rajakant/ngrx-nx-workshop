import { catchError } from 'rxjs/operators';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productLisrActions from './product-list/actions';
import * as apiActions from './action';
import { exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly ProductService: ProductService
  ) {}

  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productLisrActions.productsOpened),
      exhaustMap(() =>
        this.ProductService.getProducts().pipe(
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
