import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { isLoggedGuard } from './core/guards/is-logged.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: AuthLayoutComponent, canActivate: [isLoggedGuard], children: [
            { path: 'login', loadComponent: () => import('./core/auth/login/login.component').then((c) => c.LoginComponent), title: 'Login Page' },
            { path: 'register', loadComponent: () => import('./core/auth/register/register.component').then((c) => c.RegisterComponent), title: 'Register Page' },
            { path: 'forget-password', loadComponent: () => import('./core/auth/forget-password/forget-password.component').then((c) => c.ForgetPasswordComponent), title: 'Forget Password Page' },
        ]
    },
    {
        path: '', component: MainLayoutComponent, children: [
            { path: 'home', loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent), title: 'Home Page' },
            { path: 'products', loadComponent: () => import('./features/products/products.component').then((c) => c.ProductsComponent), title: 'Products Page' },
            { path: 'product-details/:productId', loadComponent: () => import('./features/products/product-details/product-details.component').then((c) => c.ProductDetailsComponent), title: 'Product Details Page' },
            { path: 'categories', loadComponent: () => import('./features/categories/categories.component').then((c) => c.CategoriesComponent), title: 'Categories Page' },
            { path: 'categories/:id', loadComponent: () => import('./features/categories/components/details/details.component').then((c) => c.DetailsComponent), title: 'Categories Details Page' },
            { path: 'brands', loadComponent: () => import('./features/brands/brands.component').then((c) => c.BrandsComponent), title: 'Brands Page' },
            { path: 'brands/:id', loadComponent: () => import('./features/brands/components/details/details.component').then((c) => c.DetailsComponent), title: 'Brands Details Page' },
            { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent), canActivate: [authGuard], title: 'Cart Page' },
            { path: 'checkout/:id', loadComponent: () => import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent), canActivate: [authGuard], title: 'Checkout Page' },
            { path: 'allorders', loadComponent: () => import('./features/allorders/allorders.component').then((c) => c.AllordersComponent), canActivate: [authGuard], title: 'All Orders Page' },
        ]
    },
    { path: '**', component: NotfoundComponent, title: 'NotFound Page' }
];
