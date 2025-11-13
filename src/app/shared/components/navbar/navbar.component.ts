import { Component, computed, effect, inject, model, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../features/cart/servise/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { NgxTranslateService } from '../../../core/services/translate/ngx-translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Dialog } from "primeng/dialog";
import { DarkModeService, Theme } from '../../../core/services/dark-mode/dark-mode.service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule,
     Dialog, FormsModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [MessageService, DialogService]
})
export class NavbarComponent {

  isLogin: boolean = false;
  cart = computed(() => this.cartService.cartNumber());
  visible: boolean = false;

  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly ngxTranslateService = inject(NgxTranslateService);
  private readonly translateService = inject(TranslateService);
  private readonly id = inject(PLATFORM_ID);
  ref: DynamicDialogRef | undefined;
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);
  private readonly darkModeService = inject(DarkModeService);

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

  // Signout
  showDialog() {
    this.visible = true;
  }
  signout(): void {
    this.authService.logout();
    this.visible = false;
  }

  // Translate
  change(lang: string): void {
    this.ngxTranslateService.changeLang(lang);
  }

  currentLang(lang: string): boolean {
    return this.translateService.currentLang === lang;
  }

  // DarkMode
  isLight = model(this.darkModeService.getCurrentTheme()() ==='light');
  toggleTheme(){
    this.darkModeService.toggleTheme();
  }

}
