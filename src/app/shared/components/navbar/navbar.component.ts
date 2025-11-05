import { Component, computed, effect, inject, Input, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../features/cart/servise/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { NgxTranslateService } from '../../../core/services/translate/ngx-translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isLogin: boolean = false;
  cart = computed(() => this.cartService.cartNumber());

  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly ngxTranslateService = inject(NgxTranslateService);
  private readonly translateService = inject(TranslateService);
  private readonly id = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      if (this.authService.user() !== null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    })
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    // this.getCartNumber();
    if (isPlatformBrowser(this.id)) {
      this.getAllDataCart();
    }
  }

  // getCartNumber(): void {
  //   this.cartService.coutNumber.subscribe({
  //     next: (value) => {
  //       this.count = value;
  //     }
  //   })
  // }

  getAllDataCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        // this.cartService.coutNumber.next(res.numOfCartItems);
        this.cartService.cartNumber.set(res.numOfCartItems);
      }
    })
  }

  signout(): void {
    this.authService.logout();
  }

  change(lang: string): void {
    this.ngxTranslateService.changeLang(lang);
  }

  currentLang(lang: string): boolean {
    return this.translateService.currentLang === lang;
  }

}
