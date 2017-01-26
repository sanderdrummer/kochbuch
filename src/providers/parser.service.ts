/**
 * Created by Tobias on 16.01.2017.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class ParserService {

  parseFireBaseObjToArray(obj: {}):any[] {
    return Object.keys(obj).filter((id) => {
      return id && id.indexOf('$') == -1
    })
  }
}
