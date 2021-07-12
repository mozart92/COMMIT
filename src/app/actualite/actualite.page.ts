import { Component, OnInit } from '@angular/core';
import { InfosService } from '../services/infos/infos.service';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.page.html',
  styleUrls: ['./actualite.page.scss'],
})
export class ActualitePage implements OnInit {
  
  public allNews: any;
  public serverUrl = Config.serverUrl;
  constructor(private infosService: InfosService, private translateService: TranslateService) { 
    this.getNews();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getNews();
    })
  }

  ngOnInit() {
  }

  async getNews() {
    this.allNews = await this.infosService.loadNews();
    console.log(this.allNews);
  }

}
