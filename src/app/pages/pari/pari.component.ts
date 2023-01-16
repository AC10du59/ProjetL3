import { Component, OnInit } from '@angular/core';
// @ts-ignore
import matchJson from '../../../assets/data/ligue1_API.json';

interface Imatch {
  day: string;
  idMatch: string;
  homeTeam: string;
  awayTeam: string;
  scoreHomeTeam: string;
  scoreAwayTeam: string;
  colorHomeTeam: string;
  colorAwayTeam: string;
}

@Component({
  selector: 'app-pari',
  templateUrl: './pari.component.html',
  styleUrls: ['./pari.component.css']
})
export class PariComponent implements OnInit {

  constructor() { }

  public ligue1_API: Imatch[] = matchJson;

  ngOnInit(): void {
  }

  public journeeActuelle() {
    let i;
    for(i=0; i < this.ligue1_API.length; i++) {
      if(this.ligue1_API[i].scoreHomeTeam == "" && this.ligue1_API[i].scoreAwayTeam == "") return this.ligue1_API[i].day;
    }
    return 1;
  }

}
