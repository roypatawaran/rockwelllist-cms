import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'app/components/services/item.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Items } from 'app/models/items';
import swal from 'sweetalert2';

@Component({
  providers: [ItemsService],
  selector: 'app-tenant-add',
  templateUrl: './tenant-add.component.html',
  styleUrls: ['./tenant-add.component.css']
})
export class TenantAddComponent implements OnInit {

  id: string;
  selection=new Map();
  items: Array<Items> =  [];
  tenant: Items = new Items('','', '', '', '', '', '', false, '', [], [], []);
  constructor(private _activatedRoute: ActivatedRoute,
              private _itemService: ItemsService,
              private _spinner: NgxSpinnerService) { }

  ngOnInit() {
  }


  addSimilarItems() {
    this._spinner.show();
    this.selection = new Map();
    this._itemService.getItems().subscribe(
      data => {
        this.items = data[0].data;
        this.items.forEach(element => {
          if(this.tenant.similar_items.length < 1)
              this.selection.set(element._id, element.name);
          else{
            for(var x = 0; x < this.tenant.similar_items.length; x++){
              if(this.tenant.similar_items[x].name != element.name)
                this.selection.set(element._id, element.name);
              else
                break;
            }
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
}
