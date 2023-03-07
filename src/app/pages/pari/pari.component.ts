import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
// @ts-ignore
import matchJson from '../../../assets/data/ligue1_API.json';
// @ts-ignore
import colorTeam from '../../../assets/data/teamColor.json';

interface IJournee {
  id?: string;
  day: string;
  idMatch: string;
  homeTeam: string;
  awayTeam: string;
  scoreHomeTeam?: string;
  scoreAwayTeam?: string;
  colorHomeTeam: string;
  colorAwayTeam: string;
  scoreHomeUser?: number;
  scoreAwayUser?: number;
  scoreDom?: number;
  scoreExt?: number;
}

@Component({
  selector: 'app-pari',
  templateUrl: './pari.component.html',
  styleUrls: ['./pari.component.css']
})
export class PariComponent implements OnInit {
  
  public displayedColumns: string[] = ["equipe1", "score1", "score2", "equipe2", "modif"];
  public ligue1_API: IJournee[] = matchJson;
  public color: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageEvent: PageEvent;
  public journeeUsers: Observable<IJournee[]>;

  public scoreDomModif: Number;

  public constructor(private authService: AuthService, private firestore: AngularFirestore) { }

  public ngAfterViewInit() {
    this.paginator.pageIndex = Number(this.journeeSuivante()) - 1;
  }

  public ngOnInit(): void {
    this.color = "";
    let data = this.firestore.collection("journees").doc("bA9Ka0MiheziTMthCYRc");

    this.authService.user.subscribe((user)=> {
      this.journeeUsers = data.collection<IJournee>('J1', (ref) => ref.where("email", "==", user.email)).snapshotChanges().pipe(
        map(e=> {
          return e.map(r => {
            return {id: r.payload.doc.id, ... r.payload.doc.data()};
          })
        }))
      });
    }

  public colorHomeTeamOnMouse(teamSelect: string) {
    for (let match of this.ligue1_API) {
      if (match.homeTeam === teamSelect) {
        this.color = '#' + match.colorHomeTeam;
      }
    }
  }

  public colorAwayTeamOnMouse(teamSelect: string) {
    for (let match of this.ligue1_API) {
      if (match.awayTeam === teamSelect) {
        this.color = '#' + match.colorAwayTeam;
      }
    }
  }

  public journeeSuivante() {
    let i;
    for(i=0; i < this.ligue1_API.length; i++) {
      if(this.ligue1_API[i].scoreHomeTeam == "" && this.ligue1_API[i].scoreAwayTeam == "") return Number(this.ligue1_API[i].day) + 1;
    }
    return 0;
  }

  public modify(data: IJournee): void {
    this.firestore.doc("journees/bA9Ka0MiheziTMthCYRc/J1/" + data.id).update({scoreDom: data.scoreDom, scoreExt: data.scoreExt});
  }

}
