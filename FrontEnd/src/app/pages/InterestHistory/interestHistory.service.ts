import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoanHistoryService{

    loanHistoryDatas = [];
    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService
    ) {

    }


    getLoanHistorys(loanID): Promise<any> {
        this.spinner.show();
        return new Promise((resolve, reject) => {
            this.http.post(`http://localhost:92/history/getByID`, {
                loanID: loanID
            }).subscribe(res => {
                const result: any = res;
                this.loanHistoryDatas = [];
                if (result.statusCode == 200) {
                    this.loanHistoryDatas = result.data;
                }
                resolve(this.loanHistoryDatas);
                this.spinner.hide();
            }, error => {
                this.loanHistoryDatas = [];
                reject(this.loanHistoryDatas);
                this.spinner.hide();
            });
        });
    }



}