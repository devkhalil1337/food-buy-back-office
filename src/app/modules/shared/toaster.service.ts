import { Injectable } from '@angular/core';
import { ToasterDefaults } from '@enums';

@Injectable()
export class ToasterService {

  constructor() { }

  private generateToaster(type: 'dark' | 'success' | 'error' | 'info' | 'warning', text: string, alwaysShow: boolean = false, timeOut?: number, closeWith?: string[], position?: string) {
    const notyConfig = {
      type: type,
      text: text,
      theme: ToasterDefaults.theme,
      timeout: alwaysShow ? null : (timeOut || ToasterDefaults.toasterTimeout),
      layout: position || ToasterDefaults.layout,
      closeWith: closeWith ? closeWith : ToasterDefaults.closeWith
    };
    return new Noty(notyConfig);
  }

  private generateInteractiveToaster(type: 'dark' | 'success' | 'error' | 'info' | 'warning', text: string, btnsConfig: any[], show: boolean = true): any {
    const notyConfig = {
      type: type,
      text: text,
      theme: ToasterDefaults.theme,
      layout: 'center',
      closeWith: [],
      modal: true,
      queue: ToasterDefaults.modalQueue,
      buttons: btnsConfig
    };
    const notyInstance = new Noty(notyConfig);
    if (show) {
      notyInstance.show();
    }
    return notyInstance;
  }

  success(message?: string): void {
    const template = `<i class="fa fa-check"></i>${message}`;
    this.generateToaster('success', template).show();
  }

  error(message?: any): void {
    let title = '';
    let description = '';
    if (typeof (message) === 'object') {
      if (Array.isArray(message.errorResponse)) {
        title = (message.errorResponse as any[]).reduce((arr, value) => {
          if (value && value.message) {
            arr.push(value.message);
          }
          return arr;
        }, []).join('<br/>');
      } else {
        title = message.title;
        description = message.description || message.message;
      }
    } else {
      title = message;
    }
    let template = `<div><i class="fa fa-times-circle mr-1"></i><span>${title}</span></div>`;
    if (description) {
      template += `<div class="text-12 pt-2">${description}<div>`;
    }
    this.generateToaster('error', template).show();
  }

  timedError(message?: any, timeOut?: number): void {
    let title = '';
    let description = '';
    if (typeof (message) === 'object') {
      if (Array.isArray(message.errorResponse)) {
        title = (message.errorResponse as any[]).reduce((arr, value) => {
          if (value && value.message) {
            arr.push(value.message);
          }
          return arr;
        }, []).join('<br/>');
      } else {
        title = message.title;
        description = message.description || message.message;
      }
    } else {
      title = message;
    }
    let template = `<div><i class="fa fa-times-circle mr-1"></i><span>${title}</span></div>`;
    if (description) {
      template += `<div class="text-12 pt-2">${description}<div>`;
    }
    this.generateToaster('error', template, false, timeOut).show();
  }

  warn(response: any): void {
    let message = response;
    if (Array.isArray(response)) {
      message = (response as any[]).reduce((arr, value) => {
        if (value && value.message) {
          arr.push(value.message);
        }
        return arr;
      }, []).join('<br/>');
    }
    const template = `<i class="fa fa-exclamation-triangle"></i><span>${message}</span>`;
    this.generateToaster('warning', template).show();
  }

  info(message: string): void {
    const template = `<i class="fa fa-info-circle"></i><span>${message}</span>`;
    this.generateToaster('info', template).show();
  }

  inProgress(message: string, alwaysShow: boolean = true): any {
    const template = `<div class="text-center"><div class="mb-3">${message}</div><i class="fa fa-spin fa-spinner fa-3x"></i></div>`;
    const notyInstance = this.generateToaster('info', template, alwaysShow, alwaysShow ? null : ToasterDefaults.exportToasterTimeout, ToasterDefaults.exportCloseWith);
    notyInstance.show();
    return notyInstance;
  }

  importResponse(type: 'dark' | 'success' | 'error' | 'info' | 'warning', message: string): any {
    let template = '<div class="noty_close"><div>';
    if (type === 'warning') {
      template += `<i class="fa fa-exclamation-triangle"></i><span>${message}</span>`;
    } else {
      template += `<span>${message}</span>`;
    }

    const notyInstance = this.generateToaster(type, template, true, null, ToasterDefaults.exportCloseWith);
    notyInstance.show();
    return notyInstance;
  }

  confirm(prop: any): void {
    const btnCls = (prop.confirmCls ? prop.confirmCls : 'danger');
    const notyInstance = this.generateInteractiveToaster('info', prop.text, [
      Noty.button('Cancel', 'btn btn-default', () => {
        notyInstance.close();
        if (prop.onClose) {
          prop.onClose();
        }
      }),
      Noty.button('Confirm', `btn btn-${btnCls}`, () => {
        notyInstance.close();
        prop.onConfirm();
      })
    ]);
  }

  disclaimer(text: string): void {
    const notyInstance = this.generateInteractiveToaster('info', text, [
      Noty.button('OK', `btn btn-default`, () => notyInstance.close())
    ]);
  }

}
