import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-items';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  private IMAGE_FOLDER = 'img';
  private imageColection: AngularFirestoreCollection<Image>;

  constructor(private db: AngularFirestore) { }

  uploadFilesFirebase (files: FileItem[]) {
     //console.log(files);
     const storageRef = firebase.storage().ref();

     for (const fileItem of files) {
        fileItem.uploading = true;
        if (fileItem.progress >= 100) {
          continue;
        }

        const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.IMAGE_FOLDER}/${fileItem.fileName}`).put(fileItem.file);

              uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                 (snap: firebase.storage.UploadTaskSnapshot) => fileItem.progress = (snap.bytesTransferred / snap.totalBytes) * 100,
                 (error) => console.error('No se pudo subir', error),
                 () => {
                   console.log('Imagen cargada correctamente!');
                   fileItem.uploading = false;
                   uploadTask.then( snap => {
                     return snap.ref.getDownloadURL();
                   }).then( downLink => {
                     fileItem.url = downLink;
                     
                     this.saveImage({
                       name: fileItem.fileName,
                       url: fileItem.url
                     }); 
                   });
                 }

              );
     }
  }

  private saveImage (image: {name: string, url: any}) {
    this.db.collection(`/${this.IMAGE_FOLDER}`)
           .add(image);
  }

  getStorageFiles () {
    this.imageColection = this.db.collection<Image>('img', ref => ref.orderBy('fecha', 'desc').limit(10));
    
    return this.imageColection.valueChanges().pipe(
                    map( (images: Image[]) => {
                      console.log(images); 
                      
                    //   this.chats = [];
                    //   for (let mensaje of mensajes) {
                    //     this.chats.unshift(mensaje);
                    //   }
                    //  return this.chats;
                    }));
  }


}

export interface Image {
  name: string;
  url: string;
}
