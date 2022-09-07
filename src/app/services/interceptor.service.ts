import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import * as alertify from "alertifyjs";
import { Common } from "../constants";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  private handleError(error: HttpErrorResponse) {
    debugger;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      alertify.error(Common.errorMessageNetwork, error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      alertify.error(`Server returned code ${error.status}`, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(Common.commonErrorMessage));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError));
  }
}
