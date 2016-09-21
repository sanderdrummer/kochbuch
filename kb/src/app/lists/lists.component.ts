import {Component, OnInit} from '@angular/core';
import {ListService} from "../shared/list.service";
import {List} from "../shared/list";

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    providers: [ListService]
})
export class ListsComponent implements OnInit {

    lists:List[];
    selectedList:List;
    newList:string;
    constructor(private api:ListService) {
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

    addList() {
        this.api.addList(this.newList).toPromise().then((list:List) => {
            this.lists.push(list);
            this.newList = '';
        });
    }

    getDetails(list:List) {
        this.api.getList(list.id).subscribe((list) => {
            console.log(list);
            this.selectedList = list;
        });
    }

}
