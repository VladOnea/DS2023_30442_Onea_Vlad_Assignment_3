import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IReceiveMessage } from '../models/IReceiveMessage';
import { ISendMessage } from '../models/ISendMessage';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private hubConnection?: HubConnection;

    private messageSource = new BehaviorSubject<IReceiveMessage | null>(null);
    message$ = this.messageSource.asObservable();

    constructor(private http: HttpClient) {}

    public startConnection = (username: string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`http://localhost:5001/chat-hub?username=${username}`)
            .build();
        this.hubConnection.start().then(() => this.addMessageListener());
    };

    addMessageListener() {
        this.hubConnection?.on('ReceiveMessage', (message: IReceiveMessage) => {
            if (message) {
                this.messageSource.next(message);
            }
        });
    }

    sendMessageToAdmin(message: string): Observable<void> {
        const body: ISendMessage = { to: 'Vlad', message };

        return this.http.post<void>(environment.chatUrl, body);
    }

    sendMessageToClient(to: string, message: string): Observable<void> {
        const body: ISendMessage = { to, message };

        return this.http.post<void>(environment.chatUrl, body);
    }
}
