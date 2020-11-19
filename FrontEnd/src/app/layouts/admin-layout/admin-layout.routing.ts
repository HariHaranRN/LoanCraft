import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NewLoanComponent } from '../../pages/newLoan/newLoan.component';
import { LoanProgressComponent } from '../../pages/loanProgress/loanProgress.component';
import { ClosedLoansComponent } from 'app/pages/closedLoans/closedLoans.component';
import { ProgressReportComponent } from 'app/pages/progressReport/progressReport.component';
import { LoanProgressService } from 'app/pages/loanProgress/loanProgress.service';
import { ClosedLoanService } from 'app/pages/closedLoans/closedLoans.service';
import { PayInterestComponent } from 'app/pages/payInterest/payInterest.component';
import { InterestHistoryComponent } from 'app/pages/InterestHistory/InterestHistory.component';
import { DashboardService } from 'app/pages/dashboard/dashboard.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, resolve: { data: DashboardService } },
    { path: 'newLoan',        component: NewLoanComponent },
    { path: 'loanProgress',   component: LoanProgressComponent, resolve: { data: LoanProgressService} },
    { path: 'closedLoans',    component: ClosedLoansComponent, resolve: { data: ClosedLoanService } },
    { path: 'payInterest',    component: PayInterestComponent },
    { path: 'interestHistory',    component: InterestHistoryComponent },
    { path: 'progressReport', component: ProgressReportComponent },
];
