// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiFipeUrl: 'https://parallelum.com.br/fipe/api/v1/',
  apiBCBUrl: 'https://www.bcb.gov.br/api/servico/sitebcb/historicotaxajurosdiario/',
  apiBCBPeriodosUrl: 'https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v1/odata/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
