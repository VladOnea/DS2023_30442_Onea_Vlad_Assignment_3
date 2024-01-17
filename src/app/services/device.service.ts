import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  url= environment.deviceUrl;
  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url + "/api/device",data)
  }

  update(data:any){
    return this.httpClient.put(this.url + `/api/device/${data.id}`,data)
  }

  getAllDevices(){
    return this.httpClient.get<any[]>(this.url+"/api/device");
  }

  getUserDevice(userId:number){
    return this.httpClient.get<any[]>(this.url+`/api/device/getUserDevices/${userId}`);
  }


  delete(deviceId:any){
    return this.httpClient.delete(this.url + `/api/device/delete/${deviceId}`)
  }

  startDeviceSimulation(deviceId: number) {
    return this.httpClient.post(`${this.url}/start-simulation`, { deviceId });
  }


}
