import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from './router/routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { produtsReducer } from './product/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './product/effects';
import { CartModule } from './cart/cart.module';
import { ErrorEffects } from './error.effects';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CartModule,
    HttpClientModule,
    RoutingModule,
    MatToolbarModule,
    StoreModule.forRoot({ product: produtsReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    EffectsModule.forRoot([ProductsEffects, ErrorEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
