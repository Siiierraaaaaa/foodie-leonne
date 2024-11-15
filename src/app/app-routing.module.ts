import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RestaurantReviewsComponent } from './components/restaurant-reviews/restaurant-reviews.component';
import { HolidayDishesComponent } from './components/holiday-dishes/holiday-dishes.component';
import { LeonneFavoritesComponent } from './components/leonne-favorites/leonne-favorites.component';
import { QuickBitesComponent } from './components/quick-bites/quick-bites.component';
import { DessertsComponent } from './components/desserts/desserts.component';
import { MustTrysComponent } from './components/must-trys/must-trys.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/admin/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'restaurant-reviews', component: RestaurantReviewsComponent },
  { path: 'holiday-dishes', component: HolidayDishesComponent },
  { path: 'leonne-favorites', component: LeonneFavoritesComponent },
  { path: 'quick-bites', component: QuickBitesComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'must-trys', component: MustTrysComponent },
  { 
    path: 'admin', 
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
