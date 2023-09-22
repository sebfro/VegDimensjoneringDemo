import { BodyLitenTekst, BodyMediumTekst, LabelTekst } from '../../atoms/TekstKomponenter';
import IkonKnapp from '../../atoms/Knapper/IkonKnapp';
import styled from 'styled-components';
import Kort from '../../atoms/Kort';
import { Colors } from '../../../styles/colors';
import { FC } from 'react';

interface AkselKonfigurasjonProps {
	contactPressure?: number;
	contactRadius?: number;
	axieLoad?: number;
	wheelSpacing?: number;
	akselBredde?: number;
	heavyTraffic?: number;
}

export const AkselKonfigurasjon: FC<AkselKonfigurasjonProps> = ({
	contactPressure = 100,
	contactRadius = 100,
	axieLoad = 100,
	wheelSpacing = 100,
	akselBredde = 100,
	heavyTraffic = 100,
}) => {
	const hentTekstMedLabel = (label: string, enhet: 'kPa' | 'mm' | 'kN', tekst?: number) => {
		return (
			<TekstMedLabel>
				<LabelTekst>{label}</LabelTekst>
				<BodyLitenTekst farge={Colors.grå}>
					{tekst}
					{enhet}
				</BodyLitenTekst>
			</TekstMedLabel>
		);
	};
	return (
		<GråKort>
			<Header>
				<BodyMediumTekst>Akselkonfigurasjon</BodyMediumTekst>
				<IkonKnapp ikon={'Rediger'} />
			</Header>
			<Detaljer>
				{hentTekstMedLabel('Contact pressure', 'kPa', contactPressure)}
				{hentTekstMedLabel('Contact radius', 'mm', contactRadius)}
				{hentTekstMedLabel('Axie load', 'kN', axieLoad)}
				{hentTekstMedLabel('Wheel spacing', 'mm', wheelSpacing)}
				{hentTekstMedLabel('Akselbredde', 'mm', akselBredde)}
				{hentTekstMedLabel('Heavy traffic wander standard deviaztion', 'mm', heavyTraffic)}
			</Detaljer>
		</GråKort>
	);
};

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
`;

const GråKort = styled(Kort)`
	background-color: ${Colors.lysGrå};
	border-radius: 0;
	margin-bottom: 2.125rem;
	padding: 1.5rem 2.5rem 2.5rem;
`;

const TekstMedLabel = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
`;

const Detaljer = styled.div`
	display: flex;
	flex-wrap: wrap;
	column-gap: 2.5rem;
	row-gap: 1rem;
	max-width: 40rem;
`;
