import { Injectable, ComponentFactoryResolver, ComponentRef, OnDestroy, Inject, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Team } from '@app/models/team';
import { TeamInviteComponent } from './team-invite.component';

@Injectable()
export class TeamInviteService implements OnDestroy {
  componentRef: ComponentRef<TeamInviteComponent>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  open(team: Team) {
    if (this.componentRef) { this.close(); }

    const factory = this.resolver.resolveComponentFactory(TeamInviteComponent);

    this.componentRef = factory.create(this.injector);
    this.componentRef.instance.team = team;
    this.componentRef.instance.close.subscribe(close => {
      if (close) { this.close(); }
    });

    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<TeamInviteComponent>).rootNodes[0] as HTMLElement;

    this.document.body.append(domElem);
  }

  close() {
    if (!this.componentRef) { return; }

    this.appRef.detachView(this.componentRef.hostView);

    this.componentRef.destroy();
    delete this.componentRef;
  }

  ngOnDestroy() {
    this.close();
  }
}
