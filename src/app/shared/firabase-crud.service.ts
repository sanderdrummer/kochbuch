import {Injectable} from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
@Injectable()
export class FireBaseCrudService {

  constructor(public af: AngularFire) {}

  update(path:string, obj:any):firebase.Promise<void> {
    return this.read(path).update(obj);
  }

  delete(path:string):firebase.Promise<void> {
    return this.read(path).remove();
  }

  read(path:string):FirebaseObjectObservable<any> {
    return this.af.database.object(path);
  }
}
