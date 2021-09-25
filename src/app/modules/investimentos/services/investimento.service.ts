import { Injectable } from '@angular/core';
import { AuthHttpService } from '../../../core/services/auth-http.service';


@Injectable({
  providedIn: 'root'
})
export class InvestimentoService {
  private baseUrl = '5e76797e2f0000f057986099';
  constructor(private authHttp: AuthHttpService) {

  }
  public getBaseUrl() {
    return this.baseUrl;
  }

  public all() {
    return this.authHttp.get(this.baseUrl);
  }

  public update() {
    return this.authHttp.get(this.baseUrl);
  }
}
