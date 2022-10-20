// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  edc1ApiBaseUrl: 'https://trace-consumer-controlplane.dev.demo.ftcpro.co/',
  edc2ApiBaseUrl: 'https://consumer-controlplane.dev.demo.ftcpro.co/',
  edc3ApiBaseUrl: 'https://consumer-controlplane-3.dev.demo.ftcpro.co/',
  edc4ApiBaseUrl: 'https://consumer-controlplane-4.dev.demo.ftcpro.co/',

  edc1TraceUrl: 'https://trace-1.dev.demo.ftcpro.co/',
  edc2TraceUrl: 'https://trace-2.dev.demo.ftcpro.co/',
  edc3TraceUrl: 'https://trace-3.dev.demo.ftcpro.co/',
  edc4TraceUrl: 'https://trace-4.dev.demo.ftcpro.co/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
