import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {

  title = 'springBootProject';
  isLogged = document.cookie ? true : false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLogged ? this.router.navigate(['products']) : this.router.navigate(['login']);
  }

}
