import {Injectable} from '@angular/core';
/**
 * Created by Tobias on 18.01.2017.
 */
@Injectable()
export class AuthService {
  name:string;
  pw:string;

  constructor() {
    this.name = 'funkpunkdrummer@gmail.com';
    this.pw = 'xoquox22';
  }
}
