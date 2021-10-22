import { Component, OnInit, Input } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { LoanProgressService } from '../loanProgress.service';


@Component({
  selector: 'infoModal',
  templateUrl: './infoModal.component.html'
})

export class InfoModalComponent implements OnInit{
@Input() loanID;
loanInfo;
  constructor(
      public activeModal: NgbActiveModal,
      private LS: LoanProgressService) { }


  async ngOnInit(){
    let result = await this.LS.getLoanByID(this.loanID);
    this.loanInfo = result.data.getLoanByID;
      // this.infoService.getActiveLoans(this.loanID).then((result: any) =>{
      //     this.loanInfo = result;
      // })
  }


}