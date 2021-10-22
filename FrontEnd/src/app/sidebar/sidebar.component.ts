import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/newLoan',       title: 'New Loan',          icon:'nc-simple-add',       class: '' },
    { path: '/loanProgress',  title: 'Progress Loans',     icon:'nc-sound-wave',    class: '' },
    { path: '/closedLoans',   title: 'Closed Loans',      icon:'nc-satisfied',    class: '' },,
    { path: '/payInterest',   title: 'Pay Interest',      icon:'nc-diamond',    class: '' },
    { path: '/interestHistory',title: 'Interest History', icon:'nc-single-copy-04',    class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
