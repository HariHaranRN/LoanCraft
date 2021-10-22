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
    templateUrl: './loanProgress.component.html'
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
            amount: [{ value: "", disabled: false},[Validators.required]],
            interest: [{ value: "", disabled: false},[Validators.required]],
            interestPaid: [{ value: 0, disabled: true},[Validators.required]],
            notes: [{ value: "", disabled: false}]
        });
    }
    async ngOnInit(){
        this.progressTable = {
            dataRows : []
        }
        let result = await this.LPS.getLoans(true);
        let finalData = result.data.getLoans;
        if(finalData.length > 0){
            for(let i= 0; i < finalData.length; i++){
                let created = new Date(finalData[i].date);
                let currentDate = new Date();
                var months;
                months = (currentDate.getFullYear() - created.getFullYear()) * 12;
                months -= created.getMonth();
                months += currentDate.getMonth();
                months <= 0 ? 0 : months;
                var total = months * finalData[i].interest;
                var pendingAmount = total - finalData[i].interestPaid;
                this.datas[i] = [ finalData[i].loanID, finalData[i].name, finalData[i].date, finalData[i].amount, finalData[i].interest , pendingAmount]
            }
            this.datas.sort();
            this.datas.reverse();
            this.progressTable = {
                dataRows : this.datas
            }
        }
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

    async editLoan(ID: any, PA: any){
        this.spinner.show();
        sessionStorage.setItem('pendingAmount', PA);
        this.showTable = false;
        this.showEdit = true;
        let result = await this.LPS.getLoanByID(ID);
        let data = result.data.getLoanByID;
        this.loanData = data;
        if(data.length > 0){
            this.loanUpdateID = data[0].loanID;
            this.editLoanForm.get('name').setValue(data[0].name);
            this.editLoanForm.get('pName').setValue(data[0].parentName);
            this.editLoanForm.get('date').setValue(data[0].date);
            this.editLoanForm.get('mobileNo').setValue(data[0].mobile);
            this.editLoanForm.get("aMobileNo").setValue(data[0].aMobile);
            this.editLoanForm.get("address").setValue(data[0].address);
            this.editLoanForm.get("amount").setValue(data[0].amount);
            this.editLoanForm.get("interest").setValue(data[0].interest);
            this.editLoanForm.get("notes").setValue(data[0].notes);
        }else {
            this.Toastr.error('Something went wrong', '', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
            });
            this.router.navigate(['loanProgress']);
        }
        this.spinner.hide();
    }

    async confirmEdit(){
        var submittedValues = this.editLoanForm.value;
        submittedValues.loanID = this.loanUpdateID;
        let result = await this.LPS.updateLoan(submittedValues);
        if(result.data){
            this.Toastr.success( 'Updated Successfully', '', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
                });
                this.router.navigateByUrl('/progressReport', { skipLocationChange: true }).then(() => {
                this.router.navigate(['loanProgress']);
                });
        }else{
            this.Toastr.error( 'Something went wrong', '', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
                });
        }
    }

    deleteLoan(row){
        const modalRef = this.modalService.open(DeleteLoanComponent);
        modalRef.componentInstance.loanInfo = row;
    }
}
