import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'country',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule),
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contract-menu/:contractId',
    loadChildren: () => import('./contract-menu/contract-menu.module').then( m => m.ContractMenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contract-details/:contractId',
    loadChildren: () => import('./contract-details/contract-details.module').then( m => m.ContractDetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contract-update/:contractId',
    loadChildren: () => import('./contract-update/contract-update.module').then( m => m.ContractUpdatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'all-contract-update/:contractId',
    loadChildren: () => import('./all-contract-update/all-contract-update.module').then( m => m.AllContractUpdatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sinistres/:contractId',
    loadChildren: () => import('./sinistres/sinistres.module').then( m => m.SinistresPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'declaration-sinistre/:contractId',
    loadChildren: () => import('./declaration-sinistre/declaration-sinistre.module').then( m => m.DeclarationSinistrePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details-sinistre/:sinistreId/:contractId',
    loadChildren: () => import('./details-sinistre/details-sinistre.module').then( m => m.DetailsSinistrePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'all-sinistres',
    loadChildren: () => import('./all-sinistres/all-sinistres.module').then( m => m.AllSinistresPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'update-sinistre/:sinistreId/:contractId',
    loadChildren: () => import('./update-sinistre/update-sinistre.module').then( m => m.UpdateSinistrePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'prestations/:contractId',
    loadChildren: () => import('./prestations/prestations.module').then( m => m.PrestationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'all-prestations',
    loadChildren: () => import('./all-prestations/all-prestations.module').then( m => m.AllPrestationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'request-prestations/:contractId',
    loadChildren: () => import('./request-prestations/request-prestations.module').then( m => m.RequestPrestationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details-prestation/:prestationId/:contractId',
    loadChildren: () => import('./details-prestation/details-prestation.module').then( m => m.DetailsPrestationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'update-prestations/:prestationId/:contractId',
    loadChildren: () => import('./update-prestations/update-prestations.module').then( m => m.UpdatePrestationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then( m => m.InboxPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'conversation/:conversationId',
    loadChildren: () => import('./conversation/conversation.module').then( m => m.ConversationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'prestataire-map',
    loadChildren: () => import('./prestataire-map/prestataire-map.module').then( m => m.PrestataireMapPageModule)
  },
  {
    path: 'details-prestataire',
    loadChildren: () => import('./details-prestataire/details-prestataire.module').then( m => m.DetailsPrestatairePageModule)
  },
  {
    path: 'pos-map',
    loadChildren: () => import('./pos-map/pos-map.module').then( m => m.PosMapPageModule)
  },
  {
    path: 'details-pos',
    loadChildren: () => import('./details-pos/details-pos.module').then( m => m.DetailsPosPageModule)
  },
  {
    path: 'ask-question',
    loadChildren: () => import('./ask-question/ask-question.module').then( m => m.AskQuestionPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.module').then( m => m.CountryPageModule)
  },
  {
    path: 'all-produits',
    loadChildren: () => import('./all-produits/all-produits.module').then( m => m.AllProduitsPageModule)
  },
  {
    path: 'details-produit/:product_id',
    loadChildren: () => import('./details-produit/details-produit.module').then( m => m.DetailsProduitPageModule)
  },
  {
    path: 'details-publicite/:pub_id',
    loadChildren: () => import('./details-publicite/details-publicite.module').then( m => m.DetailsPublicitePageModule)
  },
  {
    path: 'devis/:product_id',
    loadChildren: () => import('./devis/devis.module').then( m => m.DevisPageModule)
  },
  {
    path: 'product-devis',
    loadChildren: () => import('./product-devis/product-devis.module').then( m => m.ProductDevisPageModule)
  },
  {
    path: 'devis-result',
    loadChildren: () => import('./devis-result/devis-result.module').then( m => m.DevisResultPageModule)
  },
  {
    path: 'stripe-payment/:montant/:devise/:devis_id',
    loadChildren: () => import('./stripe-payment/stripe-payment.module').then( m => m.StripePaymentPageModule)
  },
  {
    path: 'actualite',
    loadChildren: () => import('./actualite/actualite.module').then( m => m.ActualitePageModule)
  },
  {
    path: 'details-actualite/:idnews',
    loadChildren: () => import('./details-actualite/details-actualite.module').then( m => m.DetailsActualitePageModule)
  },
  {
    path: 'all-devis',
    loadChildren: () => import('./all-devis/all-devis.module').then( m => m.AllDevisPageModule)
  },
  {
    path: 'details-devis/:id_devis',
    loadChildren: () => import('./details-devis/details-devis.module').then( m => m.DetailsDevisPageModule)
  },
  {
    path: 'afrikpay/:montant/:devise/:devis_code',
    loadChildren: () => import('./afrikpay/afrikpay.module').then( m => m.AfrikpayPageModule)
  },
  {
    path: 'prime-history/:contract_num',
    loadChildren: () => import('./prime-history/prime-history.module').then( m => m.PrimeHistoryPageModule)
  },
  {
    path: 'prime-paiement/:contract_num',
    loadChildren: () => import('./prime-paiement/prime-paiement.module').then( m => m.PrimePaiementPageModule)
  },
  {
    path: 'renew-history/:contract_num',
    loadChildren: () => import('./renew-history/renew-history.module').then( m => m.RenewHistoryPageModule)
  },
  {
    path: 'renew-paiement/:contract_num',
    loadChildren: () => import('./renew-paiement/renew-paiement.module').then( m => m.RenewPaiementPageModule)
  },  {
    path: 'second-activation',
    loadChildren: () => import('./second-activation/second-activation.module').then( m => m.SecondActivationPageModule)
  }

















];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {} 
