import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class NgxTranslateService {

  private readonly renderer2 = inject(RendererFactory2).createRenderer(null, null);

  constructor(private translateService: TranslateService, @Inject(PLATFORM_ID) private id: object) {
    if (isPlatformBrowser(this.id)) {
      /// Logic Translate.
      // 1- Set default Language
      translateService.setDefaultLang('en');
      // 2- Get Lang. laocal (Saved)
      const saveLang = localStorage.getItem('lang'); // en or ar
      // 3- Use Lang Local
      if (saveLang) {
        translateService.use(saveLang!);
      }
      this.changeDirection();
    }
  }

  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      // this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      // this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
    else if (localStorage.getItem('lang') === 'ar') {
      // this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      // this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
  }

  changeLang(lang: string): void {
    // 1- Save local
    localStorage.setItem('lang', lang);

    // 2- Use Lang
    this.translateService.use(lang);

    // 3- Change Direction
    this.changeDirection();
  }

}
