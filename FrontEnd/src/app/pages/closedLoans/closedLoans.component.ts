import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from '../loanProgress/infoModel/infoModal.component';
import { LoanProgressService } from '../loanProgress/loanProgress.service';
import { RestoreLoanComponent } from './restoreModal/restoreModal.component';

declare interface TableData {
    dataRows: string[][];
}

@Component({
    selector: 'closedLoans-cmp',
    moduleId: module.id,
    templateUrl: './closedLoans.component.html'
})

export class ClosedLoansComponent implements OnInit{
    public datas = [];
    public closedTable: TableData
    constructor(
        private LPS: LoanProgressService,
        private modalService: NgbModal
    ){

    }
    async ngOnInit(){
        this.closedTable = {
            dataRows : []
        }
        let result = await this.LPS.getLoans(false);
        let finalData = result.data.getLoans;
        if(finalData.length > 0) {
            for(let i= 0; i < finalData.length; i++){
                let created = new Date(finalData[i].date);
                let currentDate = new Date();
                var months;
                months = (currentDate.getFullYear() - created.getFullYear()) * 12;
                months -= created.getMonth();
                months += currentDate.getMonth();
                months <= 0 ? 0 : months;
                var total = months * finalData[i].interest;
                var pendingAmount = total - finalData[i].interestPaid;
                this.datas[i] = [ finalData[i].loanID, finalData[i].name, finalData[i].date, finalData[i].amount, finalData[i].interest , pendingAmount]
            }
            this.datas.sort();
            this.datas.reverse();
            this.closedTable = {
                dataRows : this.datas
            }
        }
    }

    info(loanID){
        const modalRef = this.modalService.open(InfoModalComponent);
        modalRef.componentInstance.loanID = loanID;
    }

    restore(rowData){
        const modalRef = this.modalService.open(RestoreLoanComponent);
        modalRef.componentInstance.rowData = rowData;
    }
    
}
