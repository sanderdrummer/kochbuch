import {ListModel} from '../list/list.model';

export class State {

  lists:ListModel[];
  selectedList:ListModel;
  products:any[];

  constructor(){
    this.lists = [];
    this.selectedList = null;
    this.products = [];
  }
}
