import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import { SinistreService } from '../services/sinistre/sinistre.service';
import { FileService } from '../services/files/file.service';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import Config  from '../configs';
import { IonDatetime } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-declaration-sinistre',
  templateUrl: './declaration-sinistre.page.html',
  styleUrls: ['./declaration-sinistre.page.scss'],
})
export class DeclarationSinistrePage implements OnInit {
  public contractId: any;
  public contract: any;
  public dommage = false;
  public permis = false;
  public contentTitle = 'champs';
  public myFiles: any = [];
  public myImages: any = [];
  public myVideo: any = [];
  public icones = Config.icones;
  public todays = new Date().toISOString();
  public savedSinistre: any;
  constructor(private previewAnyFile: PreviewAnyFile, private translateService: TranslateService, private storageService: StorageService, private activatedRoute: ActivatedRoute, private contractsService: ContractsService, private sinistreService: SinistreService, private fileService: FileService) { 
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
    this.loadContract();
    console.log(this.todays);
    this.loadSavedSinistre();
   }

  ngOnInit() {
  }

  async loadContract() {
    this.contract = await this.contractsService.loadContract(this.contractId);
  }

  sinitreNonVie(formNonVie) {
    console.log(formNonVie.form.value);
    if(this.myImages.length > 0){
      this.myFiles = this.myFiles.concat(this.myImages);
    }
    if(this.myVideo.length > 0){
      this.myFiles = this.myFiles.concat(this.myVideo);
    }
    const res = this.sinistreService.recordSinistre(this.contract.contract_infos.id, this.contract.type, this.contractId, formNonVie.form.value, this.myFiles);
  }

  sinitreVie(formVie) {
    console.log(formVie.form.value);
    const res = this.sinistreService.recordSinistre(this.contract.contract_infos.id, this.contract.type, this.contractId, formVie.form.value, this.myFiles);
  }

  async chooseFile() {
    this.myFiles = [];
    this.myFiles = await this.fileService.select('text', ["pdf", "doc", "docx", "xls", "xlsx"], true);
    if(this.myFiles.length > 6){
      this.myFiles = this.myFiles.splice(0, 6);
    }
    console.log(this.myFiles);
  }

  async chooseImage() {
    this.myImages = [];
    this.myImages = await this.fileService.select('image', ["jpg", "jpeg", "gif", "png"], true);
    if(this.myImages.length > 6){
      this.myImages = this.myImages.splice(0, 6);
    } 
    console.log(this.myImages);
  }

  async chooseVideo() {
    this.myVideo = [];
    this.myVideo = await this.fileService.select('video', ["3gp", "mp4"], false);
    console.log(this.myVideo);
  }

  askDommage(event) {
    console.log(event.detail.value);
    this.dommage = event.detail.value === 'true' ? true : false;
  }

  requestPermis(event) {
    console.log(event.detail.value);
    this.permis = event.detail.value === 'true' ? true : false;
  }

  getDate() {
    return Date.now();
  }

  segmentChanged(ev: any) {
    this.contentTitle = ev.detail.value;
    console.log('Segment changed', ev);
  }

  showMe(filePath) {
    this.previewAnyFile.preview(filePath)
  .then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
  }

  async saveSinistre(form, contract) {
    await this.sinistreService.saveSinistre(form.form.value, contract);
  }

  async loadSavedSinistre() {
    let res = await this.sinistreService.getSavedSinistre();
    console.log(res);
    this.savedSinistre = res.contract.contract_infos.num_contrat === this.contract.contract_infos.num_contrat ? res.sinistre : null;
  }

}
