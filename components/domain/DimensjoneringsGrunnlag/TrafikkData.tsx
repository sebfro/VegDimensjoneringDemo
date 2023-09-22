import styled from 'styled-components';
import Kort from '../../atoms/Kort';
import { Colors } from '../../../styles/colors';
import { FC } from 'react';
import { LabelTekst } from '../../atoms/TekstKomponenter';
import UnitInput from '../../atoms/Inputs/UnitInput';

type InputFelt = {
	value?: number;
	endre: (value: number) => void;
};

interface TrafikkDataProps {
	fartsgrense: InputFelt;
	ådt: InputFelt;
	andelTunge: InputFelt;
	trafikkvekst: InputFelt;
}
export const TrafikkData: FC<TrafikkDataProps> = ({
	fartsgrense,
	ådt,
	andelTunge,
	trafikkvekst,
}) => {
	const hentInputMedLabel = (
		label: string,
		enhet: 'tall' | 'prosent',
		endre: (value: number) => void
	) => {
		return (
			<TekstMedLabel>
				<LabelTekst>{label}</LabelTekst>
				<StyledUnitInput
					onChangeCallback={(value) => endre(+value)}
					unit={enhet === 'tall' ? 'ingen' : 'prosent'}
				/>
			</TekstMedLabel>
		);
	};
	return (
		<GråKort>
			<KortInnhold>
				{hentInputMedLabel('Fartsgrense', 'tall', fartsgrense.endre)}
				{hentInputMedLabel('ÅDT (åpningsår)', 'tall', ådt.endre)}
				{hentInputMedLabel('Andel tunge', 'prosent', andelTunge.endre)}
				{hentInputMedLabel('Trafikkvekst', 'prosent', trafikkvekst.endre)}
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
