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
      private spinner: NgxSpinnerService,
      private Toastr: ToastrService,
      private router: Router) { 
      }
  ngOnInit(){
    this.loanID = this.rowData[0];
    this.loanHolder = this.rowData[1];
  }

  confirm(){
    this.spinner.show();
    var id = this.rowData[6];
    this.LPS.updateLoanStatus(id, true).then((result: any) =>{
        if(result.statusCode == 200){
            this.router.navigateByUrl('/progressReport', { skipLocationChange: true }).then(() => {
                this.router.navigate(['closedLoans']);
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