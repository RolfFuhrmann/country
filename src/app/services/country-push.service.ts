import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class CountryPushService {
  public readonly websocketSubject = webSocket<Country>('ws://localhost:8082/websocket');

  public getpushService(): WebSocketSubject<Country> {
    return this.websocketSubject;
  }
}
