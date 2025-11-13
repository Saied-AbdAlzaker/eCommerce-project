import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private readonly document = inject(DOCUMENT);
  private readonly currentTheme = signal<string>('light');
  private readonly id = inject(PLATFORM_ID);

  constructor() {
    this.setTheme(this.getThemeFromLocalStorage());

    if (isPlatformBrowser(this.id)) {
      const saveTheme = this.getThemeFromLocalStorage();
      this.setTheme(saveTheme);
    }else {
      this.setTheme('light');
    }
  }

  getCurrentTheme() {
    return this.currentTheme.asReadonly();
  }

  toggleTheme() {
    const newTheme: Theme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  // toggleTheme() {
  //   if (this.currentTheme() === 'light') {
  //     this.setTheme('dark');
  //   } else {
  //     this.setTheme('light');
  //   }
  // }

  private setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    this.document.documentElement.setAttribute('data-theme', theme);

    if (isPlatformBrowser(this.id)) {
      this.setThemeInLocalStorage(theme);
    }
  }

  private setThemeInLocalStorage(theme: Theme) {
    try {
      localStorage.setItem('preferred-theme', theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage', e);
    }
  }

  private getThemeFromLocalStorage(): Theme {
    try {
      const theme = localStorage.getItem('preferred-theme');
      return (theme as Theme) ?? 'light';
    } catch {
      return 'light';
    }
  }

  // private setThemeInLocalStorage(theme: Theme) {
  //   localStorage.setItem('preferred-theme', theme);
  // }
  // private getThemeFromLocalStorage() {
  //   return localStorage.getItem('preferred-theme') as Theme ?? 'light';
  // }

}
