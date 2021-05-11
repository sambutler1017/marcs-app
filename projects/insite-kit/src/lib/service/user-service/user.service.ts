import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstantsService } from '../../common/global-constants.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDataByName(id: number) {
    return this.http.post(`${GlobalConstantsService.API_URL}/user/details`, [
      id,
    ]);
  }
}
