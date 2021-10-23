import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { API } from 'aws-amplify'

@Injectable()
export class PayInterestService {

    loanIdDatas = [];   

    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService
    ) {
    }

    async updateLoanInterest(data): Promise<any> {
        this.spinner.show();
        const query = `
            mutation MyMutation {
                updatePendingAmount(interestPaid: ${data.interestPaid}, loanID: "${data.loanID}", dateOfPaid: "${data.dateOfPaid}") {
                loanID
                interestPaid
                isActive
                }
            }
        `
        const result = await API.graphql({ query });
        this.spinner.hide();
        return result;
    }

}