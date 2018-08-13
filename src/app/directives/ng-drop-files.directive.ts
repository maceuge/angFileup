import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-items';
import { SrvRecord } from 'dns';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();
  @Input() file: FileItem[] = [];
  
  constructor() { }
  
  // Eventos del mouse sobre
  @HostListener('dragover', ['$event'])
  public onDragEnter (event: any) {
      this.mouseOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave (event: any) {
      this.mouseOver.emit(false);
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
      for (const file of this.file) {
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
      }
    } 


}
