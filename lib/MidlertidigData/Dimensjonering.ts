import { CSSProperties } from 'styled-components';

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
	navn: LagNavn;
};

export const LagTyperFargeMap: Map<MaterialeType, CSSProperties['color']> = new Map([
	['Ab 16-70/100', 'black'],
	['Ab 11 - PMP', '#444F55'],
	['Ag 16-160/220', '#ECECEC'],
	['Fk 0/32', 'yellow'],
	['Kult 22/90', 'pink'],
]);

export const MaterialeListe: MaterialeType[] = [
	'Ab 16-70/100',
	'Ab 11 - PMP',
	'Ag 16-160/220',
	'Fk 0/32',
	'Kult 22/90',
];

export type LagNavn =
	| 'Bindelag'
	| 'Bærelag (øvre)'
	| 'Bærelag (øvre + nedre)'
	| 'Slitelag'
	| 'Forsterkningslag'
	| 'Frostsikringslag'
	| 'Fiberduk';

export type DimensjoneringsLagType =
	| 'Bindelag'
	| 'Bærelag'
	| 'Slitelag'
	| 'Forsterkningslag'
	| 'Frostsikringslag'
	| 'Fiberduk';
export const DimensjoneringsLagInitialState = new Map<DimensjoneringsLagType, LagType[]>([
	[
		'Slitelag',
		[
			{
				høyde: 45,
				color: 'red',
				materiale: 'Ab 11 - PMP',
				aktiv: true,
				navn: 'Slitelag',
			},
		],
	],
	[
		'Bindelag',
		[
			{
				høyde: 45,
				color: 'red',
				materiale: 'Ab 11 - PMP',
				aktiv: true,
				navn: 'Bindelag',
			},
		],
	],
	[
		'Bærelag',
		[
			{
				høyde: 50,
				color: 'yellow',
				materiale: 'Ab 16-70/100',
				aktiv: true,
				navn: 'Bærelag (øvre)',
			},
			{
				høyde: 100,
				color: 'pink',
				materiale: 'Ab 16-70/100',
				aktiv: true,
				navn: 'Bærelag (øvre + nedre)',
			},
		],
	],
	[
		'Forsterkningslag',
		[
			{
				høyde: 120,
				color: 'black',
				materiale: 'Kult 22/90',
				aktiv: true,
				navn: 'Forsterkningslag',
			},
		],
	],
	[
		'Frostsikringslag',
		[
			{
				høyde: 50,
				color: 'yellow',
				materiale: 'Ab 16-70/100',
				aktiv: false,
				navn: 'Frostsikringslag',
			},
		],
	],
	[
		'Fiberduk',
		[{ høyde: 50, color: 'yellow', materiale: 'Ab 16-70/100', aktiv: false, navn: 'Fiberduk' }],
	],
]);
