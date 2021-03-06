import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private _language: string;

  constructor(
    private _globalization: Globalization,
		private _translate: TranslateService
  ) { }

  config() {
		this._translate.setDefaultLang('pt');

		this._globalization.getPreferredLanguage()
			.then(res => {
				this._language = res.value.toLowerCase().substring(0, 2);
				this._translate.setDefaultLang(res.value.toLowerCase().substring(0, 2));
				this._translate.use(res.value.toLowerCase().substring(0, 2));
			})
			.catch(e => {
				this._language = 'pt';
				this._translate.use('pt');
			});
	}

	getLanguage() {
		return this._language;
	}
}
