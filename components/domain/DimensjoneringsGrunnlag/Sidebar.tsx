import styled from 'styled-components';
import { Colors } from '../../../styles/colors';
import SvgGetter from '../../atoms/SVG/SvgGetter/SvgGetter.tsx';
import {
	BodyLitenTekst,
	KnappTekst,
	LabelTekst,
	TittelLitenTekst,
} from '../../atoms/TekstKomponenter.ts';
import React from 'react';
import IkonKnapp from '../../atoms/Knapper/IkonKnapp.tsx';

type dataType = 'km/t' | 'm' | 'felt' | '%' | 'ingen' | 'm/s' | 'celsius';

export const Sidebar = () => {
	const genererFelt = (verdi: string, type: dataType, label: string) => {
		let datatype: string | React.ReactElement = ' ' + type.toString();
		if (type === 'celsius') datatype = <span>&#xb0;</span>;
		if (type === 'ingen') datatype = '';
		return (
			<InfoFelt>
				<TekstMedIkon>
					<SvgGetter icon={'Rediger'} />
					<LabelTekst>{label}</LabelTekst>
				</TekstMedIkon>
				<BodyLitenTekst>
					{verdi}
					{datatype}
				</BodyLitenTekst>
			</InfoFelt>
		);
	};

	return (
		<Container>
			<Header>
				<KnappTekst>Dim.grunnlag</KnappTekst>
			</Header>
			<Seksjon>
				<TekstMedLabel>
					<BodyLitenTekst>Trafikkgruppe</BodyLitenTekst>
					<BodyLitenTekst>A</BodyLitenTekst>
				</TekstMedLabel>
				<TekstMedLabel>
					<BodyLitenTekst>Dim.klasse</BodyLitenTekst>
					<BodyLitenTekst>H1</BodyLitenTekst>
				</TekstMedLabel>
			</Seksjon>
			<GråLinje />
			<TrafikkdataSeksjon>
				<InfoFelt>
					<TittelLitenTekst>Trafikkdata</TittelLitenTekst>
					<IkonKnapp ikon={'Rediger'} iconSize={2} />
				</InfoFelt>
				<Liste>
					{genererFelt('Data', 'ingen', 'Datapunkt')}
					{genererFelt('2', 'felt', 'Kjørefelt')}
					{genererFelt('3.25', 'm', 'kjørefeltbredde')}
					{genererFelt('90', 'km/t', 'Fartsgrense')}
					{genererFelt('14052', 'ingen', 'Ådt per felt')}
					{genererFelt('4', '%', 'Andel tunge')}
					{genererFelt('6', '%', 'Trafikkvekst')}
				</Liste>
			</TrafikkdataSeksjon>
			<GråLinje />
			<TrafikkdataSeksjon>
				<InfoFelt>
					<TittelLitenTekst>Klimadata</TittelLitenTekst>
					<IkonKnapp ikon={'Rediger'} iconSize={2} />
				</InfoFelt>
				<Liste>
					{genererFelt('08 - 22', 'celsius', 'Lufttemperatur')}
					{genererFelt('14 - 20', 'm/s', 'Vindhastighet')}
					{genererFelt('14', 'ingen', 'Solinnstråling')}
				</Liste>
			</TrafikkdataSeksjon>
		</Container>
	);
};

const Container = styled.div`
	position: sticky;
	top: 0;
	left: 0;
	width: 20rem;
	height: 100dvh;
	// background-color: ${Colors.lysGrå};
	border-right: 2px solid ${Colors.grå};
	padding-top: 2.5rem;
`;

const InfoFelt = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const TekstMedIkon = styled.div`
	display: flex;
	column-gap: 1em;
	align-items: center;
`;

const Header = styled.div`
	padding: 0 2rem 1.5rem;
`;

const Seksjon = styled.div`
	padding: 0 2rem 2rem;
	justify-content: space-between;
	display: flex;
`;

const FlexColumnDirection = styled.div`
	display: flex;
	flex-direction: column;
`;

const TekstMedLabel = styled(FlexColumnDirection)`
	row-gap: 0.5rem;
`;

const GråLinje = styled.div`
	height: 1px;
	background-color: ${Colors.grå};
	width: 100%;
`;

const TrafikkdataSeksjon = styled(FlexColumnDirection)`
	padding: 1.5rem 2rem;
`;

const Liste = styled(FlexColumnDirection)`
	row-gap: 0.5rem;
	margin-top: 1.5rem;
`;
