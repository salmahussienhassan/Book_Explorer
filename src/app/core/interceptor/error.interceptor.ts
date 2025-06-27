import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          toastr.error('Unauthorized: Please login again.');
          break;
        case 404:
          toastr.error('Resource not found.');
          break;
        case 500:
          toastr.error('Something went wrong on the server.');
          break;
      }

      return throwError(() => error);
    })
  );
};
