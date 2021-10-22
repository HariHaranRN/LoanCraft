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
    templateUrl: './newLoan.component.html'
})

export class NewLoanComponent implements OnInit{

    newLoanForm: FormGroup;

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
        var today = new Date().toISOString().split('T')[0];

        this.newLoanForm.get('name').setValue("");
        this.newLoanForm.get('pName').setValue("");
        this.newLoanForm.get('date').setValue(today);
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

    async submit(){
        var submittedValues = {
            name: this.newLoanForm.value.name,
            pName: this.newLoanForm.value.pName,
            date: this.newLoanForm.value.date,
            mobileNo: this.newLoanForm.value.mobileNo,
            aMobileNo: this.newLoanForm.value.aMobileNo,
            address: this.newLoanForm.value.address,
            amount: this.newLoanForm.value.amount,
            interest: this.newLoanForm.value.interest,
            interestPaid: this.newLoanForm.value.interestPaid,
            notes: this.newLoanForm.value.notes
        };
        let result = await this.NLS.addNewLoan(submittedValues);
        if(result){
            const data = result.data.createLoan;
            if(submittedValues.interestPaid > 0){
            }
            this.spinner.hide();
            this.Toastr.success( 'Loan Created Successfully', '', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
                });
                this.clearForm();
                this.router.navigate(['/loanProgress']);
        }else{
            this.spinner.hide();
            this.Toastr.error( "Something went wrong", '', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
                });
        }
    }
}
