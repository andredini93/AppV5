import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController, MenuController } from '@ionic/angular';
import { LoginService } from '../providers/login-service';
import { MingleService } from '@totvs/mingle';
import { TranslateService } from '@ngx-translate/core';
import { ConfigPage } from '../config/config.page';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: FormGroup;
	showErrors: boolean = false;
	public rememberMe = true;
	public aliases = [
		{
			value: 'TOTVSANALYTICS',
			label: 'Fast Analytics'
		},
		{
			value: 'TOTVSANALYTICS',
			label: 'Smart Analytics'
		},
		{
			value: 'FLUIGANALYTICS',
			label: 'Fluig Analytics'
		}
  ];
  vlrDefaultAlias = this.aliases[0];

  constructor(
		private _formBuilder: FormBuilder,
		private _loadingCtrl: LoadingController,
		private _loginService: LoginService,
    private _mingleService: MingleService,
    private _menuCtrl: MenuController,
		private _navCtrl: NavController,
		private _storage: Storage,
    private _toastCtrl: ToastController,
    private _translateService: TranslateService
  ) {
    this.login = this._formBuilder.group({
			user: ['andre.dini@totvs.com.br', Validators.required],
			password: ['andre123', Validators.required],
			showPassword: false,
			alias: this.aliases[0]
		});
  }

  async ngOnInit() {
    this._menuCtrl.enable(false);
    let key = 'rememberMe';
		let shouldRemember = await this._storage.get(key);
		if (shouldRemember == null || shouldRemember == undefined) {
			await this._storage.set(key, true);
			return;
		}
    
		this.rememberMe = shouldRemember;
  }

	public async doLogin(user: string, password: string, alias: any) {
    //debugger
		if (alias instanceof Array) {
			alias = alias[0];
		}

		let loader = await this._loadingCtrl.create({});
		await loader.present();

		this._loginService.doLogin(user, password, alias.value)
			// .flatMap(auth => {
			// 	this._mingleService.registerMetric('GOODATA_ALIAS', { alias: alias.label });
			// 	return this._mingleService.getUserData('projects');
			// })
			.subscribe(async projects => {
				// if (Object.keys(projects).length === 0 || projects['projects'].length === 0) {
        //   //this._navCtrl.setRoot(ConfigPage);
        //   this._navCtrl.navigateForward(['/ConfigPage']);
          
				// } else {
        //   //this._navCtrl.setRoot(ReloadProject);
        //   this._navCtrl.navigateForward(['/ReloadProject']);
				// }
        await loader.dismiss();
        this._navCtrl.navigateForward(['/menu']);
        
			},
				async (authError) => {
          console.log(authError);
					await loader.dismiss();
					this._showErrorToast(authError);
				});
	}

	public managePwd(passwordEl) {
		passwordEl.type = this.login.controls.showPassword.value ? 'text' : 'password';
		passwordEl.setBlur();
		passwordEl.setFocus();
	}

	private _showErrorToast(authError) {
		this._translateService.get(['LOGIN.INVALID_LOGIN', 'LOGIN.NETWORK_ERROR', 'LOGIN.ERROR']).subscribe(
			async value => {
				let msg = value['LOGIN.ERROR']
				if (authError.status == 0) {
					msg = value['LOGIN.NETWORK_ERROR']
				}
				if (authError.status == 401) {
					msg = value['LOGIN.INVALID_LOGIN']
				}
				let toast = await this._toastCtrl.create({
					message: msg,
					cssClass: 'error',
					duration: 3000,
					position: 'top'
				});
				await toast.present();
			}
		)
	}

	public processKeyUp(e, el) {
		if (e.keyCode == 13) { // 13 = enter
			el.setFocus();
		}
	}

	public processKeyUpLogin(e, user: string, password: string, alias: string) {
		if (e.keyCode == 13) { // 13 = enter
			this.doLogin(user, password, alias);
		}
	}

	public async rememberUser(rememberMe) {
		await this._storage.set('rememberMe', rememberMe);
	}

	public aliasCompareFn(a, b) {
		return a.label == b.label;
	}

}
