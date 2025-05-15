import {InitOptions} from 'i18next';

import enCommon from './en/common.json';
import ruCommon from './ru/common.json';

export const resources = {
	en: {
		translation: enCommon
	},
	ru: {
		translation: ruCommon
	}
} as const;

export const defaultNS = 'translation' as const;

export const DEFAULT_OPTIONS: InitOptions = {
	debug: false,
	fallbackLng: 'ru',
	defaultNS,
	resources
};
