import {ListModel} from '../models/list.model';
/**
 * Created by Tobias on 20.02.2017.
 */
export interface ListStateInterface {
  loading?:boolean
  lists: ListModel[],
  selectedList: ListModel
}
