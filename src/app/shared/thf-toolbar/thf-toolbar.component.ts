import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'thf-toolbar',
  templateUrl: './thf-toolbar.component.html',
  styleUrls: ['./thf-toolbar.component.scss'],
})
export class ThfToolbarComponent  implements OnInit {
  @Input() titleText: string;
  @Input() showMenu: boolean = false;
  @Input() buttonText: string;
  @Input() buttonDisabled : boolean =false;
  @Output() buttonCallback: EventEmitter<string> = new EventEmitter(true);
  @Input() showShadow: boolean = true;
  @Input() showLogo: boolean=false;

  isRootPage: boolean;
  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController
  ) { }

  ngOnInit(){
      //this.isRootPage = !this.navCtrl.canGoBack();
  }

  btClick(event) {
    if(!this.buttonDisabled){
        this.buttonCallback.emit(event);
    }
  }
}
