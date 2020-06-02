import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { VisualizationInput } from "@gooddata/typings";
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { LineChart, Kpi } from '@gooddata/react-components';
import '@gooddata/react-components/styles/css/main.css';

interface LineChartProps {
  measures: VisualizationInput.AttributeOrMeasure[];
  trendBy?: VisualizationInput.IAttribute;
  projectId: string;
  filters?: VisualizationInput.IFilter[];
}

@Component({
  selector: 'app-lineChart',
  templateUrl: './lineChart.component.html'
})

export class LineChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() measures: VisualizationInput.AttributeOrMeasure[];
  @Input() trendBy?: VisualizationInput.IAttribute;
  @Input() projectId: string;
  @Input() filters: any[];
  @Input() format: string;
  @Input() onLoadingChanged?: (any);
  @Input() onError?: (any);

  private rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): LineChartProps {
    const {
      projectId,
      measures,
      trendBy,
      filters
    } = this;
    return {
      projectId,
      measures,
      trendBy,
      filters
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(LineChart, this.getProps()), this.getRootDomNode());
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