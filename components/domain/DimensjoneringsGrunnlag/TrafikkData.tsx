import styled from 'styled-components';
import Kort from '../../atoms/Kort';
import { Colors } from '../../../styles/colors';
import { FC } from 'react';
import { LabelTekst } from '../../atoms/TekstKomponenter';
import UnitInput from '../../atoms/Inputs/UnitInput';

export type Felt = 'fartsgrense' | 'ådt' | 'andeltunge' | 'trafikkvekst';

export interface TrafikkDataProps {
	feltVerdier: Map<Felt, number | undefined>;
	oppdaterVerdi: (verdi: number, felt: Felt) => void;
}
export const TrafikkData: FC<TrafikkDataProps> = ({ feltVerdier, oppdaterVerdi }) => {
	const hentInputMedLabel = (label: string, enhet: 'tall' | 'prosent', felt: Felt) => {
		return (
			<TekstMedLabel>
				<LabelTekst>{label}</LabelTekst>
				<StyledUnitInput
					value={feltVerdier.get(felt)?.toString()}
					onChangeCallback={(value) => oppdaterVerdi(+value, felt)}
					unit={enhet === 'tall' ? 'ingen' : 'prosent'}
				/>
			</TekstMedLabel>
		);
	};
	return (
		<GråKort>
			<KortInnhold>
				{hentInputMedLabel('Fartsgrense', 'tall', 'fartsgrense')}
				{hentInputMedLabel('ÅDT (åpningsår)', 'tall', 'ådt')}
				{hentInputMedLabel('Andel tunge', 'prosent', 'andeltunge')}
				{hentInputMedLabel('Trafikkvekst', 'prosent', 'trafikkvekst')}
			</KortInnhold>
		</GråKort>
	);
};

const GråKort = styled(Kort)`
	background-color: ${Colors.lysGrå};
	border-radius: 0;
	margin-bottom: 2.125rem;
	padding: 1.5rem 2.5rem 2.5rem;
`;

const KortInnhold = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 8rem);
	column-gap: 2.5rem;
`;

const StyledUnitInput = styled(UnitInput)`
	width: unset;
`;

const TekstMedLabel = styled.div`
	max-width: 8rem;
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
`;
