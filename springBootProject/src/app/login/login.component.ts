import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  isLogged = document.cookie ? true : false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  cookie: any;
  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }

  msgs1: any;

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  login(val: { username: string; password: any; }) {
    console.log('login method called from username: ' + val.username  );
    this.loginService.login(val.username, val.password).subscribe(data => {
      if (data != null){
        document.cookie = data.username;
        this.cookie = data.username;
        this.router.navigate(['products']);
        this.snackBar.open('Login successfull!!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar']
        });
      }
    });
    setTimeout( () => {
    // tslint:disable-next-line:no-unused-expression
      document.cookie ? '' : this.snackBar.open('Login failed!!', '', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['red-snackbar']
      });
    } , 1000);
  }
}
