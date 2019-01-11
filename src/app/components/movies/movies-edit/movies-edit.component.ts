import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movies, Availability } from '../../../models/movies';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-movies-edit',
  templateUrl: './movies-edit.component.html',
  styleUrls: ['./movies-edit.component.css'],
  providers: [MoviesService]
})
export class MoviesEditComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
              private _movieService: MoviesService,
              private _spinner: NgxSpinnerService) { }

  movie_id: string;
  isPMCAvailable: boolean = false;
  isSTPCAvailable: boolean = false;
  availability: Array<Availability> = [];
  PMC: Availability = new Availability('', '', '');
  STPC: Availability = new Availability('', '', '');;
  movie: Movies = new Movies('', '', '', '', '', '', '', '', '', '', '', '', this.availability);
  ratings: string[] = ["G", "PG", "R-13", "R-16", "R-18"];
  genre: string[] = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Historical", "Horror", "Mystery", "Romance", "Science Fiction", "Thriller"];

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.movie_id = params['id'];
    });

    this.getMovieDetails();
  }

  getMovieDetails(){
    this._spinner.show();
    this._movieService.getMovieDetail(this.movie_id).subscribe(
      data => {
        this.movie = data[0].data;
        this.getAvailability();
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      }
    );
    
  }

  updateMovie(){
    this._spinner.show();
    this.movie.availability = this.availability;
    if(this.isPMCAvailable){
      this.PMC.theater_name = "Power Plant Mall";
      this.availability.push(this.PMC);
    }
    if(this.isSTPCAvailable){
      this.STPC.theater_name = "Santolan Town Plaza";
      this.availability.push(this.STPC);
    }
    this.movie.availability = this.availability;
    this._movieService.updateMovie(this.movie).subscribe(
      data => {
        this.getMovieDetails();
        this._spinner.hide();
      },
      error => {
        this._spinner.hide();
      }
    );
    this.availability = new Array<Availability>();
  }

  getAvailability(){
    this.STPC = new Availability('', '', '');
    this.PMC = new Availability('', '', '');
    this.movie.availability.forEach(element => {
      if(element.theater_name == "Power Plant Mall"){
        this.isPMCAvailable = true;
        this.PMC.opening_date = this.FormatDate(new Date(Date.parse(element.opening_date.toString())));
        this.PMC.end_date = this.FormatDate(new Date(Date.parse(element.end_date.toString())));
      }
        
      if(element.theater_name == "Santolan Town Plaza"){
        this.isSTPCAvailable = true;
        this.STPC.opening_date = this.FormatDate(new Date(Date.parse(element.opening_date.toString())));
        this.STPC.end_date = this.FormatDate(new Date(Date.parse(element.end_date.toString())));
      }
    });
  }

  FormatDate(iDate: Date) {
    var inputDate = new Date(iDate);
    var month = inputDate.getMonth() + 1 < 10 ? '0' + (inputDate.getMonth() + 1): inputDate.getMonth() + 1;
    var day = inputDate.getDate() < 10 ? '0' + inputDate.getDate() : inputDate.getDate();
    var formattedDate = inputDate.getFullYear()+'-'+month+'-'+ day;
    return formattedDate;
 }
}
