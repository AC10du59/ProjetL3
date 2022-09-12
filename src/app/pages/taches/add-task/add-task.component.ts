import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ITask } from '../../../core/models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  public profileForm = this.co.group({
    nom: ['', Validators.required],
    description: ['', Validators.required],
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private co: FormBuilder ,private firestore: AngularFirestore) {}

  public ngOnInit(): void {
  }

  public onSubmit(): void {

    if (this.profileForm.valid){
      let data: ITask = {email: this.profileForm.get("email")?.value, nom: this.profileForm.get("nom")?.value, description: this.profileForm.get("description")?.value};
      this.firestore.collection("tasks").add(data).then(() => {
        window.alert("La tâche a bien été ajoutée.");
      }).catch((error) => {
        window.alert("Erreur lors de l'ajout de la tâche.");
      });

    }
    else{
      window.alert("Erreur dans le formulaire d'ajout.");
    }
  }
}
