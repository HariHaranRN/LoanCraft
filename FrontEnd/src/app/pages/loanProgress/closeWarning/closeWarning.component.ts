import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoanProgressService } from '../loanProgress.service';


@Component({
  selector: 'closeWarning',
  templateUrl: './closeWarning.component.html'
})

export class CloseWarningComponent implements OnInit{
@Input() data;
name;
loanID;
pendingAmount;
loanUpdateID;

  constructor(
      public activeModal: NgbActiveModal,
      private LS: LoanProgressService,
      private spinner: NgxSpinnerService,
      private Toastr: ToastrService,
      private router: Router) {}
      
  ngOnInit(){
    this.name = this.data[0].name;
    this.loanID = this.data[0].loanID;
    this.loanUpdateID = this.data[0]._id;
    this.pendingAmount = sessionStorage.getItem('pendingAmount')
  }

  confirm(){
    this.spinner.show();
    this.LS.updateLoanStatus(this.loanUpdateID, false).then((result: any) =>{
        if(result.statusCode == 200){
            this.router.navigateByUrl('/progressReport', { skipLocationChange: true }).then(() => {
                this.router.navigate(['loanProgress']);
                this.Toastr.success( 'Loan Closed', 'Success', {
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