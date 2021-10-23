import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { API } from 'aws-amplify'

@Injectable()
export class LoanHistoryService{

    loanHistoryDatas = [];
    constructor(
        private spinner: NgxSpinnerService
    ) {

    }


    async getLoanHistorys(loanID: any): Promise<any> {
        this.spinner.show();
        const query = `
            query getLoanHistoryByID {
                getLoanHistoryByID(loanID: "${loanID}") {
                date
                interestPaid
                loanID
                }
            }
        `
        const result = await API.graphql({ query });
        this.spinner.hide();
        return result;
    }



}