import { resources, defaultNS } from './consts';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['ru'];
  }
}
