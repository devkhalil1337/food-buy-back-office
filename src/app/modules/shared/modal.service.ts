import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ConfigService } from './config.service';

@Injectable()
export class ModalService {

  constructor(private ngbModal: NgbModal, private configService: ConfigService) { }

  openModal(content: any, size?: 'sm' | 'md' | 'lg' | 'llg' | 'xl' | 'xxl', draggable: boolean = false, keyboardClose: boolean = false, windowClass: string = 'compact'): NgbModalRef {

    const ngbModalOptions: NgbModalOptions = this.configService.getNgbModalOptions(size, keyboardClose);
    if (windowClass) {
      ngbModalOptions.windowClass = windowClass;
    }

    const modalRef = this.ngbModal.open(content, ngbModalOptions);
    if (draggable) {
      const modalElement = (<any>$('.modal-content'));
      modalElement.draggable({ containment: 'document', handle: '.modal-header' });
    }
    return modalRef;
  }

}