import { Component, ViewChild } from '@angular/core';
import { factory } from '@gooddata/gooddata-js';
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
import { Router, RouterEvent } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootPage: any;
  private gooddata: any;
  private mingleService = new MingleService();
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
    private _navCtrl: NavController,
    private _sessionService: SessionService,
    private _projectsService: ProjectsService,
    private router: Router
  ) {
    this.initializeApp();
  }

  async initializeApp() {    

    await this._platform.ready();
    
    const config = new Configuration();
    config.app_identifier = '59a8c3953abca80001f0200c';
    config.environment = 'HOM';
    config.server = 'https://hom-mingle.totvs.com.br/api';
    // config.app_identifier = '59c3ef78d11c330001b5e421';
    // config.environment = 'PROD';
    // config.server = 'https://mingle.totvs.com.br/api';
    config.modules.crashr = false;
    config.modules.usage_metrics = true;
    config.modules.gateway = true;
    config.modules.push_notification = false;
    config.modules.user_data = true;
    config.modules.ocr = false;
    config.modules.web = true;
    this.mingleService.setConfiguration(config);

    // this.mingleService.auth.login('andre.dini@totvs.com.br', 'Guiomar2438@$#*', 'TOTVS').subscribe(() => {
    //   this.mingleService.registerMetric('APP_INIT');
    //   console.log('Sign in ok');
       
    //   }, (authError) => {
    //     console.log(authError)       
    //   console.log('Authentication Error: User or password invalid!');
       
    //   }
    // );
			
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
      //Esse comando causa o erro que vai parar no CATCH
      await this._sessionService.initSession();
			//refresh do token TT (GoodData)
			await this._loginService.refreshToken().toPromise();
			// Listen to mingle user sign out
			this.mingleService.registerAnalyticsToken(this._sessionService.TOKEN_TT, this._sessionService.userAgent);

			// Init mingle service
			await this.mingleService.init().then(res => { 
        console.log('init' + res);
        debugger
      });
			this._listenMingleSignOut();
			await this._getSavedProject();
    
    } catch(error){
			this.mingleService.auth.logout().subscribe();
			this._sessionService.clear();
			await this.mingleService.init().then(res => {
        console.log(res)
        debugger
      });
      
      //this.rootPage = LoginPage;
      this._sessionService.FirstPage = 'LoginPage';
      this._navCtrl.navigateForward(['/login']);
			console.error(error);
		} finally {
			this._splashScreen.hide();
		}
 }

  private async _getSavedProject() {
		try {
      debugger
      this.mingleService.auth.analytics(this._sessionService.TOKEN_TT, this._sessionService.userAgent, 'TOTVSANALYTICS')
        .pipe(map(res => 'custom'));

			let project = await this._projectsService.getSavedProject();
	
			this._sessionService.projectId = project.id;
			this._sessionService.projectName = project.name;
      //this.rootPage = MenuPage;
      this._sessionService.FirstPage = 'MenuPage';
		} catch(error) {
			let projects = await this.mingleService.getUserData('projects').toPromise();

			if (Object.keys(projects).length === 0 || projects['projects'].length === 0) {
        //this.rootPage = ConfigPage;
        this._sessionService.FirstPage
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
        this.mingleService.getUser()
            .subscribe(user => {
				// Se não há dados de sessão no mingle
				let test = this.mingleService.getSessionInfo().user;
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
