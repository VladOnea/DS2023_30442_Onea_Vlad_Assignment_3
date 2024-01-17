import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ILoggedInUser } from '../models/ILoggedInUser';
import { ChatService } from '../services/chat.service';
import { IReceiveMessage } from '../models/IReceiveMessage';

@Component({
    selector: 'app-client-chat',
    templateUrl: './client-chat.component.html',
    styleUrls: ['./client-chat.component.css'],
})
export class ClientChatComponent implements OnInit {
    loggedInUser?: ILoggedInUser;
    newMessage: string = '';

    messages: IReceiveMessage[] = [];

    constructor(
        private userService: UserService,
        private chatService: ChatService,
    ) {}

    ngOnInit(): void {
        this.userService.currentUser$.subscribe((user) => {
            this.loggedInUser = user!;
            console.log('user:', this.loggedInUser);
            this.chatService.startConnection(this.loggedInUser!.username);
            this.chatService.message$.subscribe((message) => {
                if (message) {
                    this.messages.push(message);
                }
            });
        });
    }

    sendMessage() {
        this.chatService.sendMessageToAdmin(this.newMessage).subscribe();
        this.messages.push({
            from: this.loggedInUser!.username,
            message: this.newMessage,
        });
        this.newMessage = '';
    }
}
