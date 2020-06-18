import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[conponentFilter-container]',
})
export class ContainerFilterDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}