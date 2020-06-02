import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class SessionService{

    public ID_PROFILE: string = '';
    public TOKEN_TT: string = '';
    public TOKEN_SST: string = '';
    public SERVER: string = '';
    public userAgent: string = '';
    public infoDash: any[] = [];
    
    constructor(private _platform: Platform){ }

    public setUserAgentServer(): void {
		if (!this._platform.is('cordova')) {
			this.SERVER = 'gooddata/'
			this.userAgent = navigator.userAgent;
		} else {
      //this.SERVER = 'https://analytics.totvs.com.br/gdc/'
      //this.userAgent = 'Analytics/1';
      this.SERVER = 'gooddata/'
			this.userAgent = navigator.userAgent;
		}
	}
}