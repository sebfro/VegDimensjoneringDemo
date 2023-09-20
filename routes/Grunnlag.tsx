import styled from 'styled-components';
import { Container } from '../styles/BasePageLayout';
import { TittelLitenTekst, TittelStorTekst } from '../components/atoms/TekstKomponenter.ts';
import Kort from '../components/atoms/Kort.tsx';
import { Colors } from '../styles/colors.ts';
import { Footer } from '../components/atoms/Knapper/Footer.tsx';
import { useNavigate } from 'react-router-dom';
import { Urls } from '../lib/Urls.ts';
import KnappKort from '../components/atoms/Knapper/KnappKort.tsx';
import { AkselKonfigurasjon } from '../components/domain/DimensjoneringsGrunnlag/AkselKonfigurasjon.tsx';

export const Grunnlag = () => {
	const navigation = useNavigate();
	return (
		<>
			<StyledContainer>
				<Header>
					<TittelStorTekst>Dimensjoneringsgrunnlag</TittelStorTekst>
				</Header>
				<HøyreKolonne>
					<TittelLitenTekst>Antall kjørefelt</TittelLitenTekst>
					<Kjørefelt>
						<KnappKort icon={'AvmerkingsBoks'} title={'1-felt'} />
						<KnappKort icon={'PilNed'} title={'2-felt'} />
						<KnappKort icon={'PilNed'} title={'3-felt'} />
						<KnappKort icon={'PilNed'} title={'4-felt'} />
					</Kjørefelt>
					<Traffikdata>Trafikkdata</Traffikdata>
					<GråKort>
						<p>Placeholder</p>
					</GråKort>
					<AkselKonfigurasjon />
				</HøyreKolonne>
				<Posisjon>
					<PosisjonInnehold></PosisjonInnehold>
				</Posisjon>
			</StyledContainer>
			<Footer
				kanppProps={{
					avbrytOnClick: () => navigation(Urls.posisjon),
					bekreftOnClick: () => navigation(Urls.dimensjonering),
				}}
			/>
		</>
	);
};

const StyledContainer = styled(Container)`
	display: grid;
	align-items: start;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: 5rem auto;
	padding-top: 4rem;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	grid-column: 1 / span 2;
`;

const HøyreKolonne = styled.div``;

const Posisjon = styled(Kort)`
	border-radius: 0;
`;

const PosisjonInnehold = styled.div`
	display: grid;
`;

const GråKort = styled(Kort)`
	background-color: ${Colors.lysGrå};
	border-radius: 0;
	margin-bottom: 2.125rem;
`;

const Kjørefelt = styled.div`
	display: flex;
	column-gap: 1.5rem;
	margin-top: 1.5rem;
`;

const Traffikdata = styled(TittelLitenTekst)`
	margin: 4rem 0 1.5rem;
`;
