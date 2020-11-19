import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewLoanService } from './new-loan.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { PayInterestService } from '../payInterest/payInterest.service';

@Component({
    selector: 'newLoan-cmp',
    moduleId: module.id,
    templateUrl: 'newLoan.component.html'
})

export class NewLoanComponent implements OnInit{

    newLoanForm: FormGroup;
    loanID;

    constructor(
        private fb: FormBuilder,
        private NLS: NewLoanService,
        private Toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private PIS: PayInterestService
    ){
        var today = new Date().toISOString().split('T')[0];
        this.newLoanForm = fb.group({
            name: [{ value: "", disabled: false},[Validators.required]],
            pName: [{ value: "", disabled: false},[Validators.required]],
            date: [{ value: today, disabled: false},[Validators.minLength(2)]],
            mobileNo: [{ value: "", disabled: false},[Validators.required]],
            aMobileNo: [{ value: "", disabled: false}],
            address: [{ value: "", disabled: false},[Validators.required]],
            amount: [{ value: "", disabled: false},[Validators.required]],
            interest: [{ value: "", disabled: false},[Validators.required]],
            interestPaid: [{ value: 0, disabled: false},[Validators.required]],
            notes: [{ value: "", disabled: false}]
        });
    }
    ngOnInit(){
    }

    clearForm(){
        this.newLoanForm.get('name').setValue("");
        this.newLoanForm.get('pName').setValue("");
        this.newLoanForm.get('date').setValue("");
        this.newLoanForm.get('mobileNo').setValue("");
        this.newLoanForm.get("aMobileNo").setValue("");
        this.newLoanForm.get("address").setValue("");
        this.newLoanForm.get("amount").setValue("");
        this.newLoanForm.get("interest").setValue("");
        this.newLoanForm.get("interestPaid").setValue(0);
        this.newLoanForm.get("notes").setValue("");

        this.newLoanForm.get('name').markAsUntouched();
        this.newLoanForm.get('pName').markAsUntouched();
        this.newLoanForm.get('date').markAsUntouched();
        this.newLoanForm.get('mobileNo').markAsUntouched();
        this.newLoanForm.get("aMobileNo").markAsUntouched();
        this.newLoanForm.get("address").markAsUntouched();
        this.newLoanForm.get("amount").markAsUntouched();
        this.newLoanForm.get("interest").markAsUntouched();
        this.newLoanForm.get("interestPaid").markAsUntouched();
        this.newLoanForm.get("notes").markAsUntouched();

        this.newLoanForm.markAsUntouched();
        this.newLoanForm.markAsPristine();

    }

    submit(){
        this.spinner.show();
        var submittedValues = this.newLoanForm.value;
        this.NLS.addNewLoan(submittedValues).then((result: any)=>{
            if( result.statusCode == 200 ){
                this.loanID = result.data.loanID;
                if(submittedValues.interestPaid > 0){
                    this.PIS.addHistory(this.loanID, submittedValues.interestPaid);
                }
                this.spinner.hide();
                this.Toastr.success( 'New Loan Created', 'Success', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-center'
                  });
                  this.clearForm();
                  this.router.navigate(['/loanProgress']);
            }else{
                this.spinner.hide();
                this.Toastr.error( "Check the details", 'Failed', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-center'
                  });
            }
        });
    }
}
