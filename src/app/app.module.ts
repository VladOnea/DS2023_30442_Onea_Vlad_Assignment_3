import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ManageDeviceComponent } from './material-component/manage-device/manage-device.component';
import { DeviceComponent } from './material-component/dialog/device/device.component';
import { ConfirmationComponent } from './material-component/dialog/confirmation/confirmation.component';
import { ManageUserComponent } from './material-component/manage-user/manage-user.component';
import { UserComponent } from './material-component/dialog/user/user.component';
import { SignalRService } from 'src/app/services/SignalRService';
import { ClientChatComponent } from './client-chat/client-chat.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';

/*const ngxUiLoaderConfig: NgxUiLoaderConfig ={
  text: "Loading...",
  textColor: "FFFFFF",
  textPosition: "center-center",
  bgsColor: "#7b1fa2",
  fgsColor: "#7b1fa2",
  fgsType: SPINNER.cubeGrid,
  fgsSize: 100,
  hasProgressBar: false
}*/


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ConfirmationComponent,
    UserDashboardComponent,
    ManageDeviceComponent,
    ManageUserComponent,
    DeviceComponent,
    UserComponent,
    ClientChatComponent,
    AdminChatComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FlexLayoutModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule
   // NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [HttpClientModule, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
