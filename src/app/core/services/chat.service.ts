import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messagesCollection: AngularFirestoreCollection<IMessage>;

  constructor(private firestore: AngularFirestore) {
    this.messagesCollection = this.firestore.collection<IMessage>('communautes/maCommunaute/chat');
  }

  getMessages(): Observable<IMessage[]> {
    return this.messagesCollection.valueChanges({ idField: 'id' });
  }

  async addMessage(nom: string, email: string, msg: string): Promise<void> {
    await this.messagesCollection.add({ nom, email, msg })
      .then(docRef => console.log('Message ajouté avec l\'ID :', docRef.id))
      .catch(error => console.error('Erreur lors de l\'ajout du message :', error));
  }

}
