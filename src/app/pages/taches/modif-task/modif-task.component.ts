import { Component,  EventEmitter,  Input,  OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITask } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-modif-task',
  templateUrl: './modif-task.component.html',
  styleUrls: ['./modif-task.component.css']
})
export class ModifTaskComponent implements OnInit {

  @Input() task: ITask;
  @Output() closeIt = new EventEmitter();

  public profileForm = this.co.group({
    nom: [null, Validators.required],
    description: [null, Validators.required],
    id: [null],
    email: [null]
  });

  constructor(private co: FormBuilder, private router: Router, private taskService: TaskService) {}

  public ngOnInit(): void {
    this.profileForm.get('nom')?.setValue(this.task.nom);
    this.profileForm.get('description')?.setValue(this.task.description);
    this.profileForm.get('id')?.setValue(this.task.id);
    this.profileForm.get('email')?.setValue(this.task.email);
  }


  public onSubmit(): void {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid) {
      this.taskService.modifyTask(this.profileForm.get("id")?.value, this.profileForm.get("nom")?.value, this.profileForm.get("description")?.value);
    }
    else{
      window.alert("Formulaire invalide !");
    }
  }

  public close(): void {
    if (this.task) {
      this.closeIt.emit(true);
    } else {
      this.router.navigate(['/taches-component']);
    }
  }

}
