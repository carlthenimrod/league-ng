import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  api: string = environment.api;
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private injector: Injector) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
  }

  intercept(req: HttpRequest<any>, next: HttpHandler)
  : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const auth = this.injector.get(AuthService);
    const access_token = auth.getAccessToken();

    return next.handle(this.addToken(req, access_token)).pipe(
      catchError(error => {
        if ((<HttpErrorResponse>error).status === 401) {
          if (error.url === (this.api + 'users/refresh' )) {
            return this.logout();
          }

          if (access_token) {
            return this.handle401Error(req, next);
          } else {
            return this.logout();
          }
        } else {
          return throwError(error);
        }
      })
    );
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    const auth = this.injector.get(AuthService);

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return auth.refresh().pipe(
        switchMap((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, newToken));
          }

          return this.logout();
        }),
        catchError(error => this.logout()),
        finalize(() => this.isRefreshingToken = false)
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(req, token));
        })
      );
    }
  }

  logout() {
    const auth = this.injector.get(AuthService);
    auth.logout();
    return throwError('');
  }
}
