import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ItemsService } from '../services/item.service';
import { ToastrService } from 'ngx-toastr';
import { Items } from '../../models/items';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css'],
  providers: [ItemsService]
})
export class TenantsComponent implements OnInit {
  items: Items = new Items('', '', '', '', '', '', false, '', [], [], []);
  constructor(private _spinner: NgxSpinnerService,
    private _itemsService: ItemsService,
    private _router: Router,
    private _toastr: ToastrService) {}


  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this._spinner.show();
    this._itemsService.getItems().subscribe(
      data => {
        this.items = data[0].data;
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      }
    );
  }

}
