import { Directive, Output, EventEmitter, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

@Directive({
    selector: '[debounceKeyUp]'
})
export class DebounceKeyUpDirective implements OnInit {
    @Input() debounceTime = 500;
    @Output() debounceKeyUps = new EventEmitter();
    private keyups = new Subject();
    private subscription: Subscription;

    constructor() { }

    ngOnInit() {
        this.subscription = this.keyups.debounceTime(this.debounceTime)
            .subscribe(e => this.debounceKeyUps.emit(e));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    @HostListener('keyup', ['$event'])
    clickEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        this.keyups.next(event);
    }
}


@Directive({
    selector: '[ngModel][debounce]',
})
export class DebounceDirective {
    @Output() public onDebounce = new EventEmitter<any>();

    @Input('debounce') public debounceTime: number = 500;

    constructor(public model: NgControl) {
    }

    ngOnInit() {
        this.model.valueChanges
            .debounceTime(this.debounceTime)
            .subscribe(modelValue => {
                this.onDebounce.emit(modelValue);
            });
    }
}