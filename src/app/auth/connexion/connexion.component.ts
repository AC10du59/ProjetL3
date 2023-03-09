import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

@Injectable()
export class ConnexionComponent implements OnInit, CanActivate {
  public hide = true;

  public profileCoForm = this.co.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    mdp: ['', Validators.required],
  });

  constructor(private co: FormBuilder, private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
  }

  public resetPassword(): void {
    this.authService.resetPassword(this.profileCoForm.get("email")?.value);
  }

  public onSubmit(): void {
    this.profileCoForm.markAllAsTouched();
    
    if (this.profileCoForm.valid) {
      this.authService.signIn(this.profileCoForm.get("email")?.value, this.profileCoForm.get("mdp")?.value);
    }
    else{
      window.alert("Formulaire invalide !");
    }
  }

  public canActivate() {
    return true;
  }

}
