import {Component, OnInit} from '@angular/core';
import {List} from "../../shared/list";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    @Input() list:List;
    constructor() {
    }

    ngOnInit() {
    }

}
