import {ElementRef, Directive, Input} from '@angular/core';
/**
 * Created by funkp on 05.02.2017.
 */

@Directive({
  selector: '[focus]',
  exportAs: 'focus'
})
export class FocusDirective {
  @Input() focus:boolean;
  constructor(public el: ElementRef) {

  }

  setFocus() {
    this.el.nativeElement.querySelector('input').focus();
  }

  ngOnInit () {
    if (this.focus) {
      this.setFocus();
    }
  }
}
