import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  egcSold(){
    this._router.navigate(['/finance/egc-sold']);
  }
  egcLoad(){
    this._router.navigate(['/finance/egc-load']);
  }
  tenantClaim(){
    this._router.navigate(['/finance/tenant-claim']);
  }
}
