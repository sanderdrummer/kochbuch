import * as types from './constants';
import { Product } from '../product/reducer';
import { Action } from '../../../../store/action';

export type ProductAction = Action<Product>;
export const add = (payload: Product) => ({ type: types.ADD, payload });
export const update = (payload: Product) => ({ type: types.UPDATE, payload });

export type Actions = ProductAction;