import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from 'projects/insite-kit/src/models/store.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class StoreResolverService implements Resolve<any> {
  constructor(private storeService: StoreService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<HttpResponse<Store>> {
    return this.storeService.getStoreById(route.params.id).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }
}
