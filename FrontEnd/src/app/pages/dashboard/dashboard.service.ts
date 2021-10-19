import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class DashboardService implements Resolve<any>
{

    loanDatas = [];
    loanIdDatas = [];
    onActiveLoanChanged: BehaviorSubject<any>;
    onClosedLoanChanged: BehaviorSubject<any>;
    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService
    ) {
        this.onActiveLoanChanged = new BehaviorSubject({});
        this.onClosedLoanChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([
                // this.getActiveLoans(),
                // this.getClosedLoans()
            ]).then(() => { resolve(); }, reject);
        });
    }
    
    getActiveLoans(): Promise<any> {
        this.spinner.show();
        return new Promise((resolve, reject) => {
            this.http.post(`http://localhost:92/newLoan/`, {
                isActive: true,
            }).subscribe(res => {
                const result: any = res;
                this.loanDatas = [];
                if (result.statusCode == 200) {
                    this.loanDatas = result.data;
                }
                this.onActiveLoanChanged.next(this.loanDatas);
                resolve(this.loanDatas);
                this.spinner.hide();
            }, error => {
                this.loanDatas = [];
                reject(this.loanDatas);
                this.spinner.hide();
            });
        });
    }

    getClosedLoans(): Promise<any> {
        this.spinner.show();
        return new Promise((resolve, reject) => {
            this.http.post(`http://localhost:92/newLoan/`, {
                isActive: false,
            }).subscribe(res => {
                const result: any = res;
                this.loanDatas = [];
                if (result.statusCode == 200) {
                    this.loanDatas = result.data;
                }
                this.onClosedLoanChanged.next(this.loanDatas);
                resolve(this.loanDatas);
                this.spinner.hide();
            }, error => {
                this.loanDatas = [];
                reject(this.loanDatas);
                this.spinner.hide();
            });
        });
    }



}