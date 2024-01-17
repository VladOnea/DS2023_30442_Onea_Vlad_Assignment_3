import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IGetAllDevices } from 'src/app/models/IGetAllDevices';
import { DeviceService } from 'src/app/services/device.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DeviceComponent } from '../dialog/device/device.component';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-manage-device',
  templateUrl: './manage-device.component.html',
  styleUrls: ['./manage-device.component.css']
})
export class ManageDeviceComponent implements OnInit{

  displayedColumns: string[]= ['Name','Description','Address','EnergyConsumption','OwnerUsername','edit'];
  dataSource: any;
  //length: any;
  responseMessage: any;
  devices: any[] = [];
  getAllDevices!: IGetAllDevices

  constructor(private deviceService:DeviceService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.deviceService.getAllDevices().subscribe((devices)=> {
      this.devices = devices;
      console.log(this.devices);
    })
   
  }

  tableData(){
    this.deviceService.getAllDevices().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource= new MatTableDataSource(response);
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage= error.error?.message;
      }
      else{
        this.responseMessage= GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    
    })
  }
  logout(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout',
      confirmation: true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig)
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
    })
  }

  handleEditAction(values:any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data ={
      action: 'Edit',
      data: values
    };
    dialogConfig.width="850px";
    const dialogRef= this.dialog.open(DeviceComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub= dialogRef.componentInstance.onEditDevice.subscribe((response)=>{
      this.tableData();
    })
  }
  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      message: 'delete '+ values.name + ' device',
      confirmation: true
    }
    console.log(values);

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub= dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteDevice(values.id);
      dialogRef.close();
    })
  }
  deleteDevice(id:any){
    this.deviceService.delete(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.tableData();
      this.responseMessage= response?.message;
      this.snackbarService.openSnackBar("success", "");
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage= error.error?.message;
      }
      else{
        this.responseMessage= GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    
    })
  }
  handleAddAction(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data ={
      action: 'Add'
    };
    dialogConfig.width="850px";
    const dialogRef= this.dialog.open(DeviceComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub= dialogRef.componentInstance.onAddDevice.subscribe((response)=>{
      this.tableData();
    })
  }
  startSimulation(device: any): void {
    console.log('Starting simulation for device:', device.id);
    this.deviceService.startDeviceSimulation(device.id).subscribe(
      response => {
        console.log('Simulation started:', response);
      },
      error => {
        console.error('Error starting simulation:', error);
      }
    );
  }

  // ngOnDestroy(): void {
  //   this.webSocketService.closeWebSocket();
  // }
  
}
