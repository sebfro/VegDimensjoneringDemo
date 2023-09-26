import styled from 'styled-components';
import { Colors } from '../../styles/colors.ts';
import { BodyLitenTekst } from './TekstKomponenter.ts';
import SvgGetter from './SVG/SvgGetter/SvgGetter.tsx';

export const Footer = () => {
	return (
		<Container>
			<Linker>
				<BodyLitenTekst>Prosjektside</BodyLitenTekst>
				<BodyLitenTekst>Materialeregister</BodyLitenTekst>
				<BodyLitenTekst>Åpen kildekode</BodyLitenTekst>
			</Linker>
			<SvgGetter icon={'SvvLogo'} wrapSvg />
		</Container>
	);
};

const Container = styled.div`
	position: static;
	bottom: 0;
	width: 100%;
	border-top: 1px solid ${Colors.grå};
	grid-column: 2;
	padding: 1.5rem 0 4rem;
	margin: 0 4rem;
	justify-content: space-between;
	display: flex;
`;

const Linker = styled.div`
	display: flex;
	column-gap: 2.5rem;
`;
