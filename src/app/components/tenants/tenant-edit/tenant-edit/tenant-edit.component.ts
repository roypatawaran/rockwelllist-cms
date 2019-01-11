import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'app/components/services/item.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Items } from 'app/models/items';
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  providers: [ItemsService],
  selector: 'app-tenant-edit',
  templateUrl: './tenant-edit.component.html',
  styleUrls: ['./tenant-edit.component.css']
})
export class TenantEditComponent implements OnInit {
  id: string;
  selection=new Map();
  items: Array<Items> =  [];
  tenant: Items = new Items('','', '', '', '', '', '', false, '', [], [], []);
  constructor(private _activatedRoute: ActivatedRoute,
              private _itemService: ItemsService,
              private _spinner: NgxSpinnerService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getItemDetails();
  }

  getItemDetails(){
    this._spinner.show();
    this._itemService.getItemDetails(this.id).subscribe(
      data => {
        this.tenant = data[0].data;
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      }
    );
  }

  addSimilarItems() {
    this._spinner.show();
    this.selection = new Map();
    this._itemService.getItems().subscribe(
      data => {
        this.items = data[0].data;
        this.items.forEach(element => {
          for(var x = 0; x < this.tenant.similar_items.length; x++){
            if(this.tenant.similar_items[x].name != element.name)
              this.selection.set(element._id, element.name);
            else
              break;
          }
        });
        this.openSwalSimilarItems();
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      }
    );
  }

  async openSwalSimilarItems(){
    const {value: selected_tenant} = await swal({
      title: 'Select Tenant',
      input: 'select',
      inputOptions: this.selection,
      inputPlaceholder: 'Select a tenant',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value != "") {
            resolve()
          } else {
            resolve('You need to select a tenant')
          }
        })
      }
    })

    if(selected_tenant){
      this.tenant.similar_items.push({_id: selected_tenant, name: this.items.filter(x => x._id==selected_tenant)[0].name});
    }
  }

  removeSimilarItems(similar_item: any){
    var index = this.tenant.similar_items.indexOf(similar_item)
    this.tenant.similar_items.splice(index, 1);
  }

  updateItem(){
    this._itemService.updateItem(this.tenant).subscribe(
      data => {
        swal(
          'Item updated successfully',
          '',
          'success'
        );
        this._spinner.hide();
      },
      error => {
        this._spinner.hide()
      }
    )
  }

  discardChanges(){
    this.getItemDetails();
  }
}
