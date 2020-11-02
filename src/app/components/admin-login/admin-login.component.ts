import { Component, OnInit } from '@angular/core';
import { AdminRequst } from '../../request/AdminRequest.service'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(private adminRequest : AdminRequst) { }

  ngOnInit(): void {
  }

  async login(){
    console.log(await this.adminRequest.logIn(this.username, this.password))
  }

}
