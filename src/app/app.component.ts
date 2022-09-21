import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from './pages/contact/contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent {
  title = 'Pari-Ligue 1';
  url: string = 'https://www.wellingtonsoccer.com/lib/api/auth.cfc?returnFormat=JSON&method=Authenticate';
  myImageUrl = "./Logo.jpg";

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  public connect(): boolean {
    return sessionStorage.getItem('isConnected') == 'true';
  }

  public openDialogContact(): void {
    this.dialog.open(ContactComponent, {
      height: '400px',
      width: '600px',
    });
    
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