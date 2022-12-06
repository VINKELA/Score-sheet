import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../../dtos/auth/login.dto';
import { TokenDto } from '../../dtos/auth/token.dto';
import { ResponseDataDto } from '../../dtos/shared/response-data.dto';
import { RestApiService } from '../shared/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  constructor( private authData:RestApiService) {
  }
  login(loginData: LoginDto): Observable<ResponseDataDto<TokenDto>>
  {
    let url = 'api/Auth/login'
     return this.authData.create<ResponseDataDto<TokenDto>>(loginData, url);
  }
  resetPassword(email: string): Observable<ResponseDataDto<string>>
  {
    let url = `api/Auth/resetPassword?email=${email}`
     return this.authData.create<ResponseDataDto<string>>({}, url);
  }

}
