import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from './dashboard.service';


@Component({
    selector: 'dashboard-cmp',
    templateUrl: './dashboard.component.html'
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

  async ngOnInit(){
    const result = await this.DS.getDashboard();
    const dashboard = result.data.getDashboard;
      this.totalLoans = dashboard.length;
      var total;
      var pendingAmount;
      for(let i= 0; i < dashboard.length; i++){
        let created = new Date(dashboard[i].date);
        let currentDate = new Date();
        var months;
        months = (currentDate.getFullYear() - created.getFullYear()) * 12;
        months -= created.getMonth();
        months += currentDate.getMonth();
        months <= 0 ? 0 : months;
        total = months * dashboard[i].interest;
        pendingAmount = total - dashboard[i].interestPaid;
        this.calc2[i] = dashboard[i].amount;
        if(pendingAmount > 0){
          this.calc[i] = pendingAmount;
        }
        if(dashboard[i].isActive){
          this.progressLoans = this.progressLoans + 1;
        }else {
          this.closedLoans = this.closedLoans + 1;
        }

    }
      var count = this.calc.reduce((accum,item) => accum + item, 0);
      var count2 = this.calc2.reduce((accum,item) => accum + item, 0);
      this.pendingInterest = count;
      this.totalLoan = count2;
  }
  }
