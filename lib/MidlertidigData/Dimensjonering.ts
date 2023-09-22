import { CSSProperties } from 'styled-components';
import { DimensjoneringProps } from '../../components/Eksperimenter/Dimensjonering.tsx';

export type MaterialeType =
	| 'Ab 16-70/100'
	| 'Ab 11 - PMP'
	| 'Ag 16-160/220'
	| 'Fk 0/32'
	| 'Kult 22/90';

export type LagType = {
	høyde: number;
	color: CSSProperties['color'];
	materiale: MaterialeType;
	aktiv: boolean;
	navn: string;
};

export const LagTyperFargeMap: Map<MaterialeType, CSSProperties['color']> = new Map([
	['Ab 16-70/100', 'black'],
	['Ab 11 - PMP', '#444F55'],
	['Ag 16-160/220', '#ECECEC'],
	['Fk 0/32', 'yellow'],
	['Kult 22/90', 'pink'],
]);

export const MaterialeListe = [
	'Ab 16-70/100',
	'Ab 11 - PMP',
	'Ag 16-160/220',
	'Fk 0/32',
	'Kult 22/90',
];

export const DimensjoneringInitialState: Pick<DimensjoneringProps, 'lagListe'> = {
	lagListe: [
		{
			høyde: 45,
			color: 'red',
			materiale: 'Ab 11 - PMP',
			aktiv: true,
			navn: 'Slitelag',
		},
		{ høyde: 45, color: 'aqua', materiale: 'Ab 16-70/100', aktiv: true, navn: 'Bindelag' },
		{ høyde: 100, color: 'pink', materiale: 'Ab 16-70/100', aktiv: true, navn: 'Øvre bærelag' },
		{ høyde: 50, color: 'yellow', materiale: 'Ab 16-70/100', aktiv: true, navn: 'Nedre bærelag' },
		{
			høyde: 120,
			color: 'black',
			materiale: 'Kult 22/90',
			aktiv: true,
			navn: 'Forsterkningslag',
		},
		{
			høyde: 50,
			color: 'yellow',
			materiale: 'Ab 16-70/100',
			aktiv: false,
			navn: 'Frostsikringslag',
		},
		{ høyde: 50, color: 'yellow', materiale: 'Ab 16-70/100', aktiv: false, navn: 'Fiberduk' },
	],
};
