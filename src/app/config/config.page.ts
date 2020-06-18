import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goToConfig(){
    this._navCtrl.navigateForward(['/select-project']);
  }

}
