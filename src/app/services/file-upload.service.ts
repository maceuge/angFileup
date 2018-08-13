import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-items';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private IMAGE_FOLDER = 'img';

  constructor(private db: AngularFirestore) { }


  uploadFilesFirebase (file: FileItem[]) {
     console.log(file);
  }

  private saveImage (image: {name: string, url: string}) {
    this.db.collection(`/${this.IMAGE_FOLDER}`)
           .add(image);
  }


}
