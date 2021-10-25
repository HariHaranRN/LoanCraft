import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoanHistoryService } from './interestHistory.service';

@Component({
    selector: 'interestHistory-cmp',
    templateUrl: './InterestHistory.component.html'
})

export class InterestHistoryComponent implements OnInit{
    searchID;
    historyTable;

    constructor(
        private LHS: LoanHistoryService,
        private Toastr: ToastrService
    ){

    }

    ngOnInit(){
    }

    async searchByID(){
        this.historyTable = []
        let result = await this.LHS.getLoanHistorys(this.searchID);
        let finalResult = result.data.getLoanHistoryByID;
            if(finalResult.length > 0){
                finalResult.sort(function (a, b) {
                    return a.date - b.date;
                  });
                this.historyTable = finalResult;
            }else{
                this.historyTable = [];
                this.Toastr.warning( 'No History Found ', '', {
                    timeOut: 3000,
                    positionClass: 'toast-top-center'
                  });
            }
    }
}