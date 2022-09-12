import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

import { ITask } from '../../core/models/task.model';
import {MatDialog} from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {

  public items: Observable<ITask[]>;

  public taches: ITask[];

  public headElements = ['Nom de la tâche', 'Description', 'Modifier la tâche', 'Supprimer la tâche'];

  public displayedColumns: string[] = ["nom", "description", "modif", "suppr"];

  public taskSelected: ITask;

  public constructor(private firestore: AngularFirestore, private authService: AuthService, public dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.authService.user.subscribe((user)=> {
      this.items = this.firestore.collection<ITask>('tasks', (ref) => ref.where("email", "==", user.email)).snapshotChanges().pipe(
        map(e=> {
          return e.map(r => {
            return {id: r.payload.doc.id, ... r.payload.doc.data()};
          })
        })
      );
    })
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

  public deco(): void {
    this.authService.signOutUser();
  }

}
