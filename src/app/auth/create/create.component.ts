import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

@Injectable()
export class CreateComponent implements OnInit {

  public hide = true;

  public profileForm = this.cr.group({
    pseudo: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mdp: ['', Validators.required],
  });

  constructor(private cr: FormBuilder, private firestore: AngularFirestore, private authService: AuthService) { }

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid) {
      let data: IUser = {email: this.profileForm.get("email")?.value, pseudo: this.profileForm.get("pseudo")?.value, points : 0};
      this.firestore.collection("users").add(data).then(() => {
        window.alert("Votre compte a bien été créé !");
      }).catch((error) => {
        window.alert("Erreur lors de la création du compte.");
      });
      this.authService.signUp(this.profileForm.get("pseudo")?.value, this.profileForm.get("email")?.value, this.profileForm.get("mdp")?.value);
    }
    else{
      window.alert("Formulaire d'inscription invalide !");
    }
  }

}
