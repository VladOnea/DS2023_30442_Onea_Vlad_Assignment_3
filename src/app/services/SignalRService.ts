import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' 
  })

export class SignalRService {
  private hubConnection?: HubConnection;

  public startConnection = (userId : number ) => {
    this.hubConnection = new HubConnectionBuilder()
                          .withUrl(`http://monitor:7300/chathub?userId=${userId}`) 
                          .build();
    if (userId==null){
        userId=0;
    }
    this.hubConnection
      .start()
      .then(() => this.sendMessageToClient(userId.toString(),"Connected"))
      .catch(err => console.log('Error while starting connection: ' + err));
  }
  public sendMessageToClient(connectionId: string, message: string): void {   
    if (this.hubConnection)  
    {
    this.hubConnection.send('SendMessageToClient', connectionId, message); 
    }
  }

  public addTransferChartDataListener = (callback: (data:any) => void) => {
    this.hubConnection?.on('ReceiveMessage', (data) => {
      callback(data);
    });
  }
}
