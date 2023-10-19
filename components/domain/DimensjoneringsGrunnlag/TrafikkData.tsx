import styled from 'styled-components';
import Kort from '../../atoms/Kort';
import { Colors } from '../../../styles/colors';
import { LabelTekst } from '../../atoms/TekstKomponenter';
import UnitInput from '../../atoms/Inputs/UnitInput';
import { Controller } from 'react-hook-form';
import { FormRadio } from '../../atoms/Knapper/Radio.tsx';
import { FC } from 'react';

export type Felt =
	| 'fartsgrense'
	| 'ådt'
	| 'andeltunge'
	| 'trafikkvekst'
	| 'PiggdekkDager'
	| 'Piggdekkandel';

export const TrafikkData: FC = () => {
	const hentInputMedLabel = (label: string, enhet: 'tall' | 'prosent', felt: Felt) => {
		return (
			<TekstMedLabel>
				<LabelTekst>{label}</LabelTekst>
				<Controller
					render={({ field }) => {
						return (
							<StyledUnitInput
								unit={enhet === 'tall' ? 'ingen' : 'prosent'}
								onChangeCallback={field.onChange}
								value={field.value}
							/>
						);
					}}
					name={felt}
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
				{hentInputMedLabel('Piggdekk dager', 'tall', 'PiggdekkDager')}
				{hentInputMedLabel('Piggdekkandel', 'prosent', 'Piggdekkandel')}
				<RadioGruppe>
					<LabelTekst>Salting av vegen</LabelTekst>
					<RadioKnappene>
						<Controller
							render={({ field }) => (
								<FormRadio defaultChecked {...field} value='Ja' label={'Ja'} />
							)}
							name='saltingAvVegen'
						/>
						<Controller
							render={({ field }) => <FormRadio {...field} value='Nei' label={'Nei'} />}
							name='saltingAvVegen'
						/>
					</RadioKnappene>
				</RadioGruppe>
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
	row-gap: 1rem;
`;

const StyledUnitInput = styled(UnitInput)`
	width: unset;
`;

const TekstMedLabel = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
`;

const RadioKnappene = styled.div`
	display: flex;
	height: 100%;
	justify-content: space-between;
	column-gap: 1rem;
`;

const RadioGruppe = styled(TekstMedLabel)`
	grid-column: span 2;
	width: min-content;
`;
