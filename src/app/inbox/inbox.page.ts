import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages/messages.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  public conversations: any;
  constructor(public messagesService: MessagesService) {
    this.retrieveConversations();
   }

  ngOnInit() {
  }

  async retrieveConversations() {
    this.conversations = await this.messagesService.loadConversations();
    console.log(this.conversations);
  }

}
