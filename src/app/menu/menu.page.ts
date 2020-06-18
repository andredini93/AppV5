import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { LoginService } from '../providers/login-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  activePath = '';
  private options = [];

  pages = [
    {
      name: 'Home',
      path: '/menu/home',
      icon: 'home'
    },
    {
      name: 'Dashboard-KPI',
      path: '/menu/dashboard-kpi',
      icon: 'home'
    },
    {
      name: 'Dashboard',
      path: '/menu/dashboard',
      icon: 'home'
    },
    {
      name: 'Organizar Tabs',
      path: '/menu/reorder-tabs',
      icon: 'home'
    },
    {
      name: 'Trocar Projeto',
      path: '/menu/select-project',
      icon: 'home'
    }
  ]


  constructor(private router: Router,
              private _navCtrl: NavController,
              private _loginService: LoginService,
              private translate: TranslateService,
              private _alertCtrl: AlertController) {
      this.router.events.subscribe((event: RouterEvent) => {
        this.activePath = event.url
      });

      this.getTranslatedValues();

   }

  ngOnInit() {
    this._navCtrl.navigateForward(['/menu/home'])
  }

  async showConfirmLogout(){
    let confirm = await this._alertCtrl.create({
			header: this.options['LOGOUT_TITLE'],
			message: this.options['LOGOUT_MSG'],
			buttons: [
				{
					text: this.options['LOGOUT_CANCEL'],
					handler: () => {
						console.log('Disagree clicked');
					}
				},
				{
					text: this.options['LOGOUT_CONFIRM'],
					handler: () => {
						this.logout();
					}
				}
			]
		});
		await confirm.present();
  }

  private logout() {
		this._loginService.logout().then(
			value => {
        //this.mingle.registerMetric('LOGOUT');
        //this._navCtrl.setRoot(LoginPage);
        this._navCtrl.navigateRoot(['/menu/login']);
			}
		)
  }
  
  getTranslatedValues() {
		this.translate.get('MENU.LOGOUT_TITLE').subscribe(
			value => {
				this.options['LOGOUT_TITLE'] = value;
			});
		this.translate.get('MENU.LOGOUT_MSG').subscribe(
			value => {
				this.options['LOGOUT_MSG'] = value;
			});
		this.translate.get('MENU.LOGOUT_CONFIRM').subscribe(
			value => {
				this.options['LOGOUT_CONFIRM'] = value;
			});
		this.translate.get('MENU.LOGOUT_CANCEL').subscribe(
			value => {
				this.options['LOGOUT_CANCEL'] = value;
			});
	}

}
