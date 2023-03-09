import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user.model';

interface IPari {
  id?: string;
  email: string;
  equipeDom: string;
  equipeExt: String;
  scoreDom?: number;
  scoreExt?: number;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user: Observable<IUser>;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private firestore: AngularFirestore  ) {
      this.user = this.afAuth.authState.pipe(map(state => ({email: state?.email} as IUser)));
    }

  // s'inscrire avec l'email et le mot de passe
  public signUp(pseudo: string, email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("Bienvenue " + pseudo + " ! Connectes-toi et viens décrocher la 1ère place !");
        let data: IUser = {email: email, pseudo: pseudo, points : 0};
        this.firestore.collection("users").add(data).then(() => {
          console.log("Compte bien créé !");
        }).catch((error) => {
          window.alert("Erreur lors de la création du compte.");
        });

        // création des paris dans firebase lors de la création du compte
        const url = `http://51.178.38.151/api/JSON/saison.json`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
          let i;
          for(i = 0; i < data.length; i++) {
            if(data[i].score_domicile == null && data[i].score_exterieur == null) {
              let journeeActuelle = "J" + Number(data[i].journee);
              let valeur: IPari = {email: email, equipeDom: data[i].clubDesktop_domicile, equipeExt: data[i].clubDesktop_exterieur};
             
              this.firestore.collection("journees").doc("bA9Ka0MiheziTMthCYRc").collection(journeeActuelle).add(valeur).then(() => {
                console.log("Pari crée !");
              }).catch((error) => {
                window.alert("Erreur lors de la création du pari.");
              });;
            };
          }
        })
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
         this.router.navigate(['/matchs/match-component'])
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // réinitialiser mot de passe
  public resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        window.alert("Tu as reçu un mail pour réinitialiser ton mot de passe !");
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }
 
  
  // se déconnecter
  public signOutUser() {
    sessionStorage.setItem("isConnected", "false");
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
