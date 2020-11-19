import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PayInterestService } from './payInterest.service';


@Component({
    selector: 'payInterest-cmp',
    templateUrl: 'payInterest.component.html'
})

export class PayInterestComponent implements OnInit{
    disabledForm: FormGroup;
    searchID;
    loanUpdateID;
    interestPaid;
    pendingAmount = 0;
    interestAmount;
    showForm = true;
    showStatus = false;

    constructor(
        private fb: FormBuilder,
        private PIS: PayInterestService,
        private Toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private router: Router
    ){
        this.disabledForm = fb.group({
            loanID: [{ value: "", disabled: true},[Validators.required]],
            name: [{ value: "", disabled: true},[Validators.required]],
            pName: [{ value: "", disabled: true},[Validators.required]],
            mobileNo: [{ value: "", disabled: true},[Validators.required]],
            amount: [{ value: "", disabled: true},[Validators.required]],
            interest: [{ value: "", disabled: true},[Validators.required]]
        });
        this.showForm = true;
        this.showStatus = false;
    }
    ngOnInit(){
        this.showForm = true;
        this.showStatus = false;
    }


    searchByID(){
        this.PIS.getLoanByID(this.searchID).then((result: any)=>{
            if(result.length > 0){
                this.interestPaid = result[0].interestPaid;
                this.loanUpdateID = result[0]._id;
                let created = new Date(result[0].date);
                let currentDate = new Date();
                var months;
                months = (currentDate.getFullYear() - created.getFullYear()) * 12;
                months -= created.getMonth();
                months += currentDate.getMonth();
                months <= 0 ? 0 : months;
                var total = months * result[0].interest;
                var pending = total - result[0].interestPaid;
                this.pendingAmount = pending;
                this.disabledForm.get('loanID').setValue(result[0].loanID)
                this.disabledForm.get('name').setValue(result[0].name);
                this.disabledForm.get('pName').setValue(result[0].pName);
                this.disabledForm.get('mobileNo').setValue(result[0].mobileNo);
                this.disabledForm.get("amount").setValue(result[0].amount);
                this.disabledForm.get("interest").setValue(result[0].interest);
                this.showForm = true;
                this.showStatus = false;
            }else{
                this.pendingAmount = 0;
                this.disabledForm.get('loanID').setValue("")
                this.disabledForm.get('name').setValue("");
                this.disabledForm.get('pName').setValue("");
                this.disabledForm.get('mobileNo').setValue("");
                this.disabledForm.get("amount").setValue("");
                this.disabledForm.get("interest").setValue("");
                this.showForm = true;
                this.showStatus = false;
                this.Toastr.warning( "No List Found", '', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-center'
                  });
            }
        })
    }

    payInterest(){
        if(this.interestAmount === undefined || null ){
            this.Toastr.error( "Please pay some amount", '', {
                timeOut: 3000,
                positionClass: 'toast-bottom-center'
              });
        }else{
        this.spinner.show();
        var data: any = [];
        data.id = this.loanUpdateID;
        if(this.interestPaid != undefined){
        data.interestPaid = this.interestPaid + this.interestAmount;
        }
        this.PIS.updateLoanInterest(data).then((result: any)=>{
            if(result.statusCode == 200 ){
                this.PIS.addHistory(this.searchID, this.interestAmount);
                this.showForm = false;
                this.showStatus = true;
                this.interestAmount = 0;
                // this.router.navigateByUrl('/progressReport', { skipLocationChange: true }).then(() => {
                //     this.router.navigate(['payInterest']);
                //     this.Toastr.success( "Paid Successfully", '', {
                //         timeOut: 3000,
                //         positionClass: 'toast-bottom-center'
                //       });
                //   });
            }else{
                this.Toastr.error( "Something went wrong", '', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-center'
                  });
            }
        });
        this.spinner.hide();
    }
    }
}
