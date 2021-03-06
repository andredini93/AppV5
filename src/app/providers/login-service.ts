import { Injectable } from "@angular/core";
import { SessionService } from './session-service';
import { MingleService, Configuration } from '@totvs/mingle';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { map, mergeMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService{

  private mingleService = new MingleService();

    constructor(
        private _http: HttpClient,
        private _sessionService: SessionService)
        {}

    doLogin(user: string, password: string, alias: string) {
      let payload = {
          postUserLogin: {
              login: user,
              password: password,
              remember: 1,
              verify_level: 2,
              alias: alias
          }
      };

      const config = new Configuration();
      // config.app_identifier = '59a8c3953abca80001f0200c';
      // config.environment = 'PROD';
      // config.server = 'https://hom-mingle.totvs.com.br/api';
      config.app_identifier = '59c3ef78d11c330001b5e421';
      config.environment = 'PROD';
      config.server = 'https://mingle.totvs.com.br/api';
      config.modules.crashr = false;
      config.modules.usage_metrics = true;
      config.modules.gateway = true;
      config.modules.push_notification = false;
      config.modules.user_data = true;
      config.modules.ocr = false;
      this.mingleService.setConfiguration(config); 
    
      // Devemos assinalar o alias que está sendo usado utilizadno antes de tentar o login,
      // para que o session service defina o servidor que devera realizar o login
      this._sessionService.ALIAS = alias;
      let URL = 'https://localhost:8443/gdc/account/login';
      let URL2 = 'https://analytics.totvs.com.br/gdc/account/login';
      let URL3 = this._sessionService.SERVER + 'gdc/account/login';

      return this._http.post(this._sessionService.SERVER + 'gdc/account/login', payload, { observe: 'response' })
        .flatMap(async (res: any) => {
          this._sessionService.EMAIL = user;
          this._sessionService.USER_ID = res.body.userLogin.profile.replace('/gdc/account/profile/', '');
          this._sessionService.TOKEN_SST = res.body.userLogin.token;
          //this._sessionService.TOKEN_SST = res.headers.get('X-GDC-AuthSST');
          //this._sessionService.TOKEN_TT = res.headers.get('X-GDC-AuthTT');
          this.refreshToken().toPromise();
          return await this.refreshToken().toPromise().then(() => {
            let custom = {
              authTT: this._sessionService.TOKEN_TT,
              alias: this._sessionService.ALIAS,
              // para rodar no browser: userAgent: navigator.userAgent
              userAgent: this._sessionService.userAgent
            };
            console.log('TOKEN SST' +this._sessionService.TOKEN_SST);
            console.log('TOKEN TT' +this._sessionService.TOKEN_TT);
            return custom;
          })
        })
        // .flatMap((custom:any) => {
        //   debugger
        //   return this.mingleService.auth.analytics(custom.authTT, custom.userAgent, alias).subscribe(res => {
        //     console.log('res' + res);
        //   }, error => {
        //     console.log('erro' + error);
        //   })
        // });
    }

    refreshToken() {
      let header = new HttpHeaders();
          header = header.append('Accept', 'application/json');
          header = header.append('X-GDC-AuthSST', this._sessionService.TOKEN_SST);
          return this._http.get(this._sessionService.SERVER + 'gdc/account/token',
                                { headers: header, observe: 'response' })
              .map((res: HttpResponse<any>) => {
                  this._sessionService.TOKEN_TT = res.headers.get('X-GDC-AuthTT');
                   //this.mingleService.registerAnalyticsToken(this._sessionService.TOKEN_TT, this._sessionService.userAgent);
                  return res;
              }
          );
      }

    public logout() {
      return Promise.all([
        //this._mingleService.auth.logout(),
        this._sessionService.clear()
      ]);
      }
}