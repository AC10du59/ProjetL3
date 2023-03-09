import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IUser} from 'src/app/core/models/user.model';
import {ChatService} from 'src/app/core/services/chat.service';
import {IMessage} from 'src/app/core/models/message.model';

@Component({
  selector: 'app-communaute',
  templateUrl: './communaute.component.html',
  styleUrls: ['./communaute.component.css']
})
export class CommunauteComponent implements OnInit {
  public users: Observable<IUser[]>;
  public messages: Observable<IMessage[]>;
  public message = '';


  public headElements = ['Rang', 'Pseudo', 'Points'];
  public displayedColumns: string[] = ['rang', 'pseudo', 'points'];

  constructor(private firestore: AngularFirestore, private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.users = this.firestore.collection<IUser>('users').snapshotChanges().pipe(
      map(e => {
        return this.trier(e.map(r => {
          return {id: r.payload.doc.id, ...r.payload.doc.data()};
        }));
      })
    );
    this.messages = this.chatService.getMessages();
  }

  public trier(tableau: IUser[]): IUser[] {
    tableau.sort((a, b) => {
      return b.points - a.points;
    });
    let rangCompteur = 1;
    for (let i = 0; i < tableau.length; i++) {
      if (i != 0) {
        if (tableau[i].points != tableau[i - 1].points) {
          tableau[i].rang = '' + rangCompteur;
        } else {
          tableau[i].rang = '-';
        }
      } else {
        tableau[i].rang = '' + rangCompteur;
      }
      rangCompteur += 1;
    }
    return tableau;
  }

  public sendMessage(): void {
    const nom = 'Anonymous';
    const email = 'anonymous@example.com';
    const date = new Date();
    this.chatService.addMessage(nom, email, this.message, date).then(() => {
      this.message = ''; // réinitialiser la valeur de message après l'envoi réussi
    }).catch(error => {
    });
  }


}
