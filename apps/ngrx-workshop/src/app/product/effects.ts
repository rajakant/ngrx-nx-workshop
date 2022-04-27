import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { ProductService } from './product.service';
import { ApplicationRef, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productLisrActions from './product-list/actions';
import * as apiActions from './action';
import { exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class ProductsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly ProductService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly appRef: ApplicationRef
  ) {}

  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productLisrActions.productsOpened),
      exhaustMap(() =>
        this.ProductService.getProducts().pipe(
          map((products) => apiActions.productsFetchedSuccess({ products })),
          catchError(() => of(apiActions.productFetchedError()))
        )
      )
    );
  });

  handleFetchError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(apiActions.productFetchedError),
        tap(() => {
          this.snackBar.open('Error Fetching Product', 'Error', {
            duration: 2500,
          });
          this.appRef.tick();
        })
      );
    },
    { dispatch: false }
  );
}
