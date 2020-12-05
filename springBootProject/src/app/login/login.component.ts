import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  cookie: any;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  login(val: { username: string; password: any; }) {
    console.log('login method called from username: ' + val.username  );
    this.loginService.login(val.username, val.password).subscribe(data => {
      if (data != null){
        this.isLogged = true;
        this.cookie = data.username;
        this.router.navigate(['products']);
      }
    })  ;
  }
}
