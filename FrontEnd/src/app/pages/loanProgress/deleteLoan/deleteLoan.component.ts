import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoanProgressService } from '../loanProgress.service';


@Component({
  selector: 'deleteLoan',
  templateUrl: './deleteLoan.component.html'
})

export class DeleteLoanComponent implements OnInit{
@Input() loanInfo;
loanID;
loanHolder;
  constructor(
      public activeModal: NgbActiveModal,
      private LS: LoanProgressService,
      private spinner: NgxSpinnerService,
      private Toastr: ToastrService,
      private router: Router) { 
      }
  ngOnInit(){
    this.loanID = this.loanInfo[0];
    this.loanHolder = this.loanInfo[1];
  }

  confirm(){
    this.spinner.show();
    this.LS.deleteLoan(this.loanInfo[6]).then((result: any) =>{
        if(result.statusCode == 200){
            this.router.navigateByUrl('/progressReport', { skipLocationChange: true }).then(() => {
                this.router.navigate(['loanProgress']);
                this.Toastr.success( 'Deleted Succesfully', 'Success', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-center'
                  });
            }); 
        }else{
            this.Toastr.error( 'Something went wrong', 'Failed', {
                timeOut: 3000,
                positionClass: 'toast-bottom-center'
              });
        }
    });
    this.spinner.hide();
    this.activeModal.close();
  }


}