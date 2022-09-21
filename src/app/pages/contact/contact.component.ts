import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IContact } from 'src/app/core/models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public profileForm = this.co.group({  
    email: new FormControl('', [Validators.required, Validators.email]),
    description: ['', Validators.required],
  });

  constructor(private co: FormBuilder ,private firestore: AngularFirestore) {}

  public ngOnInit(): void {
  }

  public onSubmit(): void {

    if (this.profileForm.valid){
      let data: IContact = {email: this.profileForm.get("email")?.value, description: this.profileForm.get("description")?.value};
      this.firestore.collection("contacts").add(data).then(() => {
        window.alert("Votre demande a été envoyé !");
      }).catch((error) => {
        window.alert("Erreur lors de l'envoi du formulaire.");
      });

    }
    else{
      window.alert("Erreur lors de l'envoi du formulaire.");
    }
  }
}
