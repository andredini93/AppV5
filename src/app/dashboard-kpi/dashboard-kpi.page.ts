import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  ComponentRef, ComponentFactory, ApplicationRef } from '@angular/core';
import { LoginService } from '../providers/login-service';
import { SessionService } from '../providers/session-service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../providers/http-service';
import { iterator } from 'rxjs/internal-compatibility';
import { factory } from '@gooddata/gooddata-js';
import { VisualizationComponent } from '../components/visualization/visualization.component';
import { Model } from '@gooddata/react-components';
import { VisualizationInput, AFM } from "@gooddata/typings";
import { AtributeFilterComponent } from '../components/atribute-filter/atribute-filter.component';
import { Platform } from '@ionic/angular';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-dashboard-kpi',
  templateUrl: './dashboard-kpi.page.html',
  styleUrls: ['./dashboard-kpi.page.scss'],
})
export class DashboardKPIPage implements OnInit {

  private URL_: any;
  private gooddata: any;
  compRef: any;
  flag = false;
  private arrayFilter = [];
  private arrayDashboardKPI:DashboardKPI_Estru[] = [];
  private arrayDashboardKPI_RelFinal:DashboardKPI_Relatorio_Final[] = [];
  @ViewChild('templateFilter', { read: ViewContainerRef, static: true }) entryFilter: ViewContainerRef;
  @ViewChild('templateComponent', { read: ViewContainerRef, static: true }) entryComponent: ViewContainerRef;
  public state: any;
  public filterValue: any[] = []; 
  public locationResortUri: string = '/gdc/md/p25mdfc7x86riaqqzxjpqjezzpktqs5r/obj/590';
  public compRefVisual: ComponentRef<VisualizationComponent>;
  public compRefFilter: ComponentRef<AtributeFilterComponent>;

  constructor(private _loginService: LoginService,
    private _httpService: HttpService,
    private appRef: ApplicationRef,
    private _platform: Platform,
    private resolver: ComponentFactoryResolver,
    private _sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.gooddata = factory({ domain: 'https://localhost:4200' });
    this.gooddata.user.login('andre.dini@totvs.com.br', 'andre123')
    .then((response) => {
      console.log('Login OK', response);
      this.PopulaKPI();
    })
    .catch((apiError) => {
      console.error('Login failed', apiError, "\n\n", apiError.responseBody);
      alert(apiError);
    });
  }

  onApply = (filter: { in: any; }) => {
      //this.setState({ filters: [], error: null });
      if (filter.in) {
          this.filterPositiveAttribute(filter);
      } else {
          this.filterNegativeAttribute(filter);
      }
  };

  onApplyWithFilterDefinition = filter => {
    debugger
      const isPositiveFilter = VisualizationInput.isPositiveAttributeFilter(filter);
      const inType = isPositiveFilter ? "in" : "notIn";
      const filterItems = isPositiveFilter
        ? filter.positiveAttributeFilter[inType]
        : filter.negativeAttributeFilter[inType];

      if (!filterItems.length && isPositiveFilter) {
        console.log('The filter must have at least one item selected');
      } else {    
        //this.filterValue = [filter];
        if(inType == "in"){
          this.filterValue.forEach(element => {

            if(element.negativeAttributeFilter != undefined){
              
                // if(this.filterValue.find(fv => fv.negativeAttributeFilter.displayForm.uri 
                //                               == filter.positiveAttributeFilter.displayForm.uri) != undefined)
                
                if(element.negativeAttributeFilter.displayForm.uri == filter.positiveAttributeFilter.displayForm.uri){
          
                    // this.filterValue = this.filterValue.filter(fv => fv.negativeAttributeFilter.displayForm.uri 
                    //                                               != filter.negativeAttributeFilter.displayForm.uri);

                    this.filterValue = this.filterValue.filter(fv => fv != element);
                }
            }
            
            if(element.positiveAttributeFilter != undefined){
              
                if(this.filterValue.find(fv => fv.positiveAttributeFilter.displayForm.uri 
                                               == filter.positiveAttributeFilter.displayForm.uri) != undefined){
          
                    this.filterValue = this.filterValue.filter(fv => fv.positiveAttributeFilter.displayForm.uri 
                                                                  != filter.positiveAttributeFilter.displayForm.uri);
                    this.filterValue.push(filter);
                    this.flag = true;
                }
            }
          });
            
          if(!this.flag){
            this.filterValue.push(filter)
            this.flag = false;
          }
        }
        else{
          this.filterValue.forEach(element => {

            if(element.positiveAttributeFilter != undefined){
              
              // if(this.filterValue.find(fv => fv.positiveAttributeFilter.displayForm.uri 
              //                                == filter.negativeAttributeFilter.displayForm.uri) != undefined)
              if(element.positiveAttributeFilter.displayForm.uri == filter.negativeAttributeFilter.displayForm.uri){
        
                  // this.filterValue = this.filterValue.filter(fv => fv.positiveAttributeFilter.displayForm.uri 
                  //                                               != filter.negativeAttributeFilter.displayForm.uri);

                  this.filterValue = this.filterValue.filter(fv => fv != element);
              }
            }
            
            if(element.negativeAttributeFilter != undefined){
              
                if(this.filterValue.find(fv => fv.negativeAttributeFilter.displayForm.uri 
                                               == filter.negativeAttributeFilter.displayForm.uri) != undefined){
          
                    this.filterValue = this.filterValue.filter(fv => fv.negativeAttributeFilter.displayForm.uri 
                                                                  != filter.negativeAttributeFilter.displayForm.uri);
                    this.filterValue.push(filter);
                    this.flag = true;
                }
            }
          });
            
          if(!this.flag){
            this.filterValue.push(filter)
            this.flag = false;
          }
        }
                
        this.createComponent();
      }
  };

  filterPositiveAttribute(filter) {
    debugger
    const filters = [
      {
          positiveAttributeFilter: {
              displayForm: {
                  identifier: filter.id,
              },
              in: filter.in.map(element => `${this.locationResortUri}/elements?id=${element}`),
          },
      },
    ];
    if (filter.in.length === 0) {
      console.log('The filter must have at least one item selected');
    }
    
  }

  filterNegativeAttribute(filter) {
    debugger
    const filters = [
      {
          negativeAttributeFilter: {
              displayForm: {
                  identifier: filter.id,
              },
              notIn: filter.notIn.map(element => `${this.locationResortUri}/elements?id=${element}`),
          },
      },
    ];
    //this.filterValue = filters;
    //this.filterValue.push(filters)
  }

  async PopulaKPI(){

    const promiseA = await this.ProcessaFiltro().then(async (res) => {
      console.log('Estou no THEN do  ProcessaFiltro')
    });

    const promiseB = await this.ProcessaKPI().then(async (res) => {
      console.log('Estou no THEN do  ProcessaKPI')
    });

    Promise.all([promiseA, promiseB]).then(() => {
      this.createFilter();
      this.createComponent();      
    })

  }

  createFilter(){
    const factory2 = this.resolver.resolveComponentFactory(AtributeFilterComponent);
    // //Criação de filtro por NOME DO ATRIBUTO
    // this.compRefFilter = this.entryFilter.createComponent(factory2);
    // this.compRefFilter.instance.projectId = "p25mdfc7x86riaqqzxjpqjezzpktqs5r";
    // this.compRefFilter.instance.filter = this.filterValue[0];
    // this.compRefFilter.instance.onApply = this.onApply;
    // this.compRefFilter.instance.onApplyWithFilterDefinition = this.onApplyWithFilterDefinition;
    // this.compRefFilter.instance.sdk = this.gooddata;

    for (const iterator of this.arrayFilter) {
      this.compRefFilter = this.entryFilter.createComponent(factory2);
      this.compRefFilter.instance.uri = iterator.uri;
      this.compRefFilter.instance.onApply = this.onApply;
      this.compRefFilter.instance.onApplyWithFilterDefinition = this.onApplyWithFilterDefinition;
      this.compRefFilter.instance.sdk = this.gooddata;
    }    
  }

  createComponent() {
    this.entryComponent.clear(); 
    const componentFactory = this.resolver.resolveComponentFactory(VisualizationComponent);
    
    for (const iterator of this.arrayDashboardKPI_RelFinal) {
        this.compRefVisual = this.entryComponent.createComponent(componentFactory);
        (<VisualizationComponent>this.compRefVisual.instance).sdk = this.gooddata;
        (<VisualizationComponent>this.compRefVisual.instance).projectId = iterator.projectId;
        (<VisualizationComponent>this.compRefVisual.instance).uri = iterator.uriREL;
        (<VisualizationComponent>this.compRefVisual.instance).filters = this.filterValue;
    }
  }

  async ProcessaFiltro(){    
    // 1º Busco as informações dos Dashboards.
    await this._httpService.get( 'gdc/md/p25mdfc7x86riaqqzxjpqjezzpktqs5r/query/analyticaldashboard', {})
    .toPromise().then(async (res:any) => {
      res.query.entries.forEach((element:any) => {
        this.arrayDashboardKPI.push({
          idDash: element.identifier,nomeDash: element.title,linkFoward: element.link
        });
        console.log('Filtro - Buscando Dashbaoards');
      });
      
      //Para cada Dashboard.....
      for await (let element of this.arrayDashboardKPI){
          //Busco a Primeira informação do Relatório
          await this._httpService.get(element.linkFoward).toPromise().then(async (res: any) => {
            console.log('Filtro - Link Dashboard: ' + element.linkFoward);

            //3º Pego as informações para montar o VISUALIZATION
            await this._httpService.get(res.analyticalDashboard.content.filterContext)
                                   .toPromise().then(async (res2: any) => {
              for await(let elFilter of res2.filterContext.content.filters){
                this.arrayFilter.push({uri: elFilter.attributeFilter.displayForm});
              }
              console.log('arrayFilter' + this.arrayFilter);
            });
          });
      }
    });
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


