import styled from 'styled-components';
import Kort from '../../atoms/Kort';
import { Colors } from '../../../styles/colors';
import { BodyMediumTekst } from '../../atoms/TekstKomponenter';
import { SekundærKnapp } from '../../atoms/Knapper/SekundærKnapp';
import SvgGetter from '../../atoms/SVG/SvgGetter/SvgGetter';
import { Lobby } from '../../../api';
import { FC } from 'react';

interface AvsluttetOpplastingProps {
	lobby?: Pick<Lobby, 'status'>;
	antallBilder: {
		total: number;
		opplastet: number;
	};
	gåTilbakeTilOversikt: () => void;
}

export const AvsluttetOpplasting: FC<AvsluttetOpplastingProps> = ({
	lobby,
	antallBilder,
	gåTilbakeTilOversikt,
}) => {
	const { total: totalAntallBilder, opplastet: antallOpplastedeBilder } = antallBilder;
	return (
		<>
			{lobby?.status === 'AVBRUTT' && (
				<OpplastingAvbruttKort>
					<SvgWrapper>
						<SvgGetter icon={'Advarsel'} wrapSvg størrelse='medium' pathFill={Colors.oransje} />
					</SvgWrapper>
					<BodyMediumTekstStyled>{`Du avbrøt opplastingen før alle bilder var lastet opp. ${
						totalAntallBilder - antallOpplastedeBilder
					} av ${totalAntallBilder} bilder ble ikke lastet opp.`}</BodyMediumTekstStyled>
					<StyledSekundærKnapp tekst='Start ny opplasting' onClick={gåTilbakeTilOversikt} />
				</OpplastingAvbruttKort>
			)}
		</>
	);
};

const OpplastingAvbruttKort = styled(Kort)`
	border: 1px solid ${Colors.oransje};
	padding: 2.5rem 2.5rem 2.5rem 1rem;
	display: grid;
	grid-template-columns: 4rem 1fr;
	margin-bottom: 2.5rem;
	row-gap: 1.5rem;
	column-gap: 0.5rem;
`;

const BodyMediumTekstStyled = styled(BodyMediumTekst)``;

const StyledSekundærKnapp = styled(SekundærKnapp)`
	grid-column: 2;
`;

const SvgWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 4rem;
	height: 4rem;
`;
