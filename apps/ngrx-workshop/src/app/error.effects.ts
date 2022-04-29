import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationRef, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productApiActions from './product/action';
import * as cartApiActions from './cart/actions';
import { tap } from 'rxjs';

@Injectable()
export class ErrorEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly snackBar: MatSnackBar,
    private readonly appRef: ApplicationRef
  ) {}

  handleFetchError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          productApiActions.productFetchedError,
          cartApiActions.fetchCartItemError,
          cartApiActions.addToCartError
        ),
        tap(({ errorMessage }) => {
          this.snackBar.open(errorMessage, 'Error', {
            duration: 2500,
          });
          this.appRef.tick();
        })
      );
    },
    { dispatch: false }
  );
}
