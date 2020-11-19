import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoanProgressService implements Resolve<any>
{

    loanDatas = [];
    loanIdDatas = [];
    onLoanChanged: BehaviorSubject<any>;
    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService
    ) {
        this.onLoanChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getActiveLoans()
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
                this.onLoanChanged.next(this.loanDatas);
                resolve(this.loanDatas);
                this.spinner.hide();
            }, error => {
                this.loanDatas = [];
                reject(this.loanDatas);
                this.spinner.hide();
            });
        });
    }

    getLoanByID(loanID): Promise<any> {
        this.spinner.show();
        return new Promise((resolve, reject) => {
            this.http.post(`http://localhost:92/newLoan/getByID`, {
                loanID: loanID,
                isActive: true
            }).subscribe(res => {
                const result: any = res;
                this.loanIdDatas = [];
                if (result.statusCode == 200) {
                    this.loanIdDatas = result.data;
                }
                resolve(this.loanIdDatas);
                this.spinner.hide();
            }, error => {
                this.loanIdDatas = [];
                reject(this.loanIdDatas);
                this.spinner.hide();
            });
        });
    }




    updateLoan(item: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(`http://localhost:92/newLoan/update`, {
                _id: item._id,
                name: item.name,
                pName: item.pName,
                date: item.date,
                mobileNo: item.mobileNo,
                aMobileNo: item.aMobileNo,
                address: item.address,
                // amount: item.amount,
                // interest: item.interest,
                // interestPaid: item.interestPaid,
                // pendingAmount: item.pendingAmount,
                notes: item.notes
            }).subscribe(res => {
                const result:any = res;
                if (result.statusCode == 200) {
                        resolve(res);
                }
                else {
                    resolve(res);
                }
            }, error => {
                reject(error);
            });
        });
    }

    updateLoanStatus(id, status): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(`http://localhost:92/newLoan/updateStatus`, {
                _id: id,
                isActive: status
            }).subscribe(res => {
                const result:any = res;
                if (result.statusCode == 200) {
                        resolve(res);
                }
                else {
                    resolve(res);
                }
            }, error => {
                reject(error);
            });
        });
    }

    deleteLoan(ID: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`http://localhost:92/newLoan/delete`, {
                _id: ID,
            }).subscribe(res => {
                const result: any = res;
                if (result.statusCode == 200) {
                        resolve(res);
                }
                else {
                    resolve(res);
                }
            }, error => {
                reject(error);
            });
        });
    }

}