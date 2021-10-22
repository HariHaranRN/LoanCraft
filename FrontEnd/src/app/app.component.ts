import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(
    private router: Router
  ) {}
  ngOnInit(): void {
    let loginCheck = localStorage.getItem("login");
    if(loginCheck == undefined || loginCheck == null || loginCheck == ""){
      this.router.navigate(['login']);
    }
  }
}
