import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {IMessage} from '../models/message.model';
import {Observable} from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messageCollection: AngularFirestoreCollection<IMessage>;

  constructor(private firestore: AngularFirestore) {
    this.messageCollection = this.firestore.collection<IMessage>('messages');
  }

  public getMessages(): Observable<IMessage[]> {
    return this.messageCollection.valueChanges({idField: 'id'});
  }

  public async addMessage(nom: string, msg: string, date: any): Promise<void> {
    const user = firebase.auth().currentUser;
    const message: IMessage = {
      nom,
      msg,
      date: date.toISOString()
    };
    await this.messageCollection.add(message);
  }
}
