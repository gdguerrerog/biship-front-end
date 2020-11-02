import { Injectable } from '@angular/core';
import { GeneralRequest } from './GeneralRequest.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRequst {

  private URL = '/admin';

  constructor(private request: GeneralRequest) {}

  async logIn(username: string, password: string){
    const res = await this.request.sendRequest(this.URL + '/login', {username, password}, 'POST', false);
    if(res.ok) {
        this.request.setToken(res.data.accessToken);
        res.data.accessToken = undefined;
    }
    
    return res;
  }

  logOut() {
    this.request.clearToken();
  }
}