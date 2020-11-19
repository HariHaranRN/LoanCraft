import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CloseWarningComponent } from './closeWarning/closeWarning.component';
import { DeleteLoanComponent } from './deleteLoan/deleteLoan.component';
import { InfoModalComponent } from './infoModel/infoModal.component';
import { LoanProgressService } from './loanProgress.service';

declare interface TableData {
    dataRows: string[][];
}

@Component({
    selector: 'loanProgress-cmp',
    moduleId: module.id,
    templateUrl: 'loanProgress.component.html'
})

export class LoanProgressComponent implements OnInit{
    public progressTable: TableData;
    datas = [];
    showEdit = false;
    showTable = true;
    editLoanForm :FormGroup;
    loanUpdateID;
    loanData;
    constructor(
        private LPS: LoanProgressService,
        private spinner: NgxSpinnerService,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private Toastr: ToastrService,
        private router: Router
    ){
        this.showEdit = false;
        this.showTable = true;
        this.editLoanForm = fb.group({
            name: [{ value: "", disabled: false},[Validators.required]],
            pName: [{ value: "", disabled: false},[Validators.required]],
            date: [{ value: "", disabled: false},[Validators.required]],
            mobileNo: [{ value: "", disabled: false},[Validators.required]],
            aMobileNo: [{ value: "", disabled: false}],
            address: [{ value: "", disabled: false},[Validators.required]],
            amount: [{ value: "", disabled: true},[Validators.required]],
            interest: [{ value: "", disabled: true},[Validators.required]],
            interestPaid: [{ value: 0, disabled: true},[Validators.required]],
            notes: [{ value: "", disabled: false}]
        });
    }
    ngOnInit(){

        this.LPS.onLoanChanged.subscribe((result: any)=>{
            for(let i= 0; i < result.length; i++){
                let created = new Date(result[i].date);
                let currentDate = new Date();
                var months;
                months = (currentDate.getFullYear() - created.getFullYear()) * 12;
                months -= created.getMonth();
                months += currentDate.getMonth();
                months <= 0 ? 0 : months;
                var total = months * result[i].interest;
                var pendingAmount = total - result[i].interestPaid;
                this.datas[i] = [ result[i].loanID, result[i].name, result[i].date, result[i].amount, result[i].interest , pendingAmount, result[i]._id]
            }
            this.datas.sort();
            this.datas.reverse();
            this.progressTable = {
                dataRows : this.datas
            }
        });
    }

    backToGrid(){
        this.showEdit = false;
        this.showTable = true;
        this.clearForm();
    }

    clearForm(){
        this.editLoanForm.get('name').setValue("");
        this.editLoanForm.get('pName').setValue("");
        this.editLoanForm.get('date').setValue("");
        this.editLoanForm.get('mobileNo').setValue("");
        this.editLoanForm.get("aMobileNo").setValue("");
        this.editLoanForm.get("address").setValue("");
        this.editLoanForm.get("amount").setValue("");
        this.editLoanForm.get("interest").setValue("");
        this.editLoanForm.get("interestPaid").setValue(0);
        this.editLoanForm.get("notes").setValue("");

        this.editLoanForm.get('name').markAsUntouched();
        this.editLoanForm.get('pName').markAsUntouched();
        this.editLoanForm.get('date').markAsUntouched();
        this.editLoanForm.get('mobileNo').markAsUntouched();
        this.editLoanForm.get("aMobileNo").markAsUntouched();
        this.editLoanForm.get("address").markAsUntouched();
        this.editLoanForm.get("amount").markAsUntouched();
        this.editLoanForm.get("interest").markAsUntouched();
        this.editLoanForm.get("interestPaid").markAsUntouched();
        this.editLoanForm.get("notes").markAsUntouched();

        this.editLoanForm.markAsUntouched();
        this.editLoanForm.markAsPristine();
        sessionStorage.clear();
    }

    info(loanID){
        const modalRef = this.modalService.open(InfoModalComponent);
        modalRef.componentInstance.loanID = loanID;
    }

    closeLoan(data){

        const modalRef = this.modalService.open(CloseWarningComponent);
        modalRef.componentInstance.data = data;
    }

    editLoan(ID, PA){
        this.spinner.show();
        sessionStorage.setItem('pendingAmount', PA);
        this.showTable = false;
        this.showEdit = true;
        this.LPS.getLoanByID(ID).then((result)=>{
            this.loanData = result;
            this.loanUpdateID = result[0]._id;
            this.editLoanForm.get('name').setValue(result[0].name);
            this.editLoanForm.get('pName').setValue(result[0].pName);
            this.editLoanForm.get('date').setValue(new Date(result[0].date).toISOString().split('T')[0]);
            this.editLoanForm.get('mobileNo').setValue(result[0].mobileNo);
            this.editLoanForm.get("aMobileNo").setValue(result[0].aMobileNo);
            this.editLoanForm.get("address").setValue(result[0].address);
            this.editLoanForm.get("amount").setValue(result[0].amount);
            this.editLoanForm.get("interest").setValue(result[0].interest);
            this.editLoanForm.get("interestPaid").setValue(result[0].interestPaid);
            this.editLoanForm.get("notes").setValue(result[0].notes);
        });
        this.spinner.hide();
    }

    confirmEdit(){
        var submittedValues = this.editLoanForm.value;
        submittedValues._id = this.loanUpdateID;
        this.LPS.updateLoan(submittedValues).then((result: any)=>{
            if(result.statusCode == 200){
                this.Toastr.success( 'Updated Successfully', 'Success', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-center'
                  });
                  this.router.navigateByUrl('/progressReport', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['loanProgress']);
                  });
            }else{
                this.Toastr.error( 'Something went wrong', 'Failed', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-center'
                  });
            }
        });
    }

    deleteLoan(row){
        const modalRef = this.modalService.open(DeleteLoanComponent);
        modalRef.componentInstance.loanInfo = row;
    }
}
