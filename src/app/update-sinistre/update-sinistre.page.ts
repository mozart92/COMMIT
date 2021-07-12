import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SinistreService } from '../services/sinistre/sinistre.service';
import { Router } from '@angular/router';
import Config from '../configs';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { ContractsService } from '../services/contracts/contracts.service';
import { FileService } from '../services/files/file.service';

@Component({
  selector: 'app-update-sinistre',
  templateUrl: './update-sinistre.page.html',
  styleUrls: ['./update-sinistre.page.scss'],
})
export class UpdateSinistrePage implements OnInit {
  public sinistreId: any;
  public contractId: any;
  public sinistre: any;
  public contract: any;
  public serverurl = Config.serverUrl;
  public sinisterFiles = {docs: [], images: [], video: null};
  public contentTitle = 'champs';
  public myFiles: any = [];
  public myImages: any = [];
  public myVideo: any = [];
  public dommage = false;
  public permis = false;
  public todays = new Date().toISOString();
  constructor(private previewAnyFile: PreviewAnyFile, private fileService: FileService, private activatedRoute: ActivatedRoute, private sinistreService: SinistreService, private router: Router, private contractsService: ContractsService) {
    this.sinistreId = this.activatedRoute.snapshot.paramMap.get('sinistreId');
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
    this.loadSinistre();
    this.loadContract();
  }

  ngOnInit() {
  }

  async loadSinistre() {
    this.sinistre = await this.sinistreService.loadSinistre(this.sinistreId);
    this.dommage = this.sinistre.has_dommage === 1 ? true : false;
    this.permis = this.sinistre.has_permis_conduire === 1 ? true : false;
    for(let docu of this.sinistre.documents) {
      if (docu.designation === 'document') {
        this.sinisterFiles.docs.push(docu);
      }else if(docu.designation === 'image') {
        this.sinisterFiles.images.push(docu);
      }else {
        this.sinisterFiles.video = docu;
      }
    }
    console.log(this.sinistre);
  }

  async loadContract() {
    this.contract = await this.contractsService.loadContract(this.contractId);
  }

  segmentChanged(ev: any) {
    this.contentTitle = ev.detail.value;
    console.log('Segment changed', ev);
  }


  sinitreNonVie(formNonVie) {
    console.log(formNonVie.form.value);
    if(this.myImages.length > 0){
      this.myFiles = this.myFiles.concat(this.myImages);
    }
    if(this.myVideo.length > 0){
      this.myFiles = this.myFiles.concat(this.myVideo);
    }
    const res = this.sinistreService.updateSinistre(this.contract.contract_infos.id, this.contract.type, this.contractId, this.sinistre.id, formNonVie.form.value, this.myFiles);
  }

  sinitreVie(formVie) {
    console.log(formVie.form.value);
    const res = this.sinistreService.updateSinistre(this.contract.contract_infos.id, this.contract.type, this.contractId, this.sinistre.id, formVie.form.value, this.myFiles);
  }

  async chooseFile() {
    this.myFiles = [];
    this.myFiles = await this.fileService.select('text', [".pdf"], true);
    if(this.myFiles.length > 6){
      this.myFiles = this.myFiles.splice(0, 6);
    }
    console.log(this.myFiles);
  }

  async chooseImage() {
    this.myImages = [];
    this.myImages = await this.fileService.select('image', [".jpg", ".jpeg", ".gif", ".png"], true);
    if(this.myImages.length > 6){
      this.myImages = this.myImages.splice(0, 6);
    } 
    console.log(this.myImages);
  }

  async chooseVideo() {
    this.myVideo = [];
    this.myVideo = await this.fileService.select('video', ["videos"], false);
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

  showMe(filePath) {
    this.previewAnyFile.preview(filePath)
  .then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
  }

  getRealValue(value) {
    return value === 1 ? true : false;
  }

}
