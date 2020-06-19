import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit, Input } from '@angular/core';
import * as invariant from 'invariant';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import { AttributeFilter } from '@gooddata/react-components';

interface AtributeFilterProps {
  projectId?: string;
  identifier?: string;
  onApply?: any;
  uri?: any;
  sdk;
  onApplyWithFilterDefinition;
  filter?: any;
  fullscreenOnMobile?: any;
}

@Component({
  selector: 'app-atribute-filter',
  templateUrl: './atribute-filter.component.html',
  styleUrls: ['./atribute-filter.component.scss'],
})
export class AtributeFilterComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @Input() projectId: string;
  @Input() identifier: string;
  @Input() onApply: any;
  @Input() sdk: any;
  @Input() uri: any;
  @Input() onApplyWithFilterDefinition: any;
  @Input() filter: any;
  @Input() fullscreenOnMobile: any;


  private rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): AtributeFilterProps {
    const {
      projectId,
      identifier,
      onApply,
      sdk,
      uri,
      onApplyWithFilterDefinition,
      filter,
      fullscreenOnMobile
    } = this;
    return {
      projectId,
      identifier,
      onApply,
      sdk,
      uri,
      onApplyWithFilterDefinition,
      filter,
      fullscreenOnMobile
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(AttributeFilter, this.getProps()), this.getRootDomNode());
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
