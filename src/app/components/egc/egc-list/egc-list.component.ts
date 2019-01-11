import { Component, OnInit, ChangeDetectorRef, NgModule } from '@angular/core';
import { EGCService } from 'app/components/services/egc.service';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { EGC } from '../../../models/egc';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import swal from 'sweetalert2';

@NgModule({
  imports: [NgxQRCodeModule]
})

@Component({
  providers: [EGCService],
  selector: 'app-egc-list',
  templateUrl: './egc-list.component.html',
  styleUrls: ['./egc-list.component.css'],
})
export class EgcListComponent implements OnInit {

  constructor(private _spinner: NgxSpinnerService,
              private egcService: EGCService,
              private _toastService: ToastrService,
              private _router: Router,
              private chRef: ChangeDetectorRef) {}

  egcs: EGC = new EGC(0, false, new Date(), new Date(), "", "", "");
  dataTable: any;
  swal: any;

  ngOnInit() {
    this.getEgcList();
  }

  getEgcList(){
    this._spinner.show();
    this.egcService.getAllEGC().subscribe(
      data => {
        this.egcs = data[0].data;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      }
    )
  }

  viewQRcode(egc: EGC){
    swal({
      title: egc.name.toString(),
      imageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + egc.tracking_id,
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Custom image',
      animation: false,
      html: '<span>Amount: ₱ ' + egc.amount + '</span> <br> <span>Issued Date: ' + new Date(Date.parse(egc.created_date.toString())).toLocaleDateString() + '</span>'
    })
  }

}
