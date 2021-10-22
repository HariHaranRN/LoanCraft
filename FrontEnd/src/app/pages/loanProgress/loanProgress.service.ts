import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { API } from 'aws-amplify'

@Injectable()
export class LoanProgressService
{

    loanDatas = [];
    loanIdDatas = [];
    constructor(
        private spinner: NgxSpinnerService
    ) {
    }
    
    async getLoans(val: boolean): Promise<any> {
        this.spinner.show();
        const query = `
            query getLoans {
                getLoans(isActive: ${val}) {
                loanID
                name
                parentName
                date
                mobile
                aMobile
                address
                amount
                interest
                interestPaid
                notes
                isActive
                }
            }
        `
        const result = await API.graphql({ query });
        this.spinner.hide();
        return result;
    }

    async getLoanByID(loanID): Promise<any> {
        this.spinner.show();
        const query = `
        query getLoanByID {
            getLoanByID(loanID: "${loanID}") {
              loanID
              name
              parentName
              date
              mobile
              aMobile
              address
              amount
              interest
              interestPaid
              notes
              isActive
            }
          }
        `
        const result = await API.graphql({ query });
        this.spinner.hide();
        return result;
    }




    async updateLoan(item: any): Promise<any> {
        this.spinner.show();
        const query = `
            mutation MyMutation {
                updateLoan(loan: {aMobile: "${item.aMobileNo}", address: "${item.address}", amount: ${item.amount}, date: "${item.date}", interest: ${item.interest}, loanID: "${item.loanID}", mobile: "${item.mobileNo}", name: "${item.name}", parentName: "${item.pName}", notes: "${item.notes}"}) {
                    loanID
                    name
                    parentName
                    date
                    mobile
                    aMobile
                    address
                    amount
                    interest
                    interestPaid
                    notes
                    isActive
                }
            }
        `
        const result = await API.graphql({ query });
        this.spinner.hide();
        return result;
    }

    async updateLoanStatus(id, status): Promise<any> {
        this.spinner.show();
        const query = `
        mutation changeLoanStatus {
            changeLoanStatus(isActive: ${status}, loanID: "${id}") {
              isActive
            }
        }
        `
        const result = await API.graphql({ query });
        this.spinner.hide();
        return result;
    }

    async deleteLoan(ID: any): Promise<any> {
        this.spinner.show();
        const query = `
        mutation deleteLoan {
            deleteLoan(loanID: "${ID}")
        }
        `
        const result = await API.graphql({ query });
        this.spinner.hide();
        return result;
    }

}