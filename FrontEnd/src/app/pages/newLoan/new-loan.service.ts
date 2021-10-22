import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { API } from 'aws-amplify'

@Injectable()
export class NewLoanService
{


    constructor(
        private spinner: NgxSpinnerService
    ) {

    }


    async addNewLoan(item: any): Promise<any> {
        this.spinner.show();
        const query = `
            mutation createLoan {
                createLoan(loan: {
                    aMobile: "${item.aMobileNo}", 
                    address: "${item.address}", 
                    amount: ${item.amount}, 
                    date: "${item.date}", 
                    interest: ${item.interest}, 
                    interestPaid: ${item.interestPaid}, 
                    mobile: "${item.mobileNo}", 
                    name: "${item.name}", 
                    notes: "${item.notes}", 
                    parentName: "${item.pName}"
                }){
                    interestPaid
                    loanID
                }
            }
        `
        const result = await API.graphql({ query });
        this.spinner.hide();
        return result;
        // return new Promise((resolve, reject) => {
        //     this.http.post(`http://localhost:92/newLoan/add`, {
        //       name: item.name,
        //       pName: item.pName,
        //       date: item.date,
        //       mobileNo: item.mobileNo,
        //       aMobileNo: item.aMobileNo,
        //       address: item.address,
        //       amount: item.amount,
        //       interest: item.interest,
        //       interestPaid: item.interestPaid,
        //       notes: item.notes
        //     }).subscribe((res) => {
        //         const result: any = res;
        //         if (result.statusCode == 200) {
        //           resolve(result);
        //         }
        //         else {
        //           resolve(result);
        //         }
        //     }, error => {
        //         reject(error);
        //     });
        // });
    }


}