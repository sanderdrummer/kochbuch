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

  setAlert(className = 'alert-info', message) {
    this.alerts = [{
      className,
      message
    }];
  }

  pushAlert(className = 'alert-info', message) {
    if (message) {
      this.alerts.push({
        className,
        message
      })
    }

  }

  resetAlerts(){
    this.alerts = [];
  }
}
