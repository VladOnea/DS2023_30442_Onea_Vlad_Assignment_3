import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { UserComponent } from '../dialog/user/user.component';
import { IUserDetails } from 'src/app/models/IUserDetails';
//import { UserComponent } from '../dialog/user/user.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  displayedColumns: string[]= ['userName','phoneNumber','email','role', 'edit'];
  dataSource: any;
  responseMessage: any;
  users: IUserDetails[] = [];

  

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private router:Router,
    private dialog:MatDialog,
    ) { }

  ngOnInit(): void {
    // this.ngxService.start();
    this.userService.getAllUsers().subscribe((users)=> {
     this.users = users;
    })
  }

  tableData(){
    this.userService.getAllUsers().subscribe((response:any)=>{
      // this.ngxService.stop();
      this.dataSource= new MatTableDataSource(response);
    },(error:any)=>{
      // this.ngxService.stop();
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

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      message: 'delete '+ values.username + ' user',
      confirmation: true
    }
    console.log(values);

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub= dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
     // this.ngxService.start();
      this.deleteDevice(values.id);
      dialogRef.close();
    })
  }
  deleteDevice(id:any){
    this.userService.delete(id).subscribe((response:any)=>{
      //this.ngxService.stop();
      this.tableData();
      this.responseMessage= response?.message;
      this.snackbarService.openSnackBar("success","");
    },(error:any)=>{
      //this.ngxService.stop();
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


  handleEditAction(values:any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data ={
      action: 'Edit',
      data: values
    };
    dialogConfig.width="850px";
    const dialogRef= this.dialog.open(UserComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub= dialogRef.componentInstance.onEditUser.subscribe((response)=>{
      this.tableData();
    })
  }

}

