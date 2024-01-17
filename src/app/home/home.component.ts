import { Component,OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { WebSocketService } from '../services/web-socket.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private dialog:MatDialog){}

  ngOnInit(): void {
   
  }

   handleSignupAction(){
     const dialogConfig= new MatDialogConfig();
     dialogConfig.width= "550px";
     this.dialog.open(SignupComponent,dialogConfig);
   }

  handleLoginAction(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width= "550px";
    this.dialog.open(LoginComponent,dialogConfig);
  }

}
