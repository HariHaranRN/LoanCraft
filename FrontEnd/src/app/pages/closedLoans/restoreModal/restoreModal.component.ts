import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { LoanProgressService } from 'app/pages/loanProgress/loanProgress.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'restoreModal',
  templateUrl: './restoreModal.component.html'
})

export class RestoreLoanComponent implements OnInit{
@Input() rowData;
loanID;
loanHolder;
  constructor(
      public activeModal: NgbActiveModal,
      private LPS: LoanProgressService,
      private Toastr: ToastrService,
      private router: Router) { 
      }
  ngOnInit(){
    this.loanID = this.rowData[0];
    this.loanHolder = this.rowData[1];
  }

  async confirm(){
    let result = await this.LPS.updateLoanStatus(this.loanID, true);
    let status = result.data.changeLoanStatus.isActive;
    if(status){
        this.router.navigateByUrl('/progressReport', { skipLocationChange: true }).then(() => {
            this.router.navigate(['closedLoans']);
        }); 
    }else{
        this.Toastr.error( 'Something went wrong', '', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
    }
    this.activeModal.close();
  }


}