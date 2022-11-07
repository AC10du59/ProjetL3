import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  public matchs: Observable<IMatch[]>;
  public scores: Observable<IScore[]>;

  public headElements = ['Equipe 1', 'Score 1', 'Score 2', 'Equipe 2'];
  public displayedColumns: string[] = ["equipe1", "score1", "score2", "equipe2"];

  public taskSelected: ITask;

  public constructor(private firestore: AngularFirestore, private authService: AuthService, public dialog: MatDialog) {
  }

  public ngOnInit(): void {
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
          return this.addMatch(e.map(r => {
            return {id: r.payload.doc.id, ... r.payload.doc.data()};
          }))
        })
      );
    });
  }

  public addMatch(tableau: IScore[]): IScore[] {
    this.matchs.subscribe((valueMat) => {
      for(let i = 0; i < valueMat.length; i++) {
        for(let j = 0; j < tableau.length; j++) {
          if(valueMat[i].idMatch == tableau[j].idMatch) {
            tableau[j].equipe1 = valueMat[i].equipe1;
            tableau[j].equipe2 = valueMat[i].equipe2;
          }
        }
      }
    });
    return tableau;
  }

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
}
