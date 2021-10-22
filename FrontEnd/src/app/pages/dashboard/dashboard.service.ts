import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { API } from 'aws-amplify'

@Injectable()
export class DashboardService
{

    loanDatas = [];
    loanIdDatas = [];
    constructor(
        private spinner: NgxSpinnerService
    ) {}

    
    async getDashboard(): Promise<any> {
        this.spinner.show();
        const query = `
            query getDashboard{
                getDashboard {
                    amount
                    interestPaid
                    interest
                    isActive
                    date
                    interestPaid
                }
            } 
        `
        const result = await API.graphql({ query });
        this.spinner.hide();
        return result;
    }

}