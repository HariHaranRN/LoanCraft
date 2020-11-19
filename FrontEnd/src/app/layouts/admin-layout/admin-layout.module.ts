import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { NewLoanComponent }         from '../../pages/newLoan/newLoan.component';
import { LoanProgressComponent }    from '../../pages/loanProgress/loanProgress.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClosedLoansComponent } from 'app/pages/closedLoans/closedLoans.component';
import { ProgressReportComponent } from 'app/pages/progressReport/progressReport.component';
import { NewLoanService } from 'app/pages/newLoan/new-loan.service';
import { LoanProgressService } from 'app/pages/loanProgress/loanProgress.service';
import { InfoModalComponent } from 'app/pages/loanProgress/infoModel/infoModal.component';
import { InfoModalService } from 'app/pages/loanProgress/infoModel/infoModal.service';
import { DeleteLoanComponent } from 'app/pages/loanProgress/deleteLoan/deleteLoan.component';
import { CloseWarningComponent } from 'app/pages/loanProgress/closeWarning/closeWarning.component';
import { ClosedLoanService } from 'app/pages/closedLoans/closedLoans.service';
import { RestoreLoanComponent } from 'app/pages/closedLoans/restoreModal/restoreModal.component';
import { PayInterestComponent } from 'app/pages/payInterest/payInterest.component';
import { PayInterestService } from 'app/pages/payInterest/payInterest.service';
import { InterestHistoryComponent } from 'app/pages/InterestHistory/InterestHistory.component';
import { LoanHistoryService } from 'app/pages/InterestHistory/interestHistory.service';
import { InfoModal2Service } from 'app/pages/closedLoans/infoModel/infoModal.service';
import { InfoModal2Component } from 'app/pages/closedLoans/infoModel/infoModal.component';
import { DashboardService } from 'app/pages/dashboard/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    NewLoanComponent,
    LoanProgressComponent,
    ClosedLoansComponent,
    ProgressReportComponent,
    InfoModalComponent,
    DeleteLoanComponent,
    CloseWarningComponent,
    RestoreLoanComponent,
    PayInterestComponent,
    InterestHistoryComponent,
    InfoModal2Component
  ],
  providers: [
    DashboardService,
    NewLoanService,
    LoanProgressService,
    InfoModalService,
    ClosedLoanService,
    PayInterestService,
    LoanHistoryService,
    InfoModal2Service
  ],
  entryComponents: [
    InfoModalComponent,
    DeleteLoanComponent,
    CloseWarningComponent,
    RestoreLoanComponent,
    InfoModal2Component
  ]
})

export class AdminLayoutModule {}
