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
  reorderable = true;
  loadingIndicator = true;
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'gender' },
    { name: 'company' }
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLogged ? this.router.navigate(['products']) : this.router.navigate(['login']);
  }

}
