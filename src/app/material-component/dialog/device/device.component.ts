import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDevice } from 'src/app/models/IDevice';
import { DeviceService } from 'src/app/services/device.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  onAddDevice = new EventEmitter();
  onEditDevice = new EventEmitter();
  deviceForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: any;
  categorys: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    public dialogRef: MatDialogRef<DeviceComponent>,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.deviceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      description: [null, [Validators.required]],
      address: [null, [Validators.required]],
      energyConsumption: [null, [Validators.required]],
      ownerUsername: [null]
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.deviceForm.patchValue(this.dialogData.data);
    }
  }


  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit();
    }
    else {
      this.add();
    }
  }
  add() {
    var formData = this.deviceForm.value;
    var data = {
      name: formData.name,
      energyConsumption: formData.energyConsumption,
      address: formData.address,
      description: formData.description,
      ownerUsername: formData.ownerUsername
    }

    console.log(data);

    this.deviceService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddDevice.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar("success", "");
    }, (error) => {
      console.log(error)
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

  edit() {
    var formData = this.deviceForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      energyConsumption: formData.energyConsumption,
      address: formData.address,
      description: formData.description,
      ownerUsername: formData.ownerUsername
    }

    console.log(data);

    this.deviceService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditDevice.emit();
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