import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { VisualizationInput } from "@gooddata/typings";
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { LineChart, Kpi, Visualization } from '@gooddata/react-components';
import '@gooddata/react-components/styles/css/main.css';
import { SDK } from '@gooddata/gooddata-js';
import { AFM } from "@gooddata/typings";

interface VisualizationProps {
  projectId: string;
  uri?: string;
  identifier?: string;
  sdk;
  filters?: AFM.ExtendedFilter[];
}

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss'],
})

export class VisualizationComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() measures: VisualizationInput.AttributeOrMeasure[];
  @Input() trendBy?: VisualizationInput.IAttribute;
  @Input() sdk;
  @Input() projectId: string;
  @Input() uri: string;
  @Input() identifier: string;
  @Input() filters: AFM.ExtendedFilter[];
  @Input() format: string;
  @Input() onLoadingChanged?: (any);
  @Input() onError?: (any);

  private rootDomID: string;

  // constructor(private commonService: CommonService){
  //   this.commonService.nameSubject.subscribe(res => this.name2 = res);
  // }

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): VisualizationProps {
    const {
      projectId,
      uri,
      identifier,
      sdk,
      filters
    } = this;
    return {
      projectId,
      uri,
      identifier,
      sdk,
      filters
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Visualization, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}