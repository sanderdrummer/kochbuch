import {Component, OnInit} from '@angular/core';
import {ListService} from "../shared/list.service";
import {List} from "../shared/list";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    providers: [ListService]
})
export class ListsComponent implements OnInit {

    lists:List[];
    selectedList:List;
    addListForm:FormGroup;

    constructor(private api:ListService, private fb:FormBuilder) {
        this.addListForm = fb.group({
            'listName' : ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loadList();
    }

    loadList() {
        this.api.getLists().subscribe((lists) => {
            console.log(lists);
            this.lists = lists;
        });
    }

    addList(listName:string): void {
        this.api.addList(listName).toPromise().then((list:List) => {
            this.lists.push(list);
            this.addListForm.reset();
        });
    }

    getDetails(list:List) {
        this.api.getList(list.id).subscribe((list) => {
            console.log(list);
            this.selectedList = list;
        });
    }
}
