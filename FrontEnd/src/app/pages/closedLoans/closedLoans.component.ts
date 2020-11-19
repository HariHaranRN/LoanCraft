import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClosedLoanService } from './closedLoans.service';
import { InfoModal2Component } from './infoModel/infoModal.component';
import { RestoreLoanComponent } from './restoreModal/restoreModal.component';

declare interface TableData {
    dataRows: string[][];
}

@Component({
    selector: 'closedLoans-cmp',
    moduleId: module.id,
    templateUrl: 'closedLoans.component.html'
})

export class ClosedLoansComponent implements OnInit{
    public datas = [];
    public closedTable: TableData
    constructor(
        private CLS: ClosedLoanService,
        private modalService: NgbModal
    ){

    }
    ngOnInit(){
        this.CLS.onLoanChanged.subscribe((result: any)=>{
            for(let i= 0; i < result.length; i++){
                let created = new Date(result[i].date);
                let currentDate = new Date();
                var months;
                months = (currentDate.getFullYear() - created.getFullYear()) * 12;
                months -= created.getMonth();
                months += currentDate.getMonth();
                months <= 0 ? 0 : months;
                var total = months * result[i].interest;
                var pendingAmount = total - result[i].interestPaid;
                this.datas[i] = [ result[i].loanID, result[i].name, result[i].createdDate, result[i].amount, result[i].interest , pendingAmount, result[i]._id]
            }
            this.datas.sort();
            this.datas.reverse();
            this.closedTable = {
                dataRows : this.datas
            }
        });
    }

    info(loanID){
        const modalRef = this.modalService.open(InfoModal2Component);
        modalRef.componentInstance.loanID = loanID;
    }

    restore(rowData){
        const modalRef = this.modalService.open(RestoreLoanComponent);
        modalRef.componentInstance.rowData = rowData;
    }
    
}
