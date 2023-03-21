import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent {
  users: any[] = [];
  communaute: any[];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore.collection('users').valueChanges().subscribe((users: any[]) => {
      this.users = users;
    });
  
      this.firestore.collection('communaute').valueChanges().subscribe((communaute: any[]) => {
        this.communaute = communaute;
    });
  }

  getNumberOfUsers(): number {
    return this.users.length;
  }


  getNumberOfCommunaute(): number {
    return this.communaute.length;
  }
}

