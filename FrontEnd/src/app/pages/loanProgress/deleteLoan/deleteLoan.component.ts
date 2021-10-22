import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
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
      private LPS: LoanProgressService,
      private Toastr: ToastrService,
      private router: Router) { 
      }
  ngOnInit(){
    this.loanID = this.loanInfo[0];
    this.loanHolder = this.loanInfo[1];
  }

  async confirm(){
    let result = await this.LPS.deleteLoan(this.loanID);
    if(result.data){
        this.router.navigateByUrl('/progressReport', { skipLocationChange: true }).then(() => {
            this.router.navigate(['loanProgress']);
            this.Toastr.success( 'Deleted Succesfully', '', {
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