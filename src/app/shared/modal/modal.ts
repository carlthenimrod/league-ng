import { Injector, InjectionToken } from '@angular/core';

export interface ModalConfig {
  data?: any;
  injector?: Injector;
}

export const MODAL_DATA = new InjectionToken<any>('modal.data');
