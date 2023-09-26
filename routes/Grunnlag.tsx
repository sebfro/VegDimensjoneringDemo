import styled from 'styled-components';
import { Container } from '../styles/BasePageLayout';
import { TittelLitenTekst, TittelStorTekst } from '../components/atoms/TekstKomponenter.ts';
import Kort from '../components/atoms/Kort.tsx';
import { KnappeFooter } from '../components/atoms/Knapper/KnappeFooter.tsx';
import { useNavigate } from 'react-router-dom';
import { Urls } from '../lib/Urls.ts';
import KnappKort from '../components/atoms/Knapper/KnappKort.tsx';
import { AkselKonfigurasjon } from '../components/domain/DimensjoneringsGrunnlag/AkselKonfigurasjon.tsx';
import { Felt, TrafikkData } from '../components/domain/DimensjoneringsGrunnlag/TrafikkData.tsx';
import { useCallback, useState } from 'react';

export const Grunnlag = () => {
	const navigation = useNavigate();
	const [trafikkData, setTrafikkData] = useState<Map<Felt, number | undefined>>(
		new Map([
			['fartsgrense', undefined],
			['ådt', undefined],
			['andeltunge', undefined],
			['trafikkvekst', undefined],
		])
	);
	const oppdaterTrafikkData = useCallback(
		(verdi: number, felt: Felt) => {
			const nyState = new Map(trafikkData);
			nyState.set(felt, verdi);
			setTrafikkData(nyState);
		},
		[trafikkData]
	);
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
					<TraffikdataTittel>Trafikkdata</TraffikdataTittel>
					<TrafikkData feltVerdier={trafikkData} oppdaterVerdi={oppdaterTrafikkData} />
					<AkselKonfigurasjon />
				</HøyreKolonne>
				<Posisjon>
					<PosisjonInnehold></PosisjonInnehold>
				</Posisjon>
			</StyledContainer>
			<KnappeFooter
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

const Kjørefelt = styled.div`
	display: flex;
	column-gap: 1.5rem;
	margin-top: 1.5rem;
`;

const TraffikdataTittel = styled(TittelLitenTekst)`
	margin: 4rem 0 1.5rem;
`;
