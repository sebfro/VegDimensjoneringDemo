import { FC } from 'react';
import { Container } from '../styles/BasePageLayout';
import styled from 'styled-components';
import Kort from '../components/atoms/Kort';
import ScondaryButton from '../components/atoms/Knapper/ScondaryButton.tsx';
import {
	BodyLitenTekst,
	BodyMediumTekst,
	TittelLitenTekst,
	TittelStorTekst,
} from '../components/atoms/TekstKomponenter.ts';
import HovedKnapp from '../components/atoms/Knapper/PrimaryButton.tsx';
import { useNavigate } from 'react-router-dom';
import { Urls } from '../lib/Urls.ts';

export const Startside: FC = () => {
	const naviagtion = useNavigate();

	return (
		<StyledContainer>
			<Banner>
				<Kolonne>
					<TittelStorTekst>VegDim</TittelStorTekst>
					<BodyMediumTekst>
						Vegvesenets system for dimensjonering og analyse av vegoverbygninger.
					</BodyMediumTekst>
					<HovedKnapp tekst='Start dimensjonering' onClick={() => naviagtion(Urls.posisjon)} />
				</Kolonne>
				<Placeholder />
			</Banner>
			<StyledKort>
				<Banner>
					<Placeholder />
					<Kolonne>
						<Tittel>Hvordan hjelper VegDim deg å regne ut forventet tilstandsutvikling</Tittel>
						<Beskrivelse>
							Vegdim bygger på to type beregninger: respons og tilstandsutvikling. Responsmodellen
							bruker mekanistiske prinsipper til å beregne spenninger og tøyninger som oppstår under
							hjullasten. Videre bruker vi tilstandsutviklingmodellen til å beregne deformasjon og
							slitasje i vegoverbygningen.
						</Beskrivelse>
						<ScondaryButton tekst={'Lær mer om modellene bak løsningen'} />
					</Kolonne>
				</Banner>
			</StyledKort>
		</StyledContainer>
	);
};

const Banner = styled.div`
	display: flex;
	justify-content: space-between;
	column-gap: 10rem;
`;

const Kolonne = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 40%;
`;

const Placeholder = styled.div`
	flex-basis: 40%;

	background-color: red;
`;

const StyledContainer = styled(Container)`
	row-gap: 6.5rem;
	padding-top: 10.25rem;
`;

const StyledKort = styled(Kort)`
	padding: 2.125rem 3.375rem;
`;

const Tittel = styled(TittelLitenTekst)`
	margin-bottom: 1.375rem;
`;

const Beskrivelse = styled(BodyLitenTekst)`
	margin-bottom: 2.5rem;
`;
