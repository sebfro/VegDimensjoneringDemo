import { FC } from 'react';
import styled, { css } from 'styled-components';
import { StatusType } from '../../lib/typer/OpplastingTyper.ts';
import MappeOpplasting from './MappeOpplasting.tsx';

export type MappeOpplasting = {
	navn: string;
	status: StatusType;
	opplasting: {
		antall: number;
		opplastet: number;
	};
};

interface MappeListeProps {
	mapper?: MappeOpplasting[];
}

const MappeListe: FC<MappeListeProps> = ({ mapper = [] }) => {
	const sortert = mapper.sort((a, b) => {
		const aStatus = a.status;
		const bStatus = b.status;
		if (aStatus === 'ferdig') {
			return -1;
		} else if (bStatus === 'ferdig') {
			return 1;
		} else if (aStatus === 'laster opp') {
			return -1;
		} else if (bStatus === 'laster opp') {
			return 1;
		} else {
			return 0;
		}
	});
	const midtPunkt = Math.ceil(sortert.length / 2);
	const førsteHalvdel = sortert.slice(0, midtPunkt);
	const andreHalvdel = sortert.slice(midtPunkt);
	const lagMappeListe = (liste: MappeOpplasting[]) =>
		liste.map((mappe, index) => {
			return (
				<StyledMappeOpplasting
					key={index}
					filer={{ antall: mappe.opplasting.antall, opplastet: mappe.opplasting.opplastet }}
					navn={mappe.navn}
					status={mappe.status}
				/>
			);
		});
	const brukFlex = sortert.length < 5;
	return (
		<Wrapper brukFlex={brukFlex}>
			{brukFlex ? (
				lagMappeListe(sortert)
			) : (
				<>
					<div>{lagMappeListe(førsteHalvdel)}</div>
					<div>{lagMappeListe(andreHalvdel)}</div>
				</>
			)}
		</Wrapper>
	);
};

export default MappeListe;

const Wrapper = styled.div<{ brukFlex: boolean }>`
	${({ brukFlex }) =>
		brukFlex
			? css`
					display: flex;
					flex-direction: column;
			  `
			: css`
					display: grid;
					grid-template-columns: 1fr 1fr;
			  `}
	width: 100%;
	height: min-content;
	column-gap: 4rem;
`;

const StyledMappeOpplasting = styled(MappeOpplasting)`
	width: 100%;
	display: flex;
`;
