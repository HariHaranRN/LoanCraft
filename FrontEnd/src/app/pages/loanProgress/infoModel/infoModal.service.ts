import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class InfoModalService{

    loanIndoDatas = [];
    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService
    ) {

    }


    getActiveLoans(loanID): Promise<any> {
        this.spinner.show();
        return new Promise((resolve, reject) => {
            this.http.post(`http://localhost:92/newLoan/getByID`, {
                loanID: loanID,
                isActive: true
            }).subscribe(res => {
                const result: any = res;
                this.loanIndoDatas = [];
                if (result.statusCode == 200) {
                    this.loanIndoDatas = result.data;
                }
                resolve(this.loanIndoDatas);
                this.spinner.hide();
            }, error => {
                this.loanIndoDatas = [];
                reject(this.loanIndoDatas);
                this.spinner.hide();
            });
        });
    }



}