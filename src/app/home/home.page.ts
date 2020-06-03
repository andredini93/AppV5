import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,
         ComponentRef, ComponentFactory } from '@angular/core';
import { LoginService } from '../providers/login-service';
import { SessionService } from '../providers/session-service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../providers/http-service';
import { iterator } from 'rxjs/internal-compatibility';
import { VisualizationComponent } from '../components/visualization/visualization.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private URL_: any;
  private arrayDashboardKPI:DashboardKPI_Estru[] = [];
  private arrayDashboardKPI_RelFinal:DashboardKPI_Relatorio_Final[] = [];
  @ViewChild('messagecontainer', { read: ViewContainerRef, static: true }) entry: ViewContainerRef

  constructor(private _loginService: LoginService,
              private _httpService: HttpService,
              private resolver: ComponentFactoryResolver,
              private _sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.PopulaKPI();  
  }

  async PopulaKPI(){
    const promiseA = await this._loginService.doLogin().then(() => {
      console.log('Usuário logado');
    });

    const promiseB = await this.ProcessaKPI().then(async (res) => {
      console.log('Estou no THEN do  ProcessaKPI')
    });

    Promise.all([promiseA,promiseB]).then(() => {
      this.createComponent();
    })

  }
  createComponent() {
    console.log('createComponent()');
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(VisualizationComponent);
    for (const iterator of this.arrayDashboardKPI_RelFinal) {
      const componentRef = this.entry.createComponent(factory);
      componentRef.instance.projectId = iterator.projectId;
      componentRef.instance.uri = iterator.uriREL;
    }
}

  async ProcessaKPI(){
    console.log('Estou no ProcessaKPI');
    
    // 1º
    await this._httpService.get('/gdc/md/p25mdfc7x86riaqqzxjpqjezzpktqs5r/query/analyticaldashboard', {})
    .toPromise().then(async (res:any) => {
      res.query.entries.forEach((element:any) => {
        this.arrayDashboardKPI.push({
          idDash: element.identifier,nomeDash: element.title,linkFoward: element.link
        });
        console.log('Preenchi o arrayDashboard');
      });
      
      for await (let element of this.arrayDashboardKPI){
          await this._httpService.get(element.linkFoward).toPromise().then(async (res: any) => {
            console.log(element.linkFoward);
            for await (const iterator of res.analyticalDashboard.content.widgets) {
          
              //3º
              await this._httpService.get(iterator).toPromise().then(async (res2: any) => {
                  if(res2.kpi == undefined){
                    let ArrayTemp2: DashboardKPI_Relatorio_Final = {
                      projectId: 'p25mdfc7x86riaqqzxjpqjezzpktqs5r',
                      idDash: element.idDash,
                      nomeDash: element.nomeDash,
                      uriREL: res2.visualizationWidget.content.visualization
                    };
                    this.arrayDashboardKPI_RelFinal.push(ArrayTemp2);
                    console.log('Registro ' + element.nomeDash + ' inserido');
                  }              
              });    
            }
          });
      }
    });
    //return this.arrayDashboardKPI_RelFinal;
  }
}

export class DashboardKPI_Estru {
  idDash: string;
  nomeDash: string;
  linkFoward: string
}

export class DashboardKPI_Relatorio_Final {
  projectId: string;
  idDash: string;
  nomeDash: string;
  uriREL: string;
}