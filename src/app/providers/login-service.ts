import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Platform, LoadingController } from "@ionic/angular";
import 'rxjs/add/operator/toPromise';

import { SessionService } from './session-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

    constructor(private _http: HttpClient,
                private _sessionService: SessionService,
                private _loadingCtrl: LoadingController){}

    doLogin(){
        console.log('Estou no doLgin()');
        /*
        let loading = this._loadingCtrl.create({
            spinner: "dots",
            message: "Fazendo login..."
        });
        */
      
        //loading.present();

        this._sessionService.setUserAgentServer();
        let payload = {
          postUserLogin: {
              login: 'andre.dini@totvs.com.br',
              password: 'andre123',
              remember: 1,
              verify_level: 2
          }
        };
        let URL: string = this._sessionService.SERVER + '/gdc/account/login';
        let URL2: string = '/gdc/account/login';
        return this._http.post(URL2, payload, { observe: 'response' })
            .toPromise().then((res: any) => {
                this._sessionService.ID_PROFILE = res.body.userLogin.profile
                    .replace('/gdc/account/profile/', '');
                this._sessionService.TOKEN_SST = res.headers.get('X-GDC-AuthSST');
                this._sessionService.TOKEN_TT = res.headers.get('X-GDC-AuthTT');
                console.log(this._sessionService.TOKEN_SST);
                console.log(this._sessionService.TOKEN_TT);
                //loading.dismiss();
            }).catch((err) => alert(err.message));
    }
}