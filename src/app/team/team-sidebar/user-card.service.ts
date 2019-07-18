import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  ComponentRef,
  ViewContainerRef,
  ViewRef
} from '@angular/core';

import { User } from '@app/models/user';
import { UserCardComponent } from './user-card/user-card.component';


@Injectable()
export class UserCardService {
  componentRef: ComponentRef<UserCardComponent>;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  open(user: User, viewRef: ViewContainerRef) {
    if (this.componentRef) { this.close(); }

    const factory = this.resolver.resolveComponentFactory(UserCardComponent);

    this.componentRef = viewRef.createComponent(factory);
    this.componentRef.instance.user = user;

    this.componentRef.instance.close.subscribe(close => {
      if (close) { this.close(); }
    });
  }

  close() {
    this.componentRef.destroy();
    delete this.componentRef;
  }
}
