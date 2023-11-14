import {
    AfterViewInit,
    Directive,
    ElementRef,
} from '@angular/core';

@Directive({
    selector: '[aeScrollIntoView]',
})
export class ScrollIntoView implements AfterViewInit {
    constructor(private readonly el: ElementRef<HTMLDivElement>) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.scrollIntoView({behavior: 'smooth'});
    }
}

