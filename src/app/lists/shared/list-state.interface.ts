import {ListModel} from './list.model';
/**
 * Created by Tobias on 20.02.2017.
 */
export interface ListStateInterface {
  lists: ListModel[];
  selectedList: ListModel;
}
