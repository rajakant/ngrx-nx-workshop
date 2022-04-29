import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, defer, timer, switchMap } from 'rxjs';
import * as actions from './actions';
import { CartService } from './cart.service';
import * as cartDetailsActions from './cart-details/actions';

export const REFRESH_CART_ITEMS_INTERVAL_MS = 20000;
@Injectable()
export class CartEffects {
  constructor(
    private readonly actions$: Actions,
    private cartSerivce: CartService
  ) {}

  readonly init$ = createEffect(() => {
    return defer(() =>
      timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
        map(() => actions.timerTick())
      )
    );
  });

  fetchCartItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        actions.timerTick,
        cartDetailsActions.cartDetailsOpened,
        cartDetailsActions.purchaseSuccess
      ),
      switchMap(() =>
        this.cartSerivce.getCartProducts().pipe(
          map((cartItems) => actions.fetchCartItemSuccess({ cartItems })),
          catchError(() =>
            of(actions.fetchCartItemError({ errorMessage: 'Error Happened' }))
          )
        )
      )
    );
  });
}