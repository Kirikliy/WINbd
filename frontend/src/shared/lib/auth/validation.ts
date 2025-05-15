import { string } from 'yup';
import i18n from '@/app/lib/i18n';

export const password = string().required(i18n.t('requiredField'));
// .min(6, i18n.t('minFieldLength', { length: 6 }))
// .max(12, i18n.t('maxFieldLength', { length: 12 }))
// .test(
//   'character',
//   i18n.t('validCharacters', { characters: '$@#&!' }),
//   (p = '') => !/[^a-z0-9$@#&!]/gi.test(p)
// )
// .test('uppercase', i18n.t('passwordShouldContainsUppercase'), (p = '') => /[A-Z]/.test(p))
// .test('lowercase', i18n.t('passwordShouldContainsLowercase'), (p = '') => /[a-z]/.test(p))
// .test('number', i18n.t('passwordShouldContainsNumber'), (p = '') => /[1-9]/.test(p));

export const login = string()
  .required(i18n.t('requiredField'))
  .min(4, i18n.t('minFieldLength', { length: 6 }));
// .max(12, i18n.t('maxFieldLength', { length: 12 }))
// .test(
//   'character',
//   i18n.t('validCharacters', { characters: '_' }),
//   (p = '') => !/[^a-z0-9_]/gi.test(p)
// );
