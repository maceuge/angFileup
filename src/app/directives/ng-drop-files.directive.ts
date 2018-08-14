import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-items';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();
  @Input() files: FileItem[] = [];
  
  constructor() { }
  
  // Eventos del mouse sobre
  @HostListener('dragover', ['$event'])
  public onDragEnter (event: any) {
      this.mouseOver.emit(true);
      this._prevDefault(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave (event: any) {
      this.mouseOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop (event: any) {
    // aqui obtengo todos los archivos
    const transferencia = this._getTransferencia(event);
    if (!transferencia) {
      return;
    }
    this._extraerArchivos(transferencia.files);
    this._prevDefault(event);
    this.mouseOver.emit(false);
  }

  // funcion para extender la compatibilidad del navegador con respecto al file drop
  private _getTransferencia (event: any) {
     return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTrasfer;
  }

  private _extraerArchivos (archivosLista: FileList) {
      //console.log(archivosLista);

      // tslint:disable-next-line:forin
      for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
        const tempFile = archivosLista[propiedad];
        //console.log(tempFile);
        if (this._isFileCanUploaded(tempFile)) {
          const newFile = new FileItem(tempFile);
         // console.log('Se cumple la cond',newFile);
          this.files.push(newFile); 
        }
      }
      console.log(this.files);
  }

  // Validaciones
    
    private _isFileCanUploaded (file: File): boolean {
      if (!this._noDuplicated(file.name) && this._isImage(file.type)) {
        return true;
      } else {
        return false;
      }
    }

    private _prevDefault (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    private _noDuplicated ( fileName: string): boolean {
      for (const file of this.files) {
        if (file.fileName === fileName) {
          console.log('El Archivo ' + fileName + ' ya existe');
          return true;
        }
      }
      return false;
    }

    private _isImage (fileType: string): boolean {
      if (fileType === '' || fileType === undefined) {
        return false;
      } else {
        fileType.startsWith('image');
        return true;
      }
    } 


}
