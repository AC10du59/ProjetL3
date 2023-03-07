import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

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
  public color: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageEvent: PageEvent;
  public journeeUsers: Observable<IJournee[]>;
  public journee: Number;
  public scoreDomModif: Number;

  public constructor(private authService: AuthService, private firestore: AngularFirestore) { }

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

    const url = `http://51.178.38.151/api/JSON/saison.json`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let i;
        let trouve = 0;
        for(i = 0; i < data.length; i++) {
          if(data[i].score_domicile == null && data[i].score_exterieur == null && trouve==0) {
            this.journee = Number(data[i].journee);
            trouve = 1;
          }
        }
      });
  }

  public modify(data: IJournee): void {
    this.firestore.doc("journees/bA9Ka0MiheziTMthCYRc/J1/" + data.id).update({scoreDom: data.scoreDom, scoreExt: data.scoreExt});
  }

}
