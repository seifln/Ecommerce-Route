import { isPlatformBrowser } from '@angular/common';

import { inject, Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

  

@Injectable({

  providedIn: 'root'

})

export class MyTranslateService {

  

  private readonly renderer2  = inject(RendererFactory2).createRenderer(null,null)

  

  constructor(private translateService:TranslateService  , @Inject(PLATFORM_ID) private id:object, private renderer:RendererFactory2 ) {

  
  

    this.renderer2 = this.renderer.createRenderer(null,null)    

    if(isPlatformBrowser(this.id)){ // Browser

      // this language will be used as a fallback when a translation isn't found in the current language this._TranslateService.setDefaultLang(  'en'  );

        //1- set default lang

        this.translateService.setDefaultLang('en')

        //2- get lang from localStorage

        const savedLang  = localStorage.getItem('lang');

        //3- use language if found

        if(savedLang){

          this.translateService.use(  savedLang  );

        }

   }

  

   this.changeDirection()

  

  }

  

  changeDirection(): void {
    // Check if running in the browser
    if (isPlatformBrowser(this.id)) {
      const lang = localStorage.getItem('lang');

      if (lang === 'en') {
        // dir ltr
        this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
        this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
      } else if (lang === 'ar') {
        // dir rtl
        this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
        this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
      }
    }
  }

  

   changeLangTranslate(lang:string):void{

    //1-save local storage

    localStorage.setItem('lang',lang)

  

    //2-use lang

    this.translateService.use(lang)

  

    // 3-change direction

    this.changeDirection()

   }

}