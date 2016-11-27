import { Action } from '@ngrx/store';

class ActionCreator<T> implements Action {
  constructor(
    public type: string = 'NOT_SET',
    public payload?: T
  ) {}
}

export class ActionFactory {
  static create?<T>(type: string, defaultPayloadValue?: any) {
    return (payload?: T) => new ActionCreator<T>(type, payload || defaultPayloadValue);
  }
}
