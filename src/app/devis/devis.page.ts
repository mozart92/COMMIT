import { Component, OnInit } from '@angular/core';
import { DevisService } from '../services/devis/devis.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
 
@Component({
 selector: 'app-devis',
 templateUrl: './devis.page.html',
 styleUrls: ['./devis.page.scss'],
})
export class DevisPage implements OnInit {
  public myDynamForm: any;
 public myTextForm: any = {};
 public subsForm: any;
 public byApi: any;
 public is_sante: any;
 public first_repeat: any;
 public second_repeat: any;
 public message: any;
 public special_values_json: any = {};
 public special_values: any = [];
 public number_err_mess = null;
 public produit_id:any = [
   {
     label: 'Nom',
     name: 'nom',
     type: 'text',
     placeholder: 'Your name please',
     required: 'required'       
   },
   {
     label: 'Age',
     name: 'age',
     type: 'number',
     placeholder: 'Your age',
     required: 'required',
     min: 15,
     max: 100       
   }
 ];
 public min_max_valid = true;
 constructor(public activatedRoute: ActivatedRoute, public translateService: TranslateService, public devisService: DevisService, public storageService: StorageService) {
   this.produit_id = this.activatedRoute.snapshot.paramMap.get('product_id');
  }
 
 ngOnInit() {
   this.produit_id = this.activatedRoute.snapshot.paramMap.get('product_id');
   this.getFormFields(this.produit_id);
 }
 
 async getFormFields(prod_id) {
   let logged = await this.storageService.getItem('logged');
   let type_user = (logged==="true") ? 'client' : 'visiteur';
   let result = await this.devisService.getDevisForm(prod_id, type_user);
   this.myDynamForm = result.formulaire;
   this.subsForm = result.form_souscription;
   this.byApi = result.par_api === "oui";
   this.is_sante = result.sante === 1;
   this.message = result.message;
   console.log('the user type is: '+type_user);
   console.log(this.is_sante);
 }
 
 splitString(texte, marker) {
  return texte.split(marker);
}
 
 async demandeDevis(form) {
   console.log(form.form.value);
   console.log(this.myTextForm);
   let logged = await this.storageService.getItem('logged');
   let type_user = (logged==="true") ? 'client' : 'visiteur';
   await this.devisService.estimate(form.form.value, this.produit_id, type_user, this.myTextForm);
 }
 
 async demandeDevisApi(form) {
   console.log(form);
   console.log(this.myTextForm);
   let logged = await this.storageService.getItem('logged');
   let type_user = (logged==="true") ? 'client' : 'visiteur';
   await this.devisService.estimate(form.form.value, this.produit_id, type_user, this.myTextForm);
 }
 
 async demandeDevisSante(form) {
   console.log(form);
   console.log(this.myTextForm);
   let logged = await this.storageService.getItem('logged');
   let type_user = (logged==="true") ? 'client' : 'visiteur';
   await this.devisService.estimate(form.form.value, this.produit_id, type_user, this.myTextForm);
 }
 
 captureGarantieValue(event, field_name) {
   console.log(event.detail.value);
   console.log(field_name);
   let choosen_value = [];
   for(let val of event.detail.value){
     for(let cover of this.myDynamForm.Coverages) {
       if(cover.CoverageCode === val){
         choosen_value.push(cover.CoverageName_FR);
         break;
       }
     }
   }
   this.myTextForm[field_name] = choosen_value;
   console.log(choosen_value);
 }
 
 captureListValue(event, field_name) {
   console.log(event);
   console.log(field_name);
   let choosen_value = null;
   for(let field of this.myDynamForm.FormControls) {
     if(field.FormControlCode === field_name){
       for(let option of field.Options) {
         if(option.Code === event.detail.value){
           choosen_value = option.Name;
           break;
         }
       }
       break;
     }
   }
   this.myTextForm[field_name] = choosen_value;
   console.log(choosen_value);
 }
 
 captureValue(event, field_name, field=null) {
   this.myTextForm[field_name] = event.detail.value;
   if(field && !field.is_special_list) {
     if(field && (event.detail.value >= field.min) && (event.detail.value <= field.max)){
       console.log("min and max respected");
       this.min_max_valid = true;
     }else{
       console.log("min and max not respected");
       this.min_max_valid = false;
     }
   }else if(field && field.is_special_list){
     this.special_values_json[field_name] = event.detail.value;
     let my_arr = [];
     for(let key in this.special_values_json){
       my_arr.push(this.special_values_json[key]);
     }
     this.special_values = my_arr;
     console.log(this.special_values);
   }
 }
 
 repeatFields(event, field_name, field=null){
   if(field) {
     if(field && (event.detail.value >= field.min) && (event.detail.value <= field.max)){
       console.log("min and max respected");
       this.min_max_valid = true;
       this.number_err_mess = null;
       let limit = parseInt(event.detail.value);
       let arr = [];
       for(let i=0; i<limit; i++) {
         arr.push(i)
       }
       this.first_repeat = arr;
       this.captureValue(event, field_name);
     }else{
       console.log("min and max not respected");
       this.min_max_valid = false;
       this.number_err_mess = field.libelle + " doit etre compris entre " + field.min +" et "+ field.max;
     }
   }
 }
 
 repeatSndFields(event, field_name, field=null){
   if(field) {
     if(field && (event.detail.value >= field.min) && (event.detail.value <= field.max)){
       console.log("min and max respected");
       this.min_max_valid = true;
       this.number_err_mess = null;
       let limit = parseInt(event.detail.value);
       let arr = [];
       for(let i=0; i<limit; i++) {
         arr.push(i)
       }
       this.second_repeat = arr;
       this.captureValue(event, field_name);
     }else{
       console.log("min and max not respected");
       this.min_max_valid = false;
       this.number_err_mess = field.libelle + " doit etre compris entre " + field.min +" et "+ field.max;
     }
   }
 }
 
}
 

