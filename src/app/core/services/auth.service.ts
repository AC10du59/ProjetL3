import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user: Observable<IUser>;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router  ) {
      this.user = this.afAuth.authState.pipe(map(state => ({email: state?.email} as IUser)));
    }

  // s'inscrire avec l'email et le mot de passe
  public signUp(pseudo: string, email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("Bienvenue " + pseudo + " ! Connectes-toi et viens décrocher la 1ère place !");
        this.router.navigate(['/auth/connexion-component']);
      }).catch((error) => {
        window.alert(error.message)
      })
    }

  // se connecter avec l'email et le mot de passe
  public signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
         window.alert("Tu es de retour parmi nous ! Viens décrocher la 1ère place !");
         sessionStorage.setItem("isConnected", "true");
         this.router.navigate(['/tasks/taches-component'])
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // se déconnecter
  public signOutUser() {
    sessionStorage.setItem("isConnected", "false");
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
