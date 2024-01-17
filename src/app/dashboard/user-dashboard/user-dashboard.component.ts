import { Component, OnInit, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
} from '@angular/material/dialog';
import { DeviceService } from 'src/app/services/device.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ILoggedInUser } from 'src/app/models/ILoggedInUser';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';
import { WebSocketService } from '../../services/web-socket.service';
import { SignalRService } from 'src/app/services/SignalRService';
import { ChatService } from 'src/app/services/chat.service';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
    displayedColumns: string[] = [
        'name',
        'description',
        'address',
        'energyConsumption',
    ];
    dataSource: any;
    data: any;
    devices: any[] = [];
    loggedInUser?: ILoggedInUser;

    messages = [];
    newMessage = '';

    constructor(
        private deviceDetails: DeviceService,
        private router: Router,
        private userService: UserService,
        private dialog: MatDialog,
        private webSocketService: WebSocketService,
        private signalRService: SignalRService,
        private chatService: ChatService,
    ) {}

    ngOnInit() {
        this.userService.currentUser$.subscribe((user) => {
            this.loggedInUser = user!;

            this.deviceDetails
                .getUserDevice(this.loggedInUser.userId)
                .subscribe((devices) => {
                    this.devices = devices;
                    console.log(this.devices);
                    console.log(this.loggedInUser?.userId);
                });
        });
        // console.log("webSocketInainte");
        // this.webSocketService.initializeWebSocketConnection(this.loggedInUser?.userId,this.handleMe.bind(this));
        // console.log("webSocketDupa");
        // console.log(localStorage.getItem("userId"));

        var userId = 0;
        if (this.loggedInUser?.userId != null) {
            userId = this.loggedInUser.userId;
        }
        // this.signalRService.startConnection(userId);
        // this.signalRService.addTransferChartDataListener((data) => {
        //     //console.log('am ajuns sa primesc ceva')
        //     console.log(data);
        // });
    }
    logout(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            message: 'Logout',
            confirmation: true,
        };
        const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
        const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(
            (response) => {
                dialogRef.close();
                localStorage.clear();
                this.router.navigate(['/']);
            },
        );
    }

    private handleMe(value: any): void {
        console.log('am ajuns aici');
        console.log(value);
    }
}
