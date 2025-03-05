import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { SearchPipe } from '../../core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    CurrencyPipe,
    DatePipe,
    SearchPipe,
    FormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
   private readonly productsService = inject(ProductsService)
   private readonly categoriesService = inject(CategoriesService)
   private readonly cartService = inject(CartService)
   private readonly toastrService = inject(ToastrService)
   private readonly wishlistService = inject(WishlistService)

   hamada: string = " "

   myDate: any = new Date()

   customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    rtl: true,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    nav: true,
    items: 1,
  }

   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 8
      }
    },
    nav: true
  }

  //  the interfaces


  //  products:IProduct[]=[];

    products = signal<IProduct[]>([])

  //  categories:ICategory[]=[];

  categories = signal<ICategory[]>([])

   getProductsData(){
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products.set(res.data)        
      },
      error:(err)=>{
        console.log(err);
        
      }
     })
   }

   getCategoryData(){

    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categories.set(res.data)


      },
      error:(err)=>{
        console.log(err);
        
      }
    })
   }

   ngOnInit(): void {
    this.getProductsData();
    this.getCategoryData();

   }

   addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          this.toastrService.success(res.message , 'FreshCart')
          this.cartService.cartNumber.set(res.numOfCartItems)

          console.log(this.cartService.cartNumber());
          

        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
   }

   toggleWishlist(productId: string): void {
    const isCurrentlyInWishlist = this.wishlistService.isInWishlist(productId);
    this.wishlistService.toggleWishlistItem(productId);
    
    if (isCurrentlyInWishlist) {
      this.toastrService.success('Product removed from wishlist', 'FreshCart');
    } else {
      this.toastrService.success('Product added to wishlist', 'FreshCart');
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistService.isInWishlist(productId);
  }
}
