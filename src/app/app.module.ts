import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormBuilder } from '@angular/forms';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

import { ChooseContractComponent } from './components/choose-contract/choose-contract/choose-contract.component';
import { PrestationComponent } from './components/prestations/prestation/prestation.component';
import { PrestataireFilterComponent } from './components/prestataire-filter/prestataire-filter/prestataire-filter.component';
import { AvenantPopoverComponent } from './components/avenant-popover/avenant-popover/avenant-popover.component';
import { AvenantDetailsComponent } from './components/avenant-details/avenant-details/avenant-details.component';
import { FormsModule } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ThemeableBrowser } from '@ionic-native/themeable-browser/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Globalization } from '@ionic-native/globalization/ngx';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}


@NgModule({
  declarations: [AppComponent, ChooseContractComponent, PrestationComponent, PrestataireFilterComponent, AvenantDetailsComponent, AvenantPopoverComponent],
  entryComponents: [ChooseContractComponent, PrestationComponent, PrestataireFilterComponent, AvenantDetailsComponent, AvenantPopoverComponent],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FormBuilder,
    FileChooser,
    FileTransfer,
    HTTP,
    PreviewAnyFile,
    InAppBrowser,
    ThemeableBrowser,
    SpinnerDialog,
    Stripe,
    Globalization,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
