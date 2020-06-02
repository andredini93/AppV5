import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { VisualizationInput } from "@gooddata/typings";
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { LineChart, Kpi, Visualization } from '@gooddata/react-components';
import '@gooddata/react-components/styles/css/main.css';

interface VisualizationProps {
  projectId: string;
  uri?: string;
  identifier?: string;
}

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html'
})

export class VisualizationComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() measures: VisualizationInput.AttributeOrMeasure[];
  @Input() trendBy?: VisualizationInput.IAttribute;
  @Input() projectId: string;
  @Input() uri: string;
  @Input() identifier: string;
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

  protected getProps(): VisualizationProps {
    const {
      projectId,
      uri,
      identifier
    } = this;
    return {
      projectId,
      uri,
      identifier
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