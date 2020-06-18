import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[conponent-container]',
})
export class ContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}