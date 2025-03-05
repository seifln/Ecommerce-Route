import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // Ensure localStorage is accessed only in the browser
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('token')!
      }
    });
  }
  
  return next(req); // Continue processing the request
};
