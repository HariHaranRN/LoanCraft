import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class PayInterestService {

    loanIdDatas = [];   

    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService
    ) {
    }

    getLoanByID(loanID): Promise<any> {
        this.spinner.show();
        return new Promise((resolve, reject) => {
            this.http.post(`http://localhost:92/newLoan/getByID`, {
                loanID: loanID
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

    updateLoanInterest(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(`http://localhost:92/newLoan/updateInterest`, {
                _id: data.id,
                interestPaid: data.interestPaid
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

    addHistory(id, amount): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`http://localhost:92/history/add`, {
            loanID: id,
            interestAmount: amount
            }).subscribe((res) => {
                const result: any = res;
                if (result.statusCode == 200) {
                  resolve(result);
                }
                else {
                  resolve(result);
                }
            }, error => {
                reject(error);
            });
        });
    }

}