import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,
         ComponentRef, ComponentFactory } from '@angular/core';
import { LoginService } from '../providers/login-service';
import { SessionService } from '../providers/session-service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../providers/http-service';
import { iterator } from 'rxjs/internal-compatibility';
import { VisualizationComponent } from '../components/visualization/visualization.component';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public menuCtrl: MenuController
              ) {
  }

  ngOnInit(): void {    
  } 
}