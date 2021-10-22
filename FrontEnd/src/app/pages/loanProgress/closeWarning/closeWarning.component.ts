import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
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

  constructor(
      public activeModal: NgbActiveModal,
      private LPS: LoanProgressService,
      private Toastr: ToastrService,
      private router: Router) {}
      
  ngOnInit(){
    this.name = this.data[0].name;
    this.loanID = this.data[0].loanID;
    this.pendingAmount = sessionStorage.getItem('pendingAmount')
  }

  async confirm(){
    let result = await this.LPS.updateLoanStatus(this.loanID, false);
    let status = result.data.changeLoanStatus.isActive;
    if(!status){
        this.router.navigateByUrl('/progressReport', { skipLocationChange: true }).then(() => {
            this.router.navigate(['loanProgress']);
            this.Toastr.success( 'Loan has closed', '', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
              });
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