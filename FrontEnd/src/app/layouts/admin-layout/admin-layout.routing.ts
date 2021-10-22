import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NewLoanComponent } from '../../pages/newLoan/newLoan.component';
import { LoanProgressComponent } from '../../pages/loanProgress/loanProgress.component';
import { ClosedLoansComponent } from 'app/pages/closedLoans/closedLoans.component';
import { ProgressReportComponent } from 'app/pages/progressReport/progressReport.component';
import { PayInterestComponent } from 'app/pages/payInterest/payInterest.component';
import { InterestHistoryComponent } from 'app/pages/InterestHistory/InterestHistory.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'newLoan',        component: NewLoanComponent },
    { path: 'loanProgress',   component: LoanProgressComponent },
    { path: 'closedLoans',    component: ClosedLoansComponent },
    { path: 'payInterest',    component: PayInterestComponent },
    { path: 'interestHistory',component: InterestHistoryComponent },
    { path: 'progressReport', component: ProgressReportComponent },
];
