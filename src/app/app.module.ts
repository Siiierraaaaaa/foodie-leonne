import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RestaurantReviewsComponent } from './components/restaurant-reviews/restaurant-reviews.component';
import { HolidayDishesComponent } from './components/holiday-dishes/holiday-dishes.component';
import { LeonneFavoritesComponent } from './components/leonne-favorites/leonne-favorites.component';
import { QuickBitesComponent } from './components/quick-bites/quick-bites.component';
import { DessertsComponent } from './components/desserts/desserts.component';
import { MustTrysComponent } from './components/must-trys/must-trys.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/admin/login/login.component';
import { PostPreviewComponent } from './components/admin/post-preview/post-preview.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { FirebaseConfigService } from './services/firebase-config.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RestaurantReviewsComponent,
    HolidayDishesComponent,
    LeonneFavoritesComponent,
    QuickBitesComponent,
    DessertsComponent,
    MustTrysComponent,
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    PostPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    FirebaseConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
