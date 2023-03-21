import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IMessage } from '../models/message.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesCollection: AngularFirestoreCollection<IMessage>;

  constructor(private firestore: AngularFirestore) {
    this.messagesCollection = this.firestore.collection<IMessage>('messages');
  }

  public getMessages(communaute: string): Observable<IMessage[]> {
    return this.messagesCollection.valueChanges({idField: 'id'}).pipe(
      map(messages => {
        messages.sort((a, b) => {
          return b.date.seconds - a.date.seconds;
        });
        for (let i = messages.length - 1; i >= 0; i--) {
          if (messages[i].commu !== communaute) {
            messages.splice(i, 1);
          }
        }
        
        return messages;
      })
    );
  }

  public addMessage(email: string, pseudo: string, msg: string, commu: string, date: Date): Promise<DocumentReference<IMessage>> {
    const message: IMessage = {
      email,
      pseudo,
      msg,
      commu,
      date
    };
    return this.messagesCollection.add(message);
  }
}
