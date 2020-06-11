import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SessionService } from '../providers/session-service';

@Component({
  selector: 'app-dashboard-kpi',
  templateUrl: './dashboard-kpi.page.html',
  styleUrls: ['./dashboard-kpi.page.scss'],
})
export class DashboardKPIPage implements OnInit {

  private URL_: any;

  constructor(private _sanitizer: DomSanitizer,
              private _sessionService: SessionService) { }

  ngOnInit() {
    document.cookie = "GDCAuthSST=" + this._sessionService.TOKEN_SST;
    this.URL_ = this._sanitizer.bypassSecurityTrustResourceUrl('https://analytics.totvs.com.br/dashboards/embedded/#/project/p25mdfc7x86riaqqzxjpqjezzpktqs5r/dashboard/aenEsRP8aBL8');
  }

}
