import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as env from "../../environments/environment";
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit, OnDestroy {
  searchTerm: any;
  movieList: any = [];
  isLoading = false;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  async refreshMoviesDatabase() {
    this.isLoading = true;
    this.searchTerm = '';
    this.movieList = await lastValueFrom(this.http.get(`${env.environment.baseUrl}movies`));
    this.isLoading = false;
  }

  async searchMovies() {
    if (this.searchTerm?.trim()) {
      this.isLoading = true;
      this.movieList = await lastValueFrom(this.http.get(`${env.environment.baseUrl}movies/${this.searchTerm.trim()}`));
      this.isLoading = false;
    }
  }


}
