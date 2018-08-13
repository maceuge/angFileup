import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  files: FileItem[] = [];
  overDropZone = false;

  constructor(public servFile: FileUploadService) { }

  ngOnInit() {}

  uploadFiles () {
    console.log('Cargar Imagenes a Firebase');
    this.servFile.uploadFilesFirebase(this.files);
  }

  pruebaSobreElemento (event) {
     console.log(event);
  }

}
