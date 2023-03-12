import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

interface ICommunaute {
  nom: string;
  emails: string[];
}

@Component({
  selector: 'app-creation-communaute',
  templateUrl: './creation-communaute.component.html',
  styleUrls: ['./creation-communaute.component.css']
})
export class CreationCommunauteComponent implements OnInit {
  creationCommunauteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {
    this.creationCommunauteForm = this.fb.group({
      nom: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
    const communauteRef = this.firestore.collection<ICommunaute>('communaute');
    this.authService.user.subscribe((user) => {
      const nouvelleCommunaute = {
        nom: this.creationCommunauteForm.value.nom,
        emails: [user.email]
      };
      communauteRef.add(nouvelleCommunaute)
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
