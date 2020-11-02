
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralRequest {

  private token:string = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }



  private async generalRequest(url: string, data: any, config: any, type: string){
    let request: Promise<any>;
    const reqUrl = environment.API_URL + url;
    switch (type) {
      case 'GET': request = this.http.get(reqUrl, config).toPromise(); break;
      case 'POST': request = this.http.post(reqUrl, data, config).toPromise(); break;
      case 'PUT': request = this.http.put(reqUrl, data, config).toPromise(); break;
    }

    try{
      const data = await request.then();
      return {
        data: data.data,
        ok: true,
      }
    }catch(err){
      console.log(err);
      return{
        ok: false,
        err
      }
    }
  }

  async sendRequest(url: string, body: any, type: string, useAuth: boolean){
    const config: any = {
      responseType: 'json',
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    };
    if (useAuth && this.token != null ) config.headers.set('Authorization', this.token);

    const bodyReq = new URLSearchParams();
    for(const key in body) bodyReq.set(key, body[key]);

    return this.generalRequest(url, bodyReq.toString(), config, type);
  }

  clearToken() {
    localStorage.clear();
    this.token = null;
  }

  isLogged(): boolean {
    return this.token !== null;
  }

  setToken(token){
    this.token = token;
    localStorage.setItem('token', token);
  }
}
