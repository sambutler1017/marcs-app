import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstantsService } from '../../common/global-constants.service';
import { JwtService } from '../jwt-service/jwt-service.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private http: HttpClient, private jwt: JwtService) {}

  getManagers() {
    return this.http.post(
      `${GlobalConstantsService.API_URL}/managers/overview`,
      [this.jwt.get('user_id')]
    );
  }
  getManagerDetail(id: number) {
    return this.http.get(
      `${GlobalConstantsService.API_URL}/managers/detail/${id}`
    );
  }
}
