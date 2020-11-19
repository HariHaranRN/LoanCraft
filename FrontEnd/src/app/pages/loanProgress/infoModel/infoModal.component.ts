import { Component, OnInit, Input } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { InfoModalService } from './infoModal.service';


@Component({
  selector: 'infoModal',
  templateUrl: './infoModal.component.html'
})

export class InfoModalComponent implements OnInit{
@Input() loanID;
loanInfo;
  constructor(
      public activeModal: NgbActiveModal,
      private infoService: InfoModalService) { }
  ngOnInit(){
      this.infoService.getActiveLoans(this.loanID).then((result: any) =>{
          this.loanInfo = result;
      })
  }


}