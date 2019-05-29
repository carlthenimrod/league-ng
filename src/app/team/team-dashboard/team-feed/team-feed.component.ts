import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Message } from '@app/models/team';
import { TeamSocketService } from '@app/services/team-socket.service';
import { TeamFeedService } from '@app/services/team-feed.service';
import { SocketData } from '@app/models/socket';

@Component({
  selector: 'app-team-feed',
  templateUrl: './team-feed.component.html',
  styleUrls: ['./team-feed.component.scss']
})
export class TeamFeedComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
  @ViewChild('feedList') feedList: ElementRef;
  @Input() feed: Message[];
  feedSub: Subscription;
  messageForm = this.fb.group({
    body: ['', Validators.required]
  });
  messageCount;

  constructor(
    private fb: FormBuilder,
    private teamFeed: TeamFeedService,
    private teamSocket: TeamSocketService
  ) { }

  ngOnInit() {
    this.feedSub = this.teamSocket.feed$().subscribe((data: SocketData) => {
      switch (data.action) {
        case 'new': {
          this.feed.push(data.message);
          break;
        }
        case 'edit': {
          const index = this.feed.findIndex(m => m._id === data.message._id);
          this.feed[index] = data.message;
          break;
        }
        case 'remove': {
          const index = this.feed.findIndex(m => m._id === data.message._id);
          this.feed.splice(index, 1);
          break;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.messageCount = this.feed.length;
    this.scrollDown();
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

  onSubmit() {
    const body = this.messageForm.value.body.trim();
    this.messageForm.patchValue({body});

    if (!this.messageForm.valid) { return; }

    const message: Message = {
      type: 'message',
      body: this.messageForm.value.body
    };

    this.messageForm.reset();

    this.teamFeed
      .send(message)
      .subscribe((newMessage: Message) => {
        this.feed.push(newMessage);
        this.scrollDown();
      });
  }

  ngOnDestroy() {
    this.feedSub.unsubscribe();
  }
}
