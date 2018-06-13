import { Client } from './../models/Client';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  getClient(id: string): Observable<Client> {
    // get 1 client by id
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(actions => {
        if (actions.payload.exists === false) {
          return null;
        } else {
          const data = actions.payload.data() as Client;
          data.id = actions.payload.id;
          return data;
        }
      })
    );
    return this.client;
  }

  getClients(): Observable<Client[]> {
  // Get all clients with id
    this.clients = this.clientsCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
        });
      })
    );
    return this.clients;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }

  updateClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}

