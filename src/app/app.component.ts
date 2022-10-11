import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from './pages/contact/contact.component';
import { AuthService } from './core/services/auth.service';
import { ReglesComponent } from './pages/regles/regles.component';
import {MatchComponent} from './pages/match/match.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from './core/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent implements OnInit {
  title = 'CKR FOOT';
  url: string = 'https://www.wellingtonsoccer.com/lib/api/auth.cfc?returnFormat=JSON&method=Authenticate';
  public users: Observable<IUser[]>;
  public user: IUser;

  constructor(public dialog: MatDialog, private authService: AuthService, private firestore: AngularFirestore) {}

  public ngOnInit(): void {
    this.authService.user.subscribe((user)=> {
      this.users = this.firestore.collection<IUser>('users', (ref) => ref.where("email", "==", user.email)).snapshotChanges().pipe(
        map(e=> {
          return e.map(r => {
            return {id: r.payload.doc.id, ... r.payload.doc.data()};
          })
        }))
      });
  }

  public connect(): boolean {
    return sessionStorage.getItem('isConnected') == 'true';
  }

  public communaute(): boolean {  
    if(this.users==undefined) return false;
    this.users.subscribe(event => this.user = event[0]);
    if(this.user.communaute) return true;
    else return false; 
  }

  public openDialogContact(): void {
    this.dialog.open(ContactComponent, {
      height: '400px',
      width: '600px',
    });
  }

  public openDialogRegles(): void {
    this.dialog.open(ReglesComponent, {
      height: '400px',
      width: '600px',
    });
  }


  public openDialogMatchs(): void {
    this.dialog.open(MatchComponent, {
      height: '400px',
      width: '600px',
    });
  }

  public deco(): void {
    this.authService.signOutUser();
  }

  /*public getInfos(): void {
    var require: any;
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://v1.baseball.api-sports.io/{endpoint}',
      'headers': {
        'x-rapidapi-key': '395f56620e52841c3d7683b92e2ebf14',
        'x-rapidapi-host': 'v1.baseball.api-sports.io'
      }
    };
    request(options, function (error: string | undefined, response: { body: any; }) {
      if (error) throw new Error(error);
      console.log(response.body);
      });
    }

    sendPostRequest() {
      const headers = new HttpHeaders()
        .set('cache-control', 'no-cache')
        .set('content-type', 'application/json')
        .set('postman-token', '395f56620e52841c3d7683b92e2ebf14');

        const body = {
          email: 'myemail@xyz.com',
          user_password: 'mypasss',
          token: 'my token'
        }

        this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
          this.totalAngularPackages = data.total;
        })

        return this.http.post(this.url, body, { headers: headers }).subscribe(response => console.log(response));
    }   */

}
