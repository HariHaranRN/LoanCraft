import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoanProgressService } from '../loanProgress/loanProgress.service';
import { PayInterestService } from './payInterest.service';


@Component({
    selector: 'payInterest-cmp',
    templateUrl: './payInterest.component.html'
})

export class PayInterestComponent implements OnInit{
    disabledForm: FormGroup;
    searchID;
    interestPaid;
    pendingAmount = 0;
    interestAmount;
    dateOfPaid;
    showForm = true;
    showStatus = false;

    constructor(
        private fb: FormBuilder,
        private PIS: PayInterestService,
        private Toastr: ToastrService,
        private LPS: LoanProgressService
    ){
        this.disabledForm = fb.group({
            loanID: [{ value: "", disabled: true},[Validators.required]],
            name: [{ value: "", disabled: true},[Validators.required]],
            pName: [{ value: "", disabled: true},[Validators.required]],
            mobileNo: [{ value: "", disabled: true},[Validators.required]],
            amount: [{ value: "", disabled: true},[Validators.required]],
            interest: [{ value: "", disabled: true},[Validators.required]],
            paidInterest: [{ value: "", disabled: true},[Validators.required]]
        });
        this.dateOfPaid = new Date().toISOString().split('T')[0];
        this.showForm = true;
        this.showStatus = false;
    }
    ngOnInit(){
        this.showForm = true;
        this.showStatus = false;
    }

    async searchByID(){
        let result = await this.LPS.getLoanByID(this.searchID);
        let finalResult = result.data.getLoanByID;
            if(finalResult.length > 0){
                this.interestPaid = finalResult[0].interestPaid;
                debugger
                let created = new Date(finalResult[0].date);
                let currentDate = new Date();
                var months;
                months = (currentDate.getFullYear() - created.getFullYear()) * 12;
                months -= created.getMonth();
                months += currentDate.getMonth();
                months <= 0 ? 0 : months;
                var total = months * finalResult[0].interest;
                var pending = total - finalResult[0].interestPaid;
                this.pendingAmount = pending;
                this.disabledForm.get('loanID').setValue(finalResult[0].loanID)
                this.disabledForm.get('name').setValue(finalResult[0].name);
                this.disabledForm.get('pName').setValue(finalResult[0].parentName);
                this.disabledForm.get('mobileNo').setValue(finalResult[0].mobile);
                this.disabledForm.get("amount").setValue(finalResult[0].amount);
                this.disabledForm.get("interest").setValue(finalResult[0].interest);
                this.disabledForm.get("paidInterest").setValue(finalResult[0].interestPaid);
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
                this.disabledForm.get("paidInterest").setValue("");
                this.showForm = true;
                this.showStatus = false;
                this.Toastr.error( "Wrong Loan ID", '', {
                    timeOut: 3000,
                    positionClass: 'toast-top-center'
                  });
            }
    }

    async payInterest(){
        if(this.interestAmount === undefined || null ){
            this.Toastr.error( "Please enter the amount", '', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
              });
        }else if(this.interestAmount < 100){
            this.Toastr.error( "Minimum amount is 100", '', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
              });
        }else if(this.interestAmount > this.pendingAmount ){
            this.Toastr.warning( "Entered amount is more than pending amount", '', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
              });
        }else{
        var data: any = [];
        data.loanID = this.disabledForm.value.loanID;
        data.interestPaid = this.interestAmount;
        data.dateOfPaid = this.dateOfPaid;
        let result = await this.PIS.updateLoanInterest(data);
        if(result.data.updatePendingAmount){
            this.showForm = false;
            this.showStatus = true;
            this.interestAmount = 0;
        }else{
            this.Toastr.error( "Something went wrong", '', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
            });
        }
    }
    }
}
