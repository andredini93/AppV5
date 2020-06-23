import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { factory } from '@gooddata/gooddata-js';
import { VisualizationInput } from "@gooddata/typings";

import { HttpService } from '../providers/http-service';
import { VisualizationComponent } from '../components/visualization/visualization.component';
import { AtributeFilterComponent } from '../components/atribute-filter/atribute-filter.component';
import { KpiReport } from '../models/KpiReport';
import { KpiDash } from '../models/KpiDash';
import { SessionService } from '../providers/session-service';

@Component({
  selector: 'app-dashboard-kpi',
  templateUrl: './dashboard-kpi.page.html',
  styleUrls: ['./dashboard-kpi.page.scss'],
})
export class DashboardKPIPage implements OnInit {

  private flag = false;
  private arrayFilter = [];
  private arrayDashboardKPI:KpiDash[] = [];
  private arrayDashboardKPI_RelFinal:KpiReport[] = [];
  public filterValue: any[] = []; 
  public compRefVisual: ComponentRef<VisualizationComponent>;
  public compRefFilter: ComponentRef<AtributeFilterComponent>;
  @ViewChild('templateFilter', { read: ViewContainerRef, static: true }) entryFilter: ViewContainerRef;
  @ViewChild('templateComponent', { read: ViewContainerRef, static: true }) entryComponent: ViewContainerRef;

  constructor(private _httpService: HttpService,
    private _sessionService: SessionService,
    private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.ProcessaFiltro();
  }

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
        this.flag = false;
        if(inType == "in"){
          this.filterValue.forEach(element => {

            if(element.negativeAttributeFilter != undefined){                
                if(element.negativeAttributeFilter.displayForm.uri == filter.positiveAttributeFilter.displayForm.uri){

                    this.filterValue = this.filterValue.filter(fv => fv != element);
                }
            }
            
            if(element.positiveAttributeFilter != undefined){
                if(element.positiveAttributeFilter.displayForm.uri 
                        == filter.positiveAttributeFilter.displayForm.uri){

                    this.filterValue = this.filterValue.filter(fv => fv != element)
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
              if(element.positiveAttributeFilter.displayForm.uri == filter.negativeAttributeFilter.displayForm.uri){

                  this.filterValue = this.filterValue.filter(fv => fv != element);
              }
            }
            
            if(element.negativeAttributeFilter != undefined){
                if(element.negativeAttributeFilter.displayForm.uri 
                    == filter.negativeAttributeFilter.displayForm.uri){
                    
                    this.filterValue = this.filterValue.filter(fv => fv != element)
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

  createFilter(){
    const factory2 = this.resolver.resolveComponentFactory(AtributeFilterComponent);
    for (const iterator of this.arrayFilter) {
      this.compRefFilter = this.entryFilter.createComponent(factory2);
      this.compRefFilter.instance.uri = iterator.uri;
      this.compRefFilter.instance.onApplyWithFilterDefinition = this.onApplyWithFilterDefinition;
      this.compRefFilter.instance.sdk = this._sessionService.sdkGD;
    }    
  }

  createComponent() {
    this.entryComponent.clear(); 
    const componentFactory = this.resolver.resolveComponentFactory(VisualizationComponent);
    
    for (const iterator of this.arrayDashboardKPI_RelFinal) {
        this.compRefVisual = this.entryComponent.createComponent(componentFactory);
        (<VisualizationComponent>this.compRefVisual.instance).sdk = this._sessionService.sdkGD;
        (<VisualizationComponent>this.compRefVisual.instance).projectId = iterator.projectId;
        (<VisualizationComponent>this.compRefVisual.instance).uri = iterator.uriREL;
        (<VisualizationComponent>this.compRefVisual.instance).filters = this.filterValue;
    }
  }

  async ProcessaFiltro(){    
    const factory2 = this.resolver.resolveComponentFactory(AtributeFilterComponent);
    // 1º Busco as informações dos Dashboards.
    await this.getDashboardInfo();
      
    //Para cada Dashboard.....
    for await (let element of this.arrayDashboardKPI){
        console.log('Filtro - Link Dashboard: ' + element.linkFoward);
        //Busco a Primeira informação do Relatório
        await this._httpService.get(element.linkFoward).toPromise().then(async (res: any) => {
          
            //3º Pego as informações para montar o VISUALIZATION
            await this._httpService.get(res.analyticalDashboard.content.filterContext)
                                    .toPromise().then(async (res2: any) => {
              for await(let elFilter of res2.filterContext.content.filters){
                  console.log('Filtro - Link Filtro: ' + elFilter.attributeFilter.displayForm);

                  this.compRefFilter = this.entryFilter.createComponent(factory2);
                  this.compRefFilter.instance.uri = elFilter.attributeFilter.displayForm;
                  this.compRefFilter.instance.onApplyWithFilterDefinition = this.onApplyWithFilterDefinition;
                  this.compRefFilter.instance.sdk = this._sessionService.sdkGD;
              }
            });
        });
    }
    this.ProcessaComponent();
  }

  async ProcessaComponent(){
      console.log('PROCESSA COMPONENT');
      await this.getDashboardInfo();

      for await (let element of this.arrayDashboardKPI){
        console.log('Component - Link Dashboard: ' + element.linkFoward);

        await this._httpService.get(element.linkFoward).toPromise().then(async (res: any) => {
          for await (const iterator of res.analyticalDashboard.content.widgets) {    
            //3º
            console.log('Component - Link Widget: ' + iterator);
            await this._httpService.get(iterator).toPromise().then(async (res2: any) => {
                if(res2.kpi == undefined){
                  this.arrayDashboardKPI_RelFinal.push({
                    projectId: 'p25mdfc7x86riaqqzxjpqjezzpktqs5r',
                    idDash: element.idDash,
                    nomeDash: element.nomeDash,
                    uriREL: res2.visualizationWidget.content.visualization 
                  });
                }              
            });    
          }
        });
      }
      this.createComponent();
  }

  async getDashboardInfo(){
    console.log('GET DASHBOARD INFO')
    this.arrayDashboardKPI = [];
    return this._httpService.get('/gdc/md/p25mdfc7x86riaqqzxjpqjezzpktqs5r/query/analyticaldashboard', {})
    .toPromise().then(async (res:any) => {
        res.query.entries.forEach((element:any) => {
            this.arrayDashboardKPI.push({
              idDash: element.identifier,nomeDash: element.title,linkFoward: element.link
            });
            console.log('Preenchi o arrayDashboard');
        });
        return this.arrayDashboardKPI;
    })
  }
}