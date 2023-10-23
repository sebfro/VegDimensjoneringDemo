import Kort from '../../atoms/Kort';
import styled from 'styled-components';
import { useCallback } from 'react';
import { Icons } from '../../atoms/SVG/SvgGetter/Icons.ts';
import SvgGetter from '../../atoms/SVG/SvgGetter/SvgGetter.tsx';
import ScondaryButton from '../../atoms/Knapper/ScondaryButton.tsx';
import {
	BodyLitenTekst,
	TittelEkstraLitenTekst,
	TittelLitenTekst,
} from '../../atoms/TekstKomponenter.ts';

export const Posisjon = () => {
	const getRow = useCallback(
		(icon: Icons, label: string, value: string) => (
			<Row>
				<RowLabel>
					<SvgGetter icon={icon} wrapSvg height={'1.5rem'} />
					<p>{label}</p>
				</RowLabel>
				<p>{value}</p>
			</Row>
		),
		[]
	);
	return (
		<Wrapper>
			<Title>Posisjon</Title>
			<StyledKort>
				<KartPlaceholder />
				<Content>
					<KlimaDataTittle>
						<TittelEkstraLitenTekst>Klimadata </TittelEkstraLitenTekst>
						<BodyLitenTekst>Hemsedal værstasjon</BodyLitenTekst>
					</KlimaDataTittle>
					<ClimateData>
						{getRow('Mountain', 'Høyde', '102 moh')}
						{getRow('AirTemperature', 'Lufttemperatur', '08 - 22 °')}
						{getRow('AirSpeed', 'Vindhastighet', '14 - 20 m/s')}
						{getRow('SunRadiation', 'Solinnstråling', '14')}
					</ClimateData>
					<ScondaryButton tekst='Endre klimadata' />
				</Content>
			</StyledKort>
		</Wrapper>
	);
};

const StyledKort = styled(Kort)`
	padding: 0;
`;

const KartPlaceholder = styled.div`
	background-color: red;
	width: 100%;
	height: 13rem;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const AlignCenterFlex = styled.div`
	display: flex;
	align-items: center;
`;

const Row = styled(AlignCenterFlex)`
	justify-content: space-between;
	height: 1.5rem;
`;

const RowLabel = styled(AlignCenterFlex)`
	column-gap: 1rem;
`;
const ClimateData = styled.div`
	display: grid;
	grid-row-gap: 1rem;
	margin-bottom: 1rem;
`;

const KlimaDataTittle = styled(AlignCenterFlex)`
	justify-content: space-between;
	margin-bottom: 1.5rem;
`;

const Title = styled(TittelLitenTekst)`
	margin-bottom: 1.5rem;
`;

const Content = styled.div`
	padding: 2rem;
`;
