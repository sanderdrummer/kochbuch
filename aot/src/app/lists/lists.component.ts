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
    loading: boolean;
    error: string;
    visible: boolean;

    constructor(private api:ListService, private fb:FormBuilder) {
        this.addListForm = fb.group({
            'listName' : ['', Validators.required]
        });

        this.selectedList = new List({});
    }

    ngOnInit() {
        this.loadList();
        this.visible = true;
    }

    loadList() {
        this.loading = true;
        this.api.getLists()
            .finally(() => this.loading = false)
            .subscribe((lists) => {
            this.lists = lists;
        });
    }

    addList(listName:string): void {
        this.api.addList(listName).toPromise().then((list:List) => {
            this.lists.push(list);
            this.addListForm.reset();
        });
    }

    removeList(list:List) {
        this.api.removeList(list.id).toPromise().then((res) => {
            this.lists.splice(this.lists.indexOf(list),0);
        });
    }

    getDetails(list:List) {
        this.api.getList(list.id).subscribe((list) => {
            this.selectedList = list;
        });
    }

    toggleView() {
        this.visible = !this.visible;
    }
}
