import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { tap, debounceTime, takeUntil } from 'rxjs/operators';

import { AuthService } from '@app/auth/auth.service';
import { Message } from '@app/models/team';
import { UserSocketData } from '@app/models/socket';
import { User } from '@app/models/user';

@Component({
  selector: 'app-team-feed',
  templateUrl: './team-feed.component.html',
  styleUrls: ['./team-feed.component.scss']
})
export class TeamFeedComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
  @ViewChild('feedList', { static: false }) feedList: ElementRef;
  @ViewChild('input', { static: false }) input: ElementRef;
  @Input() feed: Message[];
  userId: string;
  typing = false;
  usersTyping: string;
  messageForm = this.fb.group({
    body: ['', Validators.required]
  });
  messageCount;
  unsubscribe$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.auth.me$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(me => this.userId = me._id);

    // this.teamSocket.feed$()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((data: UserSocketData) => {
    //     switch (data.action) {
    //       case 'new': {
    //         this.feed.push(data.message);
    //         break;
    //       }
    //       case 'edit': {
    //         const index = this.feed.findIndex(m => m._id === data.message._id);
    //         this.feed[index] = data.message;
    //         break;
    //       }
    //       case 'remove': {
    //         const index = this.feed.findIndex(m => m._id === data.message._id);
    //         this.feed.splice(index, 1);
    //         break;
    //       }
    //     }
    //   });

    // this.teamSocket.typing$()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((data: UserSocketData) => {
    //     this.formatTypingMessage(data.users);
    //   });
  }

  ngAfterViewInit() {
    this.messageCount = this.feed.length;
    this.scrollDown();

    fromEvent(this.input.nativeElement, 'input').pipe(
      tap(() => {
        const value = this.input.nativeElement.value;

        if (value !== '') {
          this.isTyping(true);
        } else if ((value === '') && (this.typing)) {
          this.isTyping(false);
        }
      }),
      debounceTime(3000)
    ).subscribe(() => this.isTyping(false));
  }

  ngAfterViewChecked() {
    if (this.feed.length !== this.messageCount) {
      this.messageCount = this.feed.length;
      this.scrollDown();
    }
  }

  scrollDown() {
    const el = <HTMLElement>this.feedList.nativeElement;

    el.scrollTop = el.scrollHeight;
  }

  isTyping(typing: boolean) {
    if (typing !== this.typing) {
      this.typing = typing;
      // this.teamFeed.isTyping(this.typing);
    }
  }

  formatTypingMessage(users: User[]) {
    const index = users.findIndex(u => u._id === this.userId);
    if (index !== -1) { users.splice(index, 1); }

    switch (users.length) {
      case 0: {
        this.usersTyping = '';
        break;
      }
      case 1: {
        this.usersTyping = `${users[0].fullName} is typing...`;
        break;
      }
      case 2: {
        this.usersTyping = `${users[0].name.first} and ${users[1].name.first} are typing...`;
        break;
      }
      case 3: {
        this.usersTyping = `${users[0].name.first}, ${users[1].name.first}, and ${users[2].name.first} are typing...`;
        break;
      }
      default: {
        this.usersTyping = 'Several users are typing...';
      }
    }
  }

  onSubmit() {
    let body = this.messageForm.value.body;
    if (body) {
      body = body.trim();
      this.messageForm.patchValue({body});
    }

    if (!this.messageForm.valid) { return; }

    const message: Message = {
      type: 'message',
      body: this.messageForm.value.body
    };

    this.messageForm.reset();

    if (this.typing) {
      this.typing = false;
      // this.teamFeed.isTyping(this.typing);
    }

    // this.teamFeed.send(message)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((newMessage: Message) => {
    //     this.feed.push(newMessage);
    //     this.scrollDown();
    //   });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
