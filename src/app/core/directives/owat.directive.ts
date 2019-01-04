import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[swOwat]',
})
export class OwatDirective implements OnInit {

  @Input() owatId: string;
  @Input() owatValue: string;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    if (!this.owatId) {
      throw Error('owatId attribute is mandatory');
    }
    this.renderer.setAttribute(this.element.nativeElement, `owat-${this.owatId}`, this.owatValue || '');
    this.renderer.removeAttribute(this.element.nativeElement, 'swOwat');
    if (this.owatValue) {
      this.renderer.removeAttribute(this.element.nativeElement, 'owatValue');
    }
  }

}
