import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
@Injectable()
export class FireBaseCrudService {

  constructor(public af: AngularFireDatabase) {
  }

  update(path: string, obj: any): any {
    return this.read(path).update(obj);
  }

  delete(path: string): any {
    return this.read(path).remove();
  }

  read(path: string): FirebaseObjectObservable<any> {
    return this.af.object(path);
  }
}
