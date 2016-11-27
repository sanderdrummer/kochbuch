import {ListModel} from '../list/list.model';

export class State {

  lists:ListModel[];
  selectedList:ListModel;
  products:any[];
  alerts:any[];

  constructor(){
    this.lists = [];
    this.selectedList = null;
    this.products = [];
    this.alerts = [];
  }
}
