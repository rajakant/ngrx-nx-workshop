import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Rating } from '@ngrx-nx-workshop/api-interfaces';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { ProductService } from '../product.service';
import { RatingService } from '../rating.service';
import * as productDetailsActions from './action';
import * as selectors from '../selectors';

@Component({
  selector: 'ngrx-nx-workshop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnDestroy {
  private readonly productId$ = this.router.paramMap.pipe(
    map((params: ParamMap) => params.get('productId')),
    filter((id: string | null): id is string => !!id),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  private readonly subscription = new Subscription();

  product$ = this.store.select(selectors.getCurrentProduct);

  private customerRating$ = new BehaviorSubject<number | undefined>(undefined);

  constructor(
    private readonly router: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private readonly location: Location,
    private readonly store: Store
  ) {
    this.store.dispatch(productDetailsActions.productDetailsOpened());
    this.subscription.add(
      this.store
        .select(selectors.getCurrentProductId)
        .pipe(
          filter((id): id is string => !!id),
          switchMap((id) => this.ratingService.getRating(id))
        )
        .subscribe((productRating) =>
          this.customerRating$.next(productRating && productRating.rating)
        )
    );
  }

  setRating(productId: string, rating: Rating) {
    this.ratingService
      .setRating({ productId, rating })
      .pipe(
        map((arr) =>
          arr.find((productRating) => productId === productRating.productId)
        ),
        filter(
          (productRating): productRating is NonNullable<typeof productRating> =>
            productRating != null
        ),
        map((productRating) => productRating.rating)
      )
      .subscribe((newRating) => this.customerRating$.next(newRating));
  }

  addToCart(productId: string) {
    this.store.dispatch(productDetailsActions.addToCart({ productId }));
  }

  back() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
