import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { AppConfig } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private serviceUrl: string = AppConfig.serviceUrl;

  constructor(private httpClient: HttpClient) { }

  public get(url: string) {
    return this.httpClient.get(this.serviceUrl + url).pipe(map((resp: Response) => resp));
  }

  public post(url: string, data: any) {
    return this.httpClient.post(this.serviceUrl + url, data).pipe(map((resp: Response) => resp))
  }
}
