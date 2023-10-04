import { TextStyles } from '../styles/TextStyles.ts';
import styled from 'styled-components';
import Kort from '../components/atoms/Kort.tsx';
import ScondaryButton from '../components/atoms/Knapper/ScondaryButton.tsx';
import { BodyMediumTekst } from '../components/atoms/TekstKomponenter.ts';
import { useNavigate } from 'react-router-dom';
import { Urls } from '../lib/Urls.ts';
import HovedKnapp from '../components/atoms/Knapper/PrimaryButton.tsx';

export const Posisjon = () => {
	const naviagtion = useNavigate();
	return (
		<KartPlaceholder>
			<StyledKort>
				<KortInnhold>
					<Detaljer>
						<BodyMediumTekst>Klikk i kartet for finne nærmeste værstasjon</BodyMediumTekst>
					</Detaljer>
					<HovedKnapp tekst={'Velg klimastatsjon'} onClick={() => naviagtion(Urls.grunnlag)} />
					<StyledSekundærKnapp tekst={'Avbryt'} onClick={() => naviagtion(Urls.index)} />
				</KortInnhold>
			</StyledKort>
		</KartPlaceholder>
	);
};

const StyledKort = styled(Kort)`
	${TextStyles.BodyMedium};
	position: relative;
	top: 2rem;
	left: 2rem;
	height: 50rem;
	width: 23rem;
	border-radius: 0;
`;

const KartPlaceholder = styled.div`
	width: 100dvw;
	height: 100dvh;
	background-color: red;
`;

const StyledSekundærKnapp = styled(ScondaryButton)`
	align-self: end;
	width: 100%;
`;

const KortInnhold = styled.div`
	display: grid;
	grid-template-rows: 9fr 1fr;
	height: 100%;
`;

const Detaljer = styled.div``;
