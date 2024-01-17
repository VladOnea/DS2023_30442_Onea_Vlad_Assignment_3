import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDevice } from 'src/app/models/IDevice';
import { DeviceService } from 'src/app/services/device.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  onEditUser = new EventEmitter();
  userForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: any;
  categorys: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserComponent>,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      role: [null, [Validators.required,Validators.pattern(GlobalConstants.roleRegex)]]
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.userForm.patchValue(this.dialogData.data);
    }
  }


  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit();
  }
}

  edit() {
    var formData = this.userForm.value;
    var data = {
      id: this.dialogData.data.id,
      username: formData.username,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      role: formData.role,
    }

    console.log(data);

    this.userService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditUser.emit();
      this.snackbarService.openSnackBar("success", "");
    }, (error) => {
      this.dialogRef.close();
      console.error(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
   }



}
