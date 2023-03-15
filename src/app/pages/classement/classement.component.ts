import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IUser } from 'src/app/core/models/user.model';

interface IJournee {
  id?: string;
  email: string;
  equipeDom: string;
  equipeExt: string;
  scoreDom: number;
  scoreExt: number;
  clubDesktop_domicile: string;
  clubDesktop_exterieur: string;
  score_domicile: number;
  score_exterieur: number;
}

interface User {
  id?: string;
  email: string;
  points: number;
}

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})

export class ClassementComponent implements OnInit {

  public users: Observable<IUser[]>;
  public journees: Observable<IJournee[]>;
  public res: IJournee[];

  public resTest: Array<IJournee[]> = [];

  public compteurJournee = 1;

  public headElements = ['Rang', 'Pseudo', 'Points'];
  public displayedColumns: string[] = ["rang", "pseudo", "points"];

  public constructor(private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    const lastRunDate = localStorage.getItem('lastRunDate');
    const today = new Date().toDateString();

    if (lastRunDate !== today) {
      console.log("1 fois");
      this.users = this.firestore.collection<IUser>('users').snapshotChanges().pipe(
        take(1),
        map(e=> {
          return this.trierMAJ(e.map(r => {
            return {id: r.payload.doc.id, ... r.payload.doc.data()};
          }))
        })
      );
      localStorage.setItem('lastRunDate', today);
    } else {
      console.log("Plusieurs fois");
      this.users = this.firestore.collection<IUser>('users').snapshotChanges().pipe(
        take(1),
        map(e=> {
          return this.trier(e.map(r => {
            return {id: r.payload.doc.id, ... r.payload.doc.data()};
          }))
        })
      );
    }
  }
  
  getMatchs(): void {
    for(let i = 1; i < 39; i++) {
      const url = `http://51.178.38.151/api/JSON/journee${i}.json`;
      this.compteurJournee++;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.resTest[i-1] = data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  public trier(tableau: IUser[]): IUser[] {
    tableau.sort((a, b) => {
      return b.points - a.points;
    });
    let rangCompteur = 1;
    for (let i = 0; i < tableau.length; i++) {
      if (i != 0) {
        if (tableau[i].points != tableau[i - 1].points) {
          tableau[i].rang = '' + rangCompteur;
        } else {
          tableau[i].rang = '-';
        }
      } else {
        tableau[i].rang = '' + rangCompteur;
      }
      rangCompteur += 1;
    }
    return tableau;
  }

  public trierMAJ(tableau: IUser[]): IUser[] {
    let data = this.firestore.collection("journees").doc("bA9Ka0MiheziTMthCYRc");
    this.getMatchs();

    let utilisateurs: Array<User> = [];
    for(let i = 0; i < tableau.length; i++) {
      utilisateurs.push({id: tableau[i].id, email: tableau[i].email, points: 0});
    }

    for(let jou = 27; jou < 39; jou++) {      
      let journeeActuelle = "J" + jou;
      this.journees = data.collection<IJournee>(journeeActuelle).snapshotChanges().pipe(
      map(e=> {
        return (e.map(r => {
          return {id: r.payload.doc.id, ... r.payload.doc.data()};
        }))})
      );
      
      this.journees.pipe().subscribe(data => {
        for(let t = 0; t < data.length; t++) {
          for(let cpt = 0; cpt < tableau.length; cpt++) {
            if(data[t].email == tableau[cpt].email) {
              for(let r = 0; r < this.resTest[jou-1].length; r++) {
                if(data[t].equipeDom == this.resTest[jou-1][r].clubDesktop_domicile && data[t].equipeExt == this.resTest[jou-1][r].clubDesktop_exterieur) {
                  let ok = 0;
                  //pas de pari
                  if(this.resTest[jou-1][r].score_domicile == null || this.resTest[jou-1][r].score_exterieur == null || data[t].scoreDom == null || data[t].scoreExt == null){
                    utilisateurs[cpt].points += 0;
                    ok = 1;
                  }
                  // score exact
                  else if((data[t].scoreDom == this.resTest[jou-1][r].score_domicile) && (data[t].scoreExt == this.resTest[jou-1][r].score_exterieur) && ok==0){
                    utilisateurs[cpt].points += 10;
                    ok = 1;
                  }
                  // match nul
                  else if((data[t].scoreDom == data[t].scoreExt) && (this.resTest[jou-1][r].score_domicile == this.resTest[jou-1][r].score_exterieur) && ok==0){
                    utilisateurs[cpt].points += 5;
                    ok = 1;
                  }
                  // bon vainqueur (dom)
                  else if((data[t].scoreDom > data[t].scoreExt) && (this.resTest[jou-1][r].score_domicile > this.resTest[jou-1][r].score_exterieur) && ok==0){
                    utilisateurs[cpt].points += 5;
                    ok = 1;
                  }
                  // bon vainqueur (ext)
                  else if((data[t].scoreDom < data[t].scoreExt) && (this.resTest[jou-1][r].score_domicile < this.resTest[jou-1][r].score_exterieur) && ok==0){
                    utilisateurs[cpt].points += 5;
                    ok = 1;
                  }
                }
              }
            } 
          }
        }
        if(jou == 38) {
          for(const element of utilisateurs) {
            console.log(element);
            this.firestore.doc("users/" + element.id).update({points: element.points});
          }
        }
      });
    }

    tableau.sort((a, b) => {
      return b.points - a.points;
    });
    let rangCompteur = 1;
    for(let i = 0; i < tableau.length; i++) {
      if(i != 0) {
        if(tableau[i].points != tableau[i-1].points) {
          tableau[i].rang = "" + rangCompteur;
        }
        else {
          tableau[i].rang = "-";
        }
      } else {
        tableau[i].rang = "" + rangCompteur;
      }
      rangCompteur += 1;
    }
    return tableau;
  }

}