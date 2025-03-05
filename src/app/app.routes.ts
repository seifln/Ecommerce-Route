import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { 
        path: 'login', 
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), 
        title: 'login' 
      },
      { 
        path: 'register', 
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), 
        title: 'register' 
      }
    ]
  },

  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { 
        path: 'home', 
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), 
        title: 'home', 
        canActivate: [authGuard] 
      },
      { 
        path: 'allorders', 
        loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent), 
        title: 'allorders', 
        canActivate: [authGuard] 
      },
      { 
        path: 'cart', 
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), 
        title: 'cart',
        canActivate: [authGuard]
      },
      { 
        path: 'wishlist', 
        loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent), 
        title: 'wishlist',
        canActivate: [authGuard]
      },
      { 
        path: 'products', 
        loadComponent: () => import('./pages/products/products.component').then(m => m.ProductComponent), 
        title: 'products',
        canActivate: [authGuard]
      },
      { 
        path: 'brands', 
        loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), 
        title: 'brands',
        canActivate: [authGuard]
      },
      { 
        path: 'categories', 
        loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), 
        title: 'categories',
        canActivate: [authGuard]
      },
      { 
        path: 'checkout/:id', 
        loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), 
        title: 'checkout',
        canActivate: [authGuard]
      },
      { 
        path: 'details/:id', 
        loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), 
        title: 'details',
        canActivate: [authGuard]
      },
      { 
        path: 'forgot', 
        loadComponent: () => import('./pages/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent), 
        title: 'Forgotpassword' 
      }
    ]
  },
  
  // Not Found route outside of protected routes
  { 
    path: '**', 
    loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent),
    title: '404 Not Found'
  }
];
