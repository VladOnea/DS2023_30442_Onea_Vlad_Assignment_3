import { Injectable } from '@angular/core';
import  {Stomp} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient:any;

  initializeWebSocketConnection(userId: number | undefined,callback: (message: any) => void): void {
    const socket = new  WebSocket('ws://localhost:7220/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      if (userId) {
        this.stompClient.connect({}, () => {
          this.stompClient.subscribe(`/${userId}`, callback);
        });
      }})
    }

  disconnectWebSocket(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
      this.stompClient = null;
    }
  }
}
