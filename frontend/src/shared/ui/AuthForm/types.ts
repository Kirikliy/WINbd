import {EventHandler, FormEvent, ReactNode} from 'react';

export type Props = {
	onSubmit: EventHandler<FormEvent>;
	children: ReactNode;
	title: string;
};
