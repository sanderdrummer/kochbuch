import {BehaviorSubject} from "rxjs";
/**
 * Created by funkp on 19.03.2017.
 */
export class Store<T> {

  state$: BehaviorSubject<T>;
  state: T;

  constructor() {
  }

  init(state:T) {
    this.state = state;
    this.state$ = new BehaviorSubject(state);
  }


  update(newState:any) {
    this.state$.next(Object.assign(this.state$.getValue(), newState));
  }
}
