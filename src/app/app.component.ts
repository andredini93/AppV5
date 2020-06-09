import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform, Config, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from './providers/login-service';
import { MingleService, Configuration } from '@totvs/mingle';
import { MenuPage } from './menu/menu.page';
import { ConfigPage } from './config/config.page';
import { LoginPage } from './login/login.page';
import { ReloadProjectPage } from './reload-project/reload-project.page';
import { GeolocationService } from './providers/geolocation.service';
import { SessionService } from './providers/session-service';
import { ProjectsService } from './providers/projects.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootPage: any;
  //@ViewChild('nav', { static:true}) nav: NavController;
  
  constructor(
    private platform: Platform,
    private _config: Config,
    private _splashScreen: SplashScreen,
    private _statusBar: StatusBar,
    private _platform: Platform,
    private _geolocationService: GeolocationService,
    private _translateService: TranslateService,
    private _loginService: LoginService,
    private _sessionService: SessionService,
    private _navCtrl: NavController,
    private _projectsService: ProjectsService,
    private _mingleService: MingleService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    const config = new Configuration();
    config.app_identifier = '59a8c3953abca80001f0200c';
    config.environment = 'PROD';
    config.server = 'https://hom-mingle.totvs.com.br/api';
    config.modules.crashr = false;
    config.modules.usage_metrics = true;
    config.modules.gateway = true;
    config.modules.push_notification = false;
    config.modules.user_data = true;
    config.modules.ocr = true;
    config.modules.web = false;
    this._mingleService.setConfiguration(config);

    await this._platform.ready();
			
		//configura i18n
    this._geolocationService.config();

		this._translateService.get(['COMMOM.BACK_BUTTON'])
			.subscribe(values => {
				//this._config.set('ios', 'backButtonText', values['COMMOM.BACK_BUTTON']);
			});

		// this._statusBar.overlaysWebView(false);
		this._statusBar.backgroundColorByName("white");
		this._statusBar.styleDefault();

		try {
			//verifica se o TOKEN SST e o USER_ID estão salvos e se deveria iniciar a sessão ou refazer o login
			await this._sessionService.initSession();
			//refresh do token TT (GoodData)
			await this._loginService.refreshToken().toPromise();
			// Listen to mingle user sign out
			this._mingleService.registerAnalyticsToken(this._sessionService.TOKEN_TT, this._sessionService.userAgent);

			// Init mingle service
			await this._mingleService.init();
			this._listenMingleSignOut();
			await this._getSavedProject();
		} catch(error){
			this._mingleService.auth.logout().subscribe();
			this._sessionService.clear();
			await this._mingleService.init();
      //this.rootPage = LoginPage;
      this._navCtrl.navigateForward(['/login']);
			console.error(error);
		} finally {
			this._splashScreen.hide();
		}
  }

  private async _getSavedProject() {
		try {
			let project = await this._projectsService.getSavedProject();
	
			this._sessionService.projectId = project.id;
			this._sessionService.projectName = project.name;
			this.rootPage = MenuPage;
		} catch(error) {
			let projects = await this._mingleService.getUserData('projects').toPromise();

			if (Object.keys(projects).length === 0 || projects['projects'].length === 0) {
				this.rootPage = ConfigPage;
			} else {
				this.rootPage = ReloadProjectPage;
			}
		}
	}

	private generateExecId() {
		var id = 0;
		var date = new Date();
		id = date.getTime();
		return id;
	}

	private _listenMingleSignOut() {
		// Se Usuário do mingle está == undefined
        this._mingleService.getUser()
            .subscribe(user => {
				// Se não há dados de sessão no mingle
				let test = this._mingleService.getSessionInfo().user;
				// Se nao há usuario nem dados de sssão = mingle já rolou o sign out
				if (!user && !test) {
					// Limpar os dados da sessão do good data
					this._sessionService.clear()
						.then(() => {
							//exibir mensagem para o usuário e voltar para tela de login
							//this.nav.setRoot(LoginPage);
						});
				}
			}, err => {
				console.log(err)
			});
	}
}
