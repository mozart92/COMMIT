import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from '../services/messages/messages.service';
import { StorageService } from '../services/storage/storage.service';
import { IonContent } from '@ionic/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  public conv: any;
  public convId: any;
  public userId: any;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  constructor(public messagesService: MessagesService, public activatedRoute: ActivatedRoute, public storageService: StorageService, private translateService: TranslateService) {
    this.convId = this.activatedRoute.snapshot.paramMap.get('conversationId');
    this.loadUser();
    this.retrieveConv();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.retrieveConv();
    })
   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log();
    this.ScrollToBottom() ;
  }

  async retrieveConv() {
    this.conv = await this.messagesService.loadConversation(this.convId);
    if(this.conv.non_lus > 0){
      this.markAsRead();
    }
  }

  async loadUser() {
    let user = await this.storageService.getObject('user');
    this.userId = user.infos.id;
  }

  async markAsRead() {
    await this.messagesService.markMessagesRead(this.convId);
  }

  ScrollToBottom() {
    this.content.scrollToBottom(1500);
  }

}
