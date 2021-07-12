import { Component, OnInit } from '@angular/core';
import { InfosService } from '../services/infos/infos.service';
import Config  from '../configs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-actualite',
  templateUrl: './details-actualite.page.html',
  styleUrls: ['./details-actualite.page.scss'],
})
export class DetailsActualitePage implements OnInit {
  
  private news_id: any;
  public news: any;
  public serverUrl = Config.serverUrl;
  constructor(public activatedRoute: ActivatedRoute, private infosService: InfosService) {
    this.news_id = this.activatedRoute.snapshot.paramMap.get('idnews');
    this.getNews();
   }

  ngOnInit() {
  }

  async getNews() {
    this.news = await this.infosService.findNews(this.news_id);
    console.log(this.news);
  }

}
