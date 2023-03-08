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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageEvent: PageEvent;
  public journeeUsers: Observable<IJournee[]>;
  public journee: Number;
  public scoreDomModif: Number;

  public constructor(private authService: AuthService, private firestore: AngularFirestore) { }

  public ngOnInit(): void {
    const url = `http://51.178.38.151/api/JSON/saison.json`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let i;
        for(i = 0; i < data.length; i++) {
          if(data[i].score_domicile != null && data[i].score_exterieur != null) {
            this.journee = Number(data[i].journee) + 1;
            let dataDoc = this.firestore.collection("journees").doc("bA9Ka0MiheziTMthCYRc");
            let journeeActuelle = "J" + this.journee;
            this.authService.user.subscribe((user)=> {
              this.journeeUsers = dataDoc.collection<IJournee>(journeeActuelle, (ref) => ref.where("email", "==", user.email)).snapshotChanges().pipe(
                map(e=> {
                  return e.map(r => {
                    return {id: r.payload.doc.id, ... r.payload.doc.data()};
                  })
                }))
            });
          }
        }
      });
      
    /*let data = this.firestore.collection("journees").doc("bA9Ka0MiheziTMthCYRc");
    let journeeActuelle = "J" + this.journee;
    console.log(journeeActuelle);

    this.authService.user.subscribe((user)=> {
      this.journeeUsers = data.collection<IJournee>(journeeActuelle, (ref) => ref.where("email", "==", user.email)).snapshotChanges().pipe(
        map(e=> {
          return e.map(r => {
            return {id: r.payload.doc.id, ... r.payload.doc.data()};
          })
        }))
    });*/
  }

  public modify(data: IJournee): void {
    console.log
    this.firestore.doc("journees/bA9Ka0MiheziTMthCYRc/J" + this.journee + "/" + data.id).update({scoreDom: data.scoreDom, scoreExt: data.scoreExt});
  }

}
