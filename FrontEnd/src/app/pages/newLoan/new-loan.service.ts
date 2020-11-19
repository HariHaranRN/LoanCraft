import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class NewLoanService implements Resolve<any>
{


    constructor(
        private http: HttpClient
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        var P = this;
        return new Promise((resolve, reject) => {
            Promise.all([
            ]).then(() => { resolve(); }, reject);
        });
    }

    addNewLoan(item: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`http://localhost:92/newLoan/add`, {
              name: item.name,
              pName: item.pName,
              date: item.date,
              mobileNo: item.mobileNo,
              aMobileNo: item.aMobileNo,
              address: item.address,
              amount: item.amount,
              interest: item.interest,
              interestPaid: item.interestPaid,
              notes: item.notes
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