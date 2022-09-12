import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

@Injectable()
export class CreateComponent implements OnInit {

  public hide = true;

  public profileForm = this.cr.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mdp: ['', Validators.required],
  });

  constructor(private cr: FormBuilder, private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid) {
      this.authService.signUp(this.profileForm.get("email")?.value, this.profileForm.get("mdp")?.value);
    }
    else{
      window.alert("Formulaire d'inscription invalide !!!");
    }
  }

}
