import { FC } from 'react';
import { Container } from '../styles/BasePageLayout';
import styled from 'styled-components';
import Kort from '../components/atoms/Kort';
import { SekundærKnapp } from '../components/atoms/Knapper/SekundærKnapp';
import {
	BodyLitenTekst,
	BodyMediumTekst,
	TittelLitenTekst,
	TittelMediumTekst,
} from '../components/atoms/TekstKomponenter.ts';
import HovedKnapp from '../components/atoms/Knapper/HovedKnapp.tsx';

export const Startside: FC = () => {
	return (
		<Container>
			<Banner>
				<Kolonne>
					<TittelMediumTekst>VegDim</TittelMediumTekst>
					<BodyMediumTekst>
						Vegvesenets system for dimensjonering og analyse av vegoverbygninger.
					</BodyMediumTekst>
					<HovedKnapp tekst='Start dimensjonering' />
				</Kolonne>
			</Banner>
			<Kort>
				<Banner>
					<Placeholder />
					<Kolonne>
						<TittelLitenTekst>
							Hvordan hjelper VegDim deg å regne ut forventet tilstandsutvikling
						</TittelLitenTekst>
						<BodyLitenTekst>
							Vegdim bygger på to type beregninger: respons og tilstandsutvikling. Responsmodellen
							bruker mekanistiske prinsipper til å beregne spenninger og tøyninger som oppstår under
							hjullasten. Videre bruker vi tilstandsutviklingmodellen til å beregne deformasjon og
							slitasje i vegoverbygningen.
						</BodyLitenTekst>
						<SekundærKnapp tekst={'Lær mer om modellene bak løsningen'} color='red' />
					</Kolonne>
				</Banner>
			</Kort>
		</Container>
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
