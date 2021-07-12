import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AskQuestionPageRoutingModule } from './ask-question-routing.module';

import { AskQuestionPage } from './ask-question.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AskQuestionPageRoutingModule,
    TranslateModule
  ],
  declarations: [AskQuestionPage]
})
export class AskQuestionPageModule {}
