import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SessionService } from '../providers/session-service';
import { VisualizationComponent } from '../components/visualization/visualization.component';
import { LoginService } from '../providers/login-service';
import { DashboardKPI_Estru } from '../models/KpiDash';
import { DashboardKPI_Relatorio } from '../models/KpiReport';
import { HttpService } from '../providers/http-service';

//GOODDATA
import { factory } from '@gooddata/gooddata-js';
import { VisualizationInput, AFM } from "@gooddata/typings";
import { Model } from '@gooddata/react-components';
import { ContainerFilterDirective } from './container-filter.directive';
import { ContainerDirective } from './container.directive';
import { AtributeFilterComponent } from '../components/atribute-filter/atribute-filter.component';

@Component({
  selector: 'app-dashboard-kpi',
  templateUrl: './dashboard-kpi.page.html',
  styleUrls: ['./dashboard-kpi.page.scss'],
})
export class DashboardKPIPage implements OnInit {

  private URL_: any;
  private gooddata: any;
  public filterValue: AFM.ExtendedFilter[]; 
  private arrayDashboardKPI:DashboardKPI_Estru[] = [];
  private arrayDashboardKPI_RelFinal:DashboardKPI_Relatorio[] = [];
  
  @ViewChild(ContainerFilterDirective, { static: true }) containerFilter: ContainerFilterDirective;
  @ViewChild(ContainerDirective, { static: true }) container: ContainerDirective;
  public compRefVisual: ComponentRef<VisualizationComponent>;
  public compRefFilter: ComponentRef<AtributeFilterComponent>;
  public locationResortUri: string = '/gdc/md/p25mdfc7x86riaqqzxjpqjezzpktqs5r/obj/590';

  constructor(private _sanitizer: DomSanitizer,
              private _loginService: LoginService,
              private _httpService: HttpService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private _sessionService: SessionService) { 

    this.filterValue = [
      Model.negativeAttributeFilter('label.filial.codigodafilial', []),
      Model.negativeAttributeFilter('label.csv_comprascarteira.bk_condicao_de_pagamento', [])
    ];
  }

  ngOnInit() {
    this.gooddata = factory({ domain: 'https://localhost:4200' });
    this.gooddata.user.login('andre.dini@totvs.com.br', 'andre123')
    .then((response) => {
      console.log('Login OK', response);
      //debugger
      this.PopulaKPI();
    })
    .catch((apiError) => {
      console.error('Login failed', apiError, "\n\n", apiError.responseBody);
      alert(apiError);
      alert(apiError.responseBody);
     // debugger
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
    const isPositiveFilter = VisualizationInput.isPositiveAttributeFilter(filter);
    const inType = isPositiveFilter ? "in" : "notIn";
    const filterItems = isPositiveFilter
        ? filter.positiveAttributeFilter[inType]
        : filter.negativeAttributeFilter[inType];

    if (!filterItems.length && isPositiveFilter) {
        console.log('The filter must have at least one item selected');
    } else {
      //debugger      
      this.filterValue = [filter];
      this.createComponent();
    }
  };

  filterPositiveAttribute(filter) {
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
    this.filterValue = filters;
  }

  filterNegativeAttribute(filter) {
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
      this.filterValue = filters;
  }


  async PopulaKPI(){

    const promiseB = await this.ProcessaKPI().then(async (res) => {
      console.log('Estou no THEN do  ProcessaKPI')
      this.createFilter();
      this.createComponent();
    });

    // Promise.all([promiseB]).then(() => {
    //   this.createFilter;      
    // })

  }

  createFilter(){
    const viewContainerRef = this.containerFilter.viewContainerRef;

    const factory2 = this.componentFactoryResolver.resolveComponentFactory(AtributeFilterComponent);
    this.compRefFilter = viewContainerRef.createComponent(factory2);
    this.compRefFilter.instance.projectId = "p25mdfc7x86riaqqzxjpqjezzpktqs5r";
    this.compRefFilter.instance.filter = this.filterValue[0];
    this.compRefFilter.instance.onApply = this.onApply;
    this.compRefFilter.instance.onApplyWithFilterDefinition = this.onApplyWithFilterDefinition;
    this.compRefFilter.instance.sdk = this.gooddata;


    this.compRefFilter = viewContainerRef.createComponent(factory2);
    this.compRefFilter.instance.projectId = "p25mdfc7x86riaqqzxjpqjezzpktqs5r";
    this.compRefFilter.instance.filter = this.filterValue[1];
    this.compRefFilter.instance.onApply = this.onApply;
    this.compRefFilter.instance.onApplyWithFilterDefinition = this.onApplyWithFilterDefinition;
    this.compRefFilter.instance.sdk = this.gooddata;

    this.createComponent();
  }

  createComponent() {
      const viewContainerRef = this.container.viewContainerRef;
      viewContainerRef.clear(); 
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(VisualizationComponent);
      
      for (const iterator of this.arrayDashboardKPI_RelFinal) {
          this.compRefVisual = viewContainerRef.createComponent(componentFactory);
          (<VisualizationComponent>this.compRefVisual.instance).sdk = this.gooddata;
          (<VisualizationComponent>this.compRefVisual.instance).projectId = iterator.projectId;
          (<VisualizationComponent>this.compRefVisual.instance).uri = iterator.uriREL;
          (<VisualizationComponent>this.compRefVisual.instance).filters = this.filterValue;
      }
  }

  async ProcessaKPI(){    
    // 1º
    await this._httpService.get( 'gdc/md/p25mdfc7x86riaqqzxjpqjezzpktqs5r/query/analyticaldashboard', {})
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
                    let ArrayTemp2: DashboardKPI_Relatorio = {
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