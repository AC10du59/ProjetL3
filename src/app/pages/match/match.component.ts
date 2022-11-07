import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// @ts-ignore
import matchJson from '../../../assets/data/ligue1_API.json';
// @ts-ignore
import colorTeam from '../../../assets/data/teamColor.json';


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
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ["equipe1", "score1", "score2", "equipe2"];
  public ligue1_API: Imatch[] = matchJson;
  public color: string;
  public dataSource = new MatTableDataSource<Imatch>(this.ligue1_API);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageEvent: PageEvent;

  public constructor() {
  }
  
  public ngAfterViewInit() {
    this.paginator.pageIndex = Number(this.journeeActuelle()) - 1;
    this.dataSource.paginator = this.paginator;
  }

  public ngOnInit(): void {
    this.color = "";
    this.paginator.pageIndex = Number(this.journeeActuelle()) - 1;
  }

  public colorHomeTeamOnMouse(teamSelect: string) {
    for (let match of this.ligue1_API) {
      // Si le json est égale a la team afficher dans la classe team
      if (match.homeTeam === teamSelect) {
        this.color = '#' + match.colorHomeTeam;
      }
    }
  }

  public colorAwayTeamOnMouse(teamSelect: string) {
    for (let match of this.ligue1_API) {
      // Si le json est égale a la team afficher dans la classe team
      if (match.awayTeam === teamSelect) {
        this.color = '#' + match.colorAwayTeam;
      }
    }
  }

  public journeeActuelle() {
    let i;
    for(i=0; i < this.ligue1_API.length; i++) {
      if(this.ligue1_API[i].scoreHomeTeam == "" && this.ligue1_API[i].scoreAwayTeam == "") return this.ligue1_API[i].day;
    }
    return 1;
  }


  /*

  public findColorTeam() {
    // recupere le contenu de la classe team
    const teamHTML = document.querySelector<HTMLElement>('.selectTeam')!;
    // colorTeam est le json contenant les noms d'equipe et les couleurs
    // on parcourt le json
    for (let tcolor of colorTeam) {
      // Si le json est égale a la team afficher dans la classe team
      if (tcolor.team === teamHTML.innerText) {
        // on change la couleur
        teamHTML.style.color = '#' + tcolor.hex;
      }
    }
    teamHTML.classList.remove('selectTeam');
    teamHTML.classList.add('resetColor');

  }


  colorResetTeam(teamName: Imatch) {
    const teamHTML = document.querySelector<HTMLElement>('.resetColor')!;
    teamHTML.style.color = '#3646a8';
    teamHTML.classList.remove('resetColor');
  }

  public colorTeamHome(teamName: Imatch) {
    this.selectedTeam = teamName.homeTeam;
    this.findColorTeam();

  }

  public colorTeamAway(teamName: Imatch) {
    this.selectedTeam = teamName.awayTeam;
    this.findColorTeam();
  }


*/


}