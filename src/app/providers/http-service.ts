import {Observable} from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { SessionService } from './session-service';

@Injectable({providedIn: 'root'})
export class HttpService {

	constructor(
		private _http: HttpClient,
		private _sessionService: SessionService
	) { }

	public get(url: string, options: any = {}) {
		options.headers = this._setHeaders(options.headers);
		return this._http.get(url, options)
			.catch(error => {
				if (error.status === 401 || error.status === 0 || error.status == null) {
					console.log('caiu no erro da function get');
					return this.refreshToken()
						.flatMap(authToken => {
							options.headers = this._setHeaders(options.headers);
							return this._http.get(url, options);
						});
				}
				return Observable.throw(error);
			});
	}

	refreshToken() {
		let header = new HttpHeaders();
        header = header.append('Accept', 'application/json');
        header = header.append('X-GDC-AuthSST', this._sessionService.TOKEN_SST);
        return this._http.get(this._sessionService.SERVER + 'account/token',
                              { headers: header, observe: 'response' })
            .map((res: HttpResponse<any>) => {
                this._sessionService.TOKEN_TT = res.headers.get('X-GDC-AuthTT');
                //this._mingleService.registerAnalyticsToken(this._sessionService.TOKEN_TT, 
                //this._sessionService.userAgent);
                return res;
            }
        );
    }

	public put(urn: string, body: any, options: any = {}) {
		options.headers = this._setHeaders(options.headers);
		return this._http.put(this._sessionService.SERVER + urn, body, options);
	}

	public post(urn: string, body: any, options: any = {}) {
		options.headers = this._setHeaders(options.headers);
		return this._http.post(this._sessionService.SERVER + urn, body, options);
	}

	public delete(urn: string, options: any = {}) {
		options.headers = this._setHeaders(options.headers);
		return this._http.delete(this._sessionService.SERVER + urn, options);
	}

	public patch(urn: string, options: any = {}) {
		options.headers = this._setHeaders(options.headers);
		return this._http.patch(this._sessionService.SERVER + urn, options);
	}

	private _setHeaders(headers: HttpHeaders) {
		if (!headers) {
			headers = new HttpHeaders();
		}

		headers = headers.set('Content-Type', 'application/json');
		headers = headers.set('X-GDC-AuthTT', this._sessionService.TOKEN_TT);
		return headers;
	}
}