import { Component, computed, inject, input, Input, InputSignal, OnInit, Signal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  // first way
  //@Input() isLogin:boolean = true;


   private readonly authService =inject(AuthService)
   private readonly myTranslateService =inject(MyTranslateService)
   private readonly translateService =inject(TranslateService)
   private readonly cartService =inject(CartService)
  //second way
  isLogin:InputSignal<boolean> = input<boolean>(true)

  countCart:Signal<number> = computed(()=>this.cartService.cartNumber())

  ngOnInit(): void {
    // Only try to get cart if user is logged in
    if (localStorage.getItem('token')) {
      this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          this.cartService.cartNumber.set(res.numOfCartItems);
        },
        error: (err) => {
          console.error('Error fetching cart:', err);
          // If unauthorized, clear the token and redirect to login
          if (err.status === 401) {
            this.authService.logoutUser();
          }
        }
      });
    }
  }

  logout():void{
    this.authService.logoutUser()
  }

  change(lang:string):void{
    this.myTranslateService.changeLangTranslate(lang)
  } 

  currentLang(lang:string):boolean{
    return this.translateService.currentLang === lang
  }

}
