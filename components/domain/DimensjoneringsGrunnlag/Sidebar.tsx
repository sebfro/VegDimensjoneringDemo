import styled from 'styled-components';
import { Colors } from '../../../styles/colors';
import SvgGetter from '../../atoms/SVG/SvgGetter/SvgGetter.tsx';
import { BodyLitenTekst, LabelTekst } from '../../atoms/TekstKomponenter.ts';

export const Sidebar = () => {
	return (
		<Container>
			<InfoFelt>
				<TekstMedIkon>
					<SvgGetter icon={'Rediger'} />
					<LabelTekst>Kjørefelt</LabelTekst>
				</TekstMedIkon>
				<BodyLitenTekst>2 felt</BodyLitenTekst>
			</InfoFelt>
		</Container>
	);
};

const Container = styled.div`
	position: sticky;
	top: 0;
	left: 0;
	width: 20rem;
	height: 100dvh;
	//background-color: ${Colors.grå};
	border-right: 2px solid ${Colors.grå};
`;

const InfoFelt = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TekstMedIkon = styled.div`
	display: flex;
	column-gap: 1em;
`;

// const Header = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// `;
