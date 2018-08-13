import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {

  files: FileItem[] = [];

  constructor(public servFile: FileUploadService) { }

  ngOnInit() {}

  uploadFiles () {
    console.log('Cargar Imagenes a Firebase');
    
    this.servFile.uploadFilesFirebase(this.files);
  }

}
