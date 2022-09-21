import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ITask } from '../../core/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { IMatch } from 'src/app/core/models/match.model';
import { IScore } from 'src/app/core/models/score.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {

  public matchsData: IMatch[];
  public scoresData: IScore[];
  public dataSource: Array<IMatch> = [];

  public matchs: Observable<IMatch[]>;
  public scores: Observable<IScore[]>;

  public headElements = ['Equipe 1', 'Score 1', 'Score 2', 'Equipe 2'];
  public displayedColumns: string[] = ["equipe1", "score1", "score2", "equipe2"];

  public taskSelected: ITask;

  public constructor(private firestore: AngularFirestore, private authService: AuthService, public dialog: MatDialog) {
  }

 /* public ngOnInit(): void {
    this.matchs = this.firestore.collection<IMatch>('matchs').snapshotChanges().pipe(
      map(e=> {
        return e.map(r => {
          return {id: r.payload.doc.id, ... r.payload.doc.data()};
        })
      })
    );
    this.authService.user.subscribe((user)=> {
      this.scores = this.firestore.collection<IScore>('scores', (ref) => ref.where("email", "==", user.email)).snapshotChanges().pipe(
        map(e=> {
          return e.map(r => {
            return {id: r.payload.doc.id, ... r.payload.doc.data()};
          })
        })
      );
    });
  }*/

  public ngOnInit(): void {
    this.matchs = this.firestore.collection<IMatch>('matchs').valueChanges();
    this.authService.user.subscribe((user)=> {
      this.scores = this.firestore.collection<IScore>('scores', (ref) => ref.where("email", "==", user.email)).valueChanges();
      this.scores.subscribe((valueSco) => { 
        this.matchs.subscribe((valueMat) => {
          for(let i = 0; i < valueMat.length; i++) {
            for(let j = 0; j < valueSco.length; j++) {
              if(valueMat[i].idMatch == valueSco[j].idMatch) {
                valueMat[i].score1 = valueSco[j].score1;
                valueMat[i].score2 = valueSco[j].score2;
              }
            }
          }
        });
      });
    });

    this.matchs.subscribe((valueMat) => { console.log(valueMat) });
  }

  /*public getData(): void {
    let tmp = 0;
    for(let i = 0; i < this.matchsData.length; i++) {
      for(let j = 0; j < this.scoresData.length; j++) {
        if(this.matchsData[i].idMatch == this.scoresData[j].idMatch) {
          let match = this.matchsData[i];
          match.score1 = this.scoresData[j].score1;
          match.score2 = this.scoresData[j].score2;
          this.dataSource.push(match);
          tmp = 1;
        }
        if(tmp==0) this.dataSource.push(this.matchsData[i]);
        else tmp = 0;
      }
    }
    console.log(this.dataSource);
  }*/

  public suppr(data: ITask): void {
    this.firestore.collection("tasks").doc(data.id).delete().then(() => {
      window.alert("La tâche a bien été supprimée.");
    }).catch((error) => {
      window.alert("Erreur lors de la supression de la tâche.");
    });
  }

  public openDialogAdd(): void {
    this.dialog.open(AddTaskComponent);
  }

  public openDialogModif(data: ITask): void{
    this.taskSelected = data;
  }

  public deco(): void {
    this.authService.signOutUser();
  }

}
