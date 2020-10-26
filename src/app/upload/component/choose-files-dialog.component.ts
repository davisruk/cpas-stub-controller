import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../services/file.upload.service';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-choose-files-dialog',
  templateUrl: './choose-files-dialog.component.html',
  styleUrls: ['./choose-files-dialog.component.scss']
})
export class ChooseFilesDialogComponent implements OnInit {
  @ViewChild('file') file;
  public files: Set<File> = new Set();

  canBeClosed = true;
  primaryButtonText = 'Upload';
  uploading = false;
  uploadSuccessful = false;

  constructor(public dialogRef: MatDialogRef<ChooseFilesDialogComponent>, public uploadService: UploadService) { }

  ngOnInit(): void {
  }

  addFiles(): void {
    this.file.nativeElement.click();
  }

  onFilesAdded(): void {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }

  closeDialog(): void {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;
    this.uploadSuccessful = false;
    this.canBeClosed = false;

    // start the upload and save the progress map
    this.uploadService.upload(this.files).subscribe(response => {
      if (response === 'Finished') {
        // The OK-button should have the text "Finish" now
        this.primaryButtonText = 'Finish';

        // The dialog should not be closed while uploading
        this.canBeClosed = true;
        this.dialogRef.disableClose = false;
        this.uploadSuccessful = true;
        // ... and the component is no longer uploading
        this.uploading = false;
      }
    });
  }
}
