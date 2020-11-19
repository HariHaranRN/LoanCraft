import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from './dashboard.service';


@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public progressLoans = 0;
  public closedLoans = 0;
  public totalLoans = 0;
  public pendingInterest = 0;
  public calc = [];
  public calc2 = [];
  public totalLoan = 0;

  constructor(
    private DS: DashboardService
  ){

  }

ngOnInit(){
  this.DS.onActiveLoanChanged.subscribe((result: any)=>{
    this.progressLoans = result.length;
    var total;
    var pendingAmount;
    for(let i= 0; i < result.length; i++){
      let created = new Date(result[i].date);
      let currentDate = new Date();
      var months;
      months = (currentDate.getFullYear() - created.getFullYear()) * 12;
      months -= created.getMonth();
      months += currentDate.getMonth();
      months <= 0 ? 0 : months;
      total = months * result[i].interest;
      pendingAmount = total - result[i].interestPaid;
      this.calc2[i] = result[i].amount;
      if(pendingAmount > 0){
        this.calc[i] = pendingAmount;
      }
  }
    var count = this.calc.reduce((accum,item) => accum + item, 0);
    var count2 = this.calc2.reduce((accum,item) => accum + item, 0);
    this.pendingInterest = count;
    this.totalLoan = count2;
  });
  this.DS.onClosedLoanChanged.subscribe((result: any)=>{
    this.closedLoans = result.length;
  });
  this.totalLoans = this.progressLoans + this.closedLoans;
}
}
