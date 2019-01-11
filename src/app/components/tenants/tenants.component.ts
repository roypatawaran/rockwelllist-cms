import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ItemsService } from '../services/item.service';
import { ToastrService } from 'ngx-toastr';
import { Items } from '../../models/items';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css'],
  providers: [ItemsService]
})
export class TenantsComponent implements OnInit {
  items: Items = new Items('','', '', '', '', '', '', false, '', [], [], []);
  selectedItem: Items = new Items('','', '', '', '', '', '', false, '', [], [], []);
  dataTable: any;
  testing: any;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    size: 'lg',
    ignoreBackdropClick: false
  };
  modalRef: BsModalRef;

  constructor(private _spinner: NgxSpinnerService,
    private _itemsService: ItemsService,
    private _router: Router,
    private _toastr: ToastrService,
    private chRef: ChangeDetectorRef,
    private modalService: BsModalService) {}


  ngOnInit() {
    this.testing = ['test1', 'test2', 'test3'];
    this.getItems();
  }

  getItems() {
    this._spinner.show();
    this._itemsService.getItems().subscribe(
      data => {
        this.items = data[0].data;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      }
    );
  }

  openModal(template: TemplateRef<any>, item: Items) {
    this.selectedItem = item;
    this.modalRef = this.modalService.show(template, this.config);
  }

  editTenant(tenant: Items){
    this._router.navigate(['/tenant/edit', tenant._id]);
  }
  addTenant(){
    this._router.navigate(['/tenant/add']);
  }
}
