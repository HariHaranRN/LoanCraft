import { Component, OnInit, Input } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { InfoModal2Service } from './infoModal.service';


@Component({
  selector: 'infoModal',
  templateUrl: './infoModal.component.html'
})

export class InfoModal2Component implements OnInit{
@Input() loanID;
loanInfo;
  constructor(
      public activeModal: NgbActiveModal,
      private infoService: InfoModal2Service) { }
  ngOnInit(){
      this.infoService.getActiveLoans(this.loanID).then((result: any) =>{
          this.loanInfo = result;
      })
  }


}