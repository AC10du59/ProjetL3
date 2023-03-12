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

  public getMessages(): Observable<IMessage[]> {
    return this.messagesCollection.valueChanges({idField: 'id'}).pipe(
      map(messages => {
        messages.sort((a, b) => {
          return b.date.seconds - a.date.seconds;
        });
        return messages;
      })
    );
  }

  public addMessage(nom: string, msg: string, date: Date): Promise<DocumentReference<IMessage>> {
    const message: IMessage = {
      nom,
      msg,
      date
    };
    return this.messagesCollection.add(message);
  }
}
