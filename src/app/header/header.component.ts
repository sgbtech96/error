import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: Boolean = localStorage.token!="0";
  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }
  openLoginForm() {
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }
  openRegisterForm() {
    this.dialog.open(RegisterComponent, {width: '500px', height: '450px'});
  }
  logOutUser()
  {
    localStorage.token = 0;
    this.isLogged = false;
    location.reload();
  }
}
