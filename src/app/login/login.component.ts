import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { FormpostService } from '../services/formpost.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {phone: '', password: ''};
  constructor(public dialogRef: MatDialogRef<LoginComponent>, public formpostService: FormpostService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.formpostService.login(this.user).subscribe(
      data => {
        console.log(data);
        localStorage.token = data.token;
        this.formpostService.show().subscribe(
          data => {
            console.log(data);
            location.reload();
          }
        )
      }
    )
    this.dialogRef.close();
  }
  
}
