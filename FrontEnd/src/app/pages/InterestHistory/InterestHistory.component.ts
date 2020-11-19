import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoanHistoryService } from './interestHistory.service';

@Component({
    selector: 'interestHistory-cmp',
    templateUrl: 'interestHistory.component.html'
})

export class InterestHistoryComponent implements OnInit{
    searchID;
    historyTable;
    loanID;

    constructor(
        private LHS: LoanHistoryService,
        private Toastr: ToastrService
    ){

    }

    ngOnInit(){
    }

    searchByID(){
        this.LHS.getLoanHistorys(this.searchID).then((result: any)=>{
            if(result.length > 0){
            this.loanID = this.searchID;
            this.historyTable = result;
            }else{
                this.historyTable = [];
                this.Toastr.warning( 'No list found', '', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-center'
                  });
            }
        })
    }
}