import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private af: AngularFirestore) {}

  public modifyTask(id: string, nom_task: string, description_task: string) {
    return this.af.doc("tasks/" + id).update({nom: nom_task, description: description_task});
  }

}
