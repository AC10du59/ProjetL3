import {Component, OnInit} from '@angular/core';
import matchJson from '../../../assets/data/match.json';


interface Imatch {
  idMatch: string;
  equipeDomicile: string;
  equipeExterieur: string;
  scoreDomicile: string;
  scoreExterieur: string;
  journee: string;
}


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  constructor() {
  }

  matchs: Imatch[] = matchJson;




  ngOnInit(): void {
  }


}

