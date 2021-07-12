import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import { PrestationService } from '../services/prestation/prestation.service';
import { FileService } from '../services/files/file.service';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-request-prestations',
  templateUrl: './request-prestations.page.html',
  styleUrls: ['./request-prestations.page.scss'],
})
export class RequestPrestationsPage implements OnInit {
  public contractId: any;
  public contract: any;
  public contentTitle = 'champs';
  public myFiles: any;
  public typePrest = null;
  public months = [1,2,3,4,5,6,7,8,9,10,11];
  public icones = Config.icones;
  constructor(private previewAnyFile: PreviewAnyFile, private translateService: TranslateService, private activatedRoute: ActivatedRoute, private contractsService: ContractsService, private prestationService: PrestationService, private fileService: FileService) { 
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
    this.loadContract();
  }

  ngOnInit() {
  }

  async loadContract() {
    this.contract = await this.contractsService.loadContract(this.contractId);
    console.log(this.contract);
  }

  askPrestation(form) {
    console.log(form.form.value);
    const res = this.prestationService.recordPrestation(this.contract.contract_infos.id, this.contractId, form.form.value, this.myFiles);
  }

  async chooseFile(multiple) {
    this.myFiles = [];
    this.myFiles = await this.fileService.select('text', ["pdf", "doc", "docx", "xls", "xlsx"], multiple);
    if(this.myFiles.length > 2){
      this.myFiles = this.myFiles.splice(0, 2);
    }
    console.log(this.myFiles);
  }

  setTypeTrans(event) {
    this.typePrest = event.detail.value;
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

}
