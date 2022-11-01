import {Component, OnInit} from '@angular/core';
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
export class MatchComponent implements OnInit {
  constructor() {
  }
  // initalise le json ligue1_API
  ligue1_API: Imatch[] = matchJson;
  // initalise la couleur pour pouvoir modifié les couleurs par rapport aux equipes
  color: string;
  matchs: any;


  ngOnInit(): void {

    this.color = "";
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

