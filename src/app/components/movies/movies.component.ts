import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { ToastrService } from 'ngx-toastr';
import { Movies, Availability } from '../../models/movies';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MoviesService]
})
export class MoviesComponent implements OnInit {
  availability: Array<Availability>;
  movies: Movies = new Movies('', '', '', '', '', '', '', '', '', '', '', '', this.availability);
  dataTable: any;

  constructor(private _spinner: NgxSpinnerService,
    private _moviesService: MoviesService,
    private _router: Router,
    private _toastr: ToastrService,
    private chRef: ChangeDetectorRef,
    private modalService: BsModalService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this._spinner.show();
    this._moviesService.getMovies().subscribe(
      data => {
        this.movies = data[0].data;
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

  getAvailability(availability: any){
    var avail: string = "";
    availability.forEach(element => {
      if(avail ==""){
        avail += element.theater_name + ',';
      }
      else{
        avail += ' ' + element.theater_name
      }
    });
    return avail;
  }
  
  editMovies(movie: Movies){
    this._router.navigate(['/movie/edit', movie._id]);
  }
}
