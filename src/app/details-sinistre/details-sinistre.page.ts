import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SinistreService } from '../services/sinistre/sinistre.service';
import { Router } from '@angular/router';
import Config from '../configs';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { ContractsService } from '../services/contracts/contracts.service';

@Component({
  selector: 'app-details-sinistre',
  templateUrl: './details-sinistre.page.html',
  styleUrls: ['./details-sinistre.page.scss'],
})
export class DetailsSinistrePage implements OnInit {
  public sinistreId: any;
  public contractId: any;
  public sinistre: any;
  public serverurl = Config.serverUrl;
  public sinisterFiles = {docs: [], images: [], video: null};
  public offer = null;
  public contract: any;
  private vieStatus = ["Déclaré", "En cours", "Validé", "Paiement disponible", "Clôturé"];
  private nonVieStatus = ["Déclaré", "Pieces complémentaires attendues", "Expert mandaté", "Bon de prise en charge délivré", "Offre disponible"];
  constructor(private previewAnyFile: PreviewAnyFile, private contractsService: ContractsService, private activatedRoute: ActivatedRoute, private sinistreService: SinistreService, private router: Router) {
    this.sinistreId = this.activatedRoute.snapshot.paramMap.get('sinistreId');
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
    this.loadSinistre();
    this.loadContract();
   }

  ngOnInit() {
  }

  async loadSinistre() {
    this.sinistre = await this.sinistreService.loadSinistre(this.sinistreId);
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

  // goBack() {
  //   this.router.
  // }

  showMe(filePath) {
    this.previewAnyFile.preview(filePath)
  .then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
  }

  chooseAnswer(event) {
    this.offer = event.detail.value;
  }

  respondOffer(form) {
    const res = this.sinistreService.respondOffer(form.form.value, this.sinistre.id, this.contractId, this.contract.contract_infos.id);
  }

  activateMeVie(elt) {
    let ind = this.vieStatus.indexOf(elt);
    let index = this.vieStatus.indexOf(this.sinistre.statut);
    // console.log(this.sinistre.statut);
    // console.log(elt);
    // console.log(ind <= index);
    return (ind <= index || index === -1) ? true : false;
  }

  activateMeNonVie(elt) {
    let ind = this.nonVieStatus.indexOf(elt);
    let index = this.nonVieStatus.indexOf(this.sinistre.statut);
    return (ind <= index || index === -1) ? true : false;
  }

}
