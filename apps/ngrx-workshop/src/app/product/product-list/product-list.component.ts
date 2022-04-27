import { GlobalState } from './../reducer';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  BasicProduct,
  Product,
  Rating,
} from '@ngrx-nx-workshop/api-interfaces';
import { RatingService } from '../rating.service';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { productsOpened } from './actions';
import * as selectors from '../selectors';

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$?: Observable<BasicProduct[] | undefined> = this.store.select(
    selectors.getProducts
  );
  customerRatings$?: Observable<Map<string, Rating>>;

  constructor(
    private readonly store: Store<GlobalState>,
    private readonly ratingService: RatingService
  ) {}

  ngOnInit() {
    this.store.dispatch(productsOpened());
    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map((arr) => {
        const ratingsMap = new Map<string, Rating>();
        for (const productRating of arr) {
          ratingsMap.set(productRating.productId, productRating.rating);
        }
        return ratingsMap;
      }),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
  }
}
