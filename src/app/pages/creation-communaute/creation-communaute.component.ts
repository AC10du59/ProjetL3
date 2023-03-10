import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-creation-communaute',
  templateUrl: './creation-communaute.component.html',
  styleUrls: ['./creation-communaute.component.css']
})
export class CreationCommunauteComponent implements OnInit {
  creationCommunauteForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore, private authService: AuthService) {
    this.creationCommunauteForm = this.fb.group({
      nom: ['', Validators.required],
      emails: ['', Validators.required]
    });
  }

  creerCommunaute(): void {
    const communauteRef = this.firestore.collection('communaute');
    const emails: string[] = this.creationCommunauteForm.value.emails.split(',').map((email: string) => email.trim());
    this.authService.user.subscribe((user) => {
      emails.push(user.email);
      const nouvelleCommunaute = {
        nom: this.creationCommunauteForm.value.nom,
        emails
      };
      communauteRef.add(nouvelleCommunaute)
        .then(() => {
          console.log('Communauté créée avec succès');
        })
        .catch((erreur) => {
          console.error('Erreur lors de la création de la communauté', erreur);
        });
    });
  }

  ngOnInit(): void {
  }
}
