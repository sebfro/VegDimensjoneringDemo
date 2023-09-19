import { LokalBildeMappe, LokalVegBilde, StatusType } from '../typer/OpplastingTyper.ts';
import { MappeOpplasting } from '../../components/atoms/MappeListe.tsx';
import { useCallback } from 'react';

export const useOpplastingHelpers = (props: {
	bildeMapper: LokalBildeMappe[];
	uploaded: LokalVegBilde[];
}) => {
	const konverterMapTilMappeOpplasting = (
		esksiterendeBildeMapper?: LokalBildeMappe[]
	): MappeOpplasting[] => {
		const bildeMapper = esksiterendeBildeMapper || props.bildeMapper;
		return bildeMapper.map(({ vegBilder, id, sti }) => {
			const opplastet = props.uploaded.filter((fil) => {
				return fil.bildeMappeId === id;
			}).length;
			let status: StatusType = 'venter';
			if (opplastet > 0) status = 'laster opp';
			if (opplastet === vegBilder?.length) status = 'ferdig';
			return {
				navn: sti,
				opplasting: {
					antall: vegBilder?.length || 0,
					opplastet,
				},
				status,
			} as MappeOpplasting;
		});
	};
	const antallVegbilder = useCallback(() => {
		let antall = 0;
		let dataMendge = 0;
		props.bildeMapper?.forEach((mappe) => {
			if (mappe.vegBilder) {
				antall += mappe.vegBilder.length;
				mappe.vegBilder.forEach((bilde) => {
					const fil = bilde.fil;
					if (fil) dataMendge += fil.size;
				});
			}
		});
		return { antall, dataMendge };
	}, [props.bildeMapper]);

	return { konverterMapTilMappeOpplasting, antallVegbilder };
};
