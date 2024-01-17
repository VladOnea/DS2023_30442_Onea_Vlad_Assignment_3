import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ILoggedInUser } from '../models/ILoggedInUser';
import { ChatService } from '../services/chat.service';
import { IReceiveMessage } from '../models/IReceiveMessage';
import { IAvailableChat } from '../models/IAvailableChat';

@Component({
    selector: 'app-admin-chat',
    templateUrl: './admin-chat.component.html',
    styleUrls: ['./admin-chat.component.css'],
})
export class AdminChatComponent implements OnInit {
    loggedInUser?: ILoggedInUser;
    newMessage: string = '';

    availableChats: IAvailableChat[] = [];
    selectedChat: IAvailableChat | undefined;

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
                if (!message) {
                    return;
                }

                const founChat = this.availableChats.find(
                    (u) => u.user === message.from,
                );

                if (founChat) {
                    founChat.messages.push(message);
                    return;
                }

                this.availableChats.push({
                    user: message.from!,
                    messages: [message],
                });
            });
        });
    }

    sendMessage(to: string) {
        const newMessage: IReceiveMessage = {
            from: this.loggedInUser!.username,
            message: this.newMessage,
        };

        this.availableChats
            .find((ac) => ac.user === to)
            ?.messages.push(newMessage);

        this.chatService.sendMessageToClient(to, this.newMessage).subscribe();

        this.newMessage = '';
    }

    selectChat(user: string) {
        this.selectedChat = this.availableChats.find((u) => u.user === user);
    }
}
