import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-football-matches',
  templateUrl: './football-matches.component.html',
  styleUrls: ['./football-matches.component.scss']
})
export class FootballMatchesComponent implements OnInit {
  years: number[] = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
  selectedYear: number;
  heroes:any;
  totalMatches: number;
  isSuccess: boolean;
  matches: any[];
  apiUrl = 'https://jsonmock.hackerrank.com/api/football_competitions?year=';

  ngOnInit(): void {
    this.totalMatches = 0;
    this.matches = [];
    this.isSuccess = false;
  }

  onSelectYear(year) {
    let response;
    console.log('data is selected', year);
    this.selectedYear = year;
    this.apiUrl = this.apiUrl + year;
    let observable = this.getObservable(this.apiUrl);
    observable.subscribe(data => { 
      console.log(data);
      this.isSuccess = true;
      response = data; 
      this.totalMatches = response.data.length;
      this.matches = response.data;
      console.log('matches', this.matches);
      
      
      });
  
  }
  getObservable(url){
    return Observable.create(observer => {           
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => observer.error(err));
    })
  }

}

export interface Match {
  name: string;
  winner: string;
}
