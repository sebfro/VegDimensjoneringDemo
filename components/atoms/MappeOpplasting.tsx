import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Colors } from '../../styles/colors';
import StatusIndikator from './StatusIndikator';
import { StatusType } from '../../lib/typer/OpplastingTyper.ts';
import ProgresjonBar from './ProgresjonBar.tsx';
import { BodyMediumTekst, LabelTekst } from './TekstKomponenter.ts';

interface MappeOpplastingProps {
	navn: string;
	filer: {
		opplastet: number;
		antall: number;
	};
	status?: StatusType;
}

const MappeOpplasting: FC<MappeOpplastingProps> = ({ navn, filer, status }) => {
	const hentAntallOpplastet = () => {
		if (status === 'ingen') return 'Ingen nye bilder';
		if (filer.opplastet >= filer.antall) {
			return filer.antall + ' bilder';
		}
		return `${filer.opplastet} / ${filer.antall} bilder`;
	};
	return (
		<StyledMappeOpplasting>
			<StyledStatusIndikator status={status || 'laster opp'} størrelse={'liten'} />
			<MappeNavn gråTekst={status === 'ingen'}>{navn}</MappeNavn>
			<BildeTeller>{hentAntallOpplastet()}</BildeTeller>
			<ProgresjonBar status={status} filer={filer} />
		</StyledMappeOpplasting>
	);
};

export default MappeOpplasting;

const StyledMappeOpplasting = styled.div`
	display: grid;
	grid-template-columns: auto 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	background-color: transparent;
	row-gap: 0.5rem;
`;

const MappeNavn = styled(BodyMediumTekst)<{ gråTekst: boolean }>`
	${({ gråTekst = false }) =>
		gråTekst &&
		css`
			color: ${Colors.grå};
		`};
	grid-column: 2;
	align-self: center;
	justify-self: start;
`;

const BildeTeller = styled(LabelTekst)`
	color: ${Colors.grå};
	align-self: center;
	justify-self: end;
`;

const StyledStatusIndikator = styled(StatusIndikator)`
	margin-right: 1rem;
	align-self: center;
`;
