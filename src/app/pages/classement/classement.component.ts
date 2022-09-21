import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit {

  public users: Observable<IUser[]>;

  public headElements = ['Rang', 'Pseudo', 'Points'];
  public displayedColumns: string[] = ["rang", "pseudo", "points"];

  public constructor(private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.users = this.firestore.collection<IUser>('users').snapshotChanges().pipe(
      map(e=> {
        return e.map(r => {
          return {id: r.payload.doc.id, ... r.payload.doc.data()};
        })
      })
    );
  }

}
