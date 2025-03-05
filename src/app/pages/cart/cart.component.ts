import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  cartDetails:Icart = {} as Icart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartDetails = res.data;
      },
      error:(err)=>{
        if(err.status === 401) {
          this.authService.logoutUser();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  removeItem(id:string):void{
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        this.cartDetails = res.data;
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
      error:(err)=>{
        if(err.status === 401) {
          this.authService.logoutUser();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  updateCount(id:string,count:number):void{
    this.cartService.updateProductQuantity(id,count).subscribe({
      next:(res)=>{
        this.cartDetails = res.data;
      },
      error:(err)=>{
        if(err.status === 401) {
          this.authService.logoutUser();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  clearItems():void{
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        if(res.message === 'success'){
          this.cartDetails = {} as Icart;
          this.cartService.cartNumber.set(0);
        }
      },
      error:(err)=>{
        if(err.status === 401) {
          this.authService.logoutUser();
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
