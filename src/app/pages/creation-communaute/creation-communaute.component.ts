import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {IUser} from 'src/app/core/models/user.model';
import { map, take } from 'rxjs/operators';

interface ICommunaute {
  id?: string;
  nom: string;
  emails: string[];
}

@Component({
  selector: 'app-creation-communaute',
  templateUrl: './creation-communaute.component.html',
  styleUrls: ['./creation-communaute.component.css']
})
export class CreationCommunauteComponent implements OnInit {
  public formControl: FormGroup;
  public users: Observable<IUser[]>;
  public commu: Observable<ICommunaute[]>;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {
    this.formControl = this.fb.group({
      nom: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.users = this.firestore
      .collection<IUser>('users')
      .snapshotChanges()
      .pipe(
        take(1),
        map((e) => {
          return e.map((r) => {
              return {id: r.payload.doc.id, ...r.payload.doc.data()};
            })
        })
      );

    this.commu = this.firestore
    .collection<ICommunaute>('communaute')
    .snapshotChanges()
    .pipe(
      take(1),
      map((e) => {
        return e.map((r) => {
            return {id: r.payload.doc.id, ...r.payload.doc.data()};
          })
      })
    );

    this.authService.user.subscribe((user) => {
      this.firestore.collection<ICommunaute>('communaute', (ref) =>
        ref.where('emails', 'array-contains', user.email)
      ).valueChanges().subscribe((communautes) => {
        if (communautes.length > 0) {
          this.router.navigateByUrl('/communaute/communaute');
        }
      });
    });
  }

  creerCommunaute(): void {
    this.formControl.markAllAsTouched();
    if (! this.formControl.valid) {
      window.alert("Entrez un nom de communauté !");
    } else {
      const communauteRef = this.firestore.collection<ICommunaute>('communaute');
      this.authService.user.subscribe((user) => {
        const id = this.firestore.createId(); // Utiliser createId() pour générer un id unique
        const nouvelleCommunaute = {
          id,
          nom: this.formControl.value.nom,
          emails: [user.email]
        };
        this.users.pipe().subscribe(data => {
          for(let i = 0; i < data.length; i++) {
            if(data[i].email == user.email) this.firestore.doc("users/" + data[i].id).update({communaute: this.formControl.value.nom});
          }
        });

        communauteRef.doc(id).set(nouvelleCommunaute)
          .then(() => {
            console.log('Communauté créée avec succès');
            this.router.navigateByUrl('/communaute/communaute');
          })
          .catch((erreur) => {
            console.error('Erreur lors de la création de la communauté', erreur);
          });
      });
    }
  }

  rejoindreCommunaute(): void {
    this.formControl.markAllAsTouched();
    if (! this.formControl.valid) {
      window.alert("Entrez un nom de communauté !");
    } else {
      this.authService.user.subscribe((user) => {
        this.users.pipe().subscribe(dataUSER => {
            for(let j = 0; j < dataUSER.length; j++) {
              if(dataUSER[j].email == user.email) {
                this.commu.pipe().subscribe(data => {
                    for(let i = 0; i < data.length; i++) {
                      if(data[i].nom == this.formControl.value.nom) {
                        this.firestore.doc("users/" + dataUSER[j].id).update({communaute: this.formControl.value.nom});

                        const docRef = this.firestore.doc("communaute/" + data[i].id);
                        const newEmails = [...data[i].emails, dataUSER[j].email];

                        docRef.update({emails: newEmails}) // Mettre à jour le document Firebase avec le nouveau tableau d'emails
                          .then(() => {
                            console.log("Email ajouté avec succès dans le document Firebase");
                            this.router.navigateByUrl('/communaute/communaute');
                          })
                          .catch((error) => {
                            console.error("Erreur lors de l'ajout de l'email dans le document Firebase", error);
                          });
                      }
                    }
                  });
              }
            }
        });
      });
    }
  }
}
