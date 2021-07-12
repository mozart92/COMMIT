import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages/messages.service';
import { FileService } from '../services/files/file.service';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.page.html',
  styleUrls: ['./ask-question.page.scss'],
})
export class AskQuestionPage implements OnInit {

  public themes: any;
  public sub_themes: any = [];
  public sub_theme: any;
  public myFiles: any[];
  constructor(public messagesService: MessagesService, public fileService: FileService, public previewAnyFile: PreviewAnyFile, private translateService: TranslateService) { 
    this.getThemes();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getThemes();
    })
  }

  ngOnInit() {
  }

  async getThemes() {
    this.themes = await this.messagesService.loadThemes();
  }

  setSubTheme(event) {
    for (const theme of this.themes) {
      if(theme.id.toString() === event.detail.value){
        this.sub_themes = theme.children;
        this.sub_theme = null;
        console.log(theme);
        break;
      }
    }
    console.log(event.detail.value);
  }

  getTheme(event) {
    for (const theme of this.sub_themes) {
      if(theme.id.toString() === event.detail.value){
        this.sub_theme = theme;
        console.log(theme);
        break;
      }
    }
    console.log(event.detail.value);
  }

  async chooseFile() {
    this.myFiles = [];
    this.myFiles = await this.fileService.select('text', ["pdf", "doc", "docx", "xls", "xlsx"], true);
    if(this.myFiles.length > 6){
      this.myFiles = this.myFiles.splice(0, 6);
    }
    console.log(this.myFiles);
  }

  async askPrestation(form) {
    let res = await this.messagesService.sendMessage(form.form.value, this.sub_theme, null, this.myFiles);
  }

  showMe(filePath) {
    this.previewAnyFile.preview(filePath)
  .then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
  }

}
