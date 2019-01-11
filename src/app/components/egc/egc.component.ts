import { Component, OnInit, TemplateRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { EGCService } from '../services/egc.service';
import { ToastrService } from 'ngx-toastr';
import { TouchSequence } from 'selenium-webdriver';
import swal from 'sweetalert2';

@Component({
  providers: [EGCService],
  selector: 'app-egc',
  templateUrl: './egc.component.html',
  styleUrls: ['./egc.component.css']
})
export class EgcComponent implements OnInit {
  @HostListener('document:keypress', ['$event'])

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "modal-bg"
  };
  tracking_id: string;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  isScanned: boolean = false;
  query: string = "";
  amount: string = "";
  req: any;
  transactions: any;
  swal: any;
  
  constructor(private modalService: BsModalService,
              private _spinner: NgxSpinnerService,
              private egcService: EGCService,
              private _toastService: ToastrService,
              private _router: Router) {}

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(){
    this._spinner.show();
    this.egcService.getTransactions().subscribe(
      data => {
        this.transactions = data[0].data;
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      }
    )
  }

  openSwal(){
    swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Enter Amount',
        text: 'Select the amount to be loaded onto the EGC.',
        inputValidator: (value) => {
          return !value && 'Please enter an amount.'
        }
      },
      {
        title: 'Scan QR code',
        text: 'Scan the QR code to be loaded'
      }
    ]).then((result) => {
      if (result.value) {
        this.tracking_id = result.value[1];
        this.amount = result.value[0];
        swal({
          title: 'Confirm details',
          text: 'Make sure that the amount below is correct.',
          html:
            '<strong>' + result.value[0] + '</strong> PHP will be loaded to this EGC',
          confirmButtonText: 'Confirm',
          showCancelButton: true,
        }).then((submit) => {
          if(this.amount && this.transactions){
            this.loadegc();
          }
        })
      }
    })
  }

  egcList(){
    this._router.navigate(['/egc-list']);
  }

  handleInput(event: KeyboardEvent) { 
    this._spinner.show();

    setTimeout(() => {
      this.tracking_id = this.query;
      this.query = "Scan success!";
      this.isScanned = true;
      this._spinner.hide();
  }, 2000);
    this._toastService.success('Scan Successful!');
    this.modalRef2.hide();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {class: 'second'});
  }

  loadegc() {
    this.req = {
      amount: this.amount,
      tracking_id: this.tracking_id
    };
    this._spinner.show();
      this.egcService.load_egc(this.req).subscribe(
        data => {
          this.modalRef.hide();
          this.query = "",
          this.isScanned = false,
          this.amount = "";
          this.tracking_id = "";
          this._spinner.hide();
        },
        error => {
          this._spinner.hide();
        }
      );
      this._spinner.hide();
  }

}
