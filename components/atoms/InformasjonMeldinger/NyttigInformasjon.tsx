import { FC } from 'react';
import styled from 'styled-components';
import SvgGetter from '../SVG/SvgGetter/SvgGetter';
import { Colors } from '../../../styles/colors.ts';
import { BodyLitenTekst } from '../TekstKomponenter.ts';

interface NyttigInformasjonProps {
	melding: string;
	className?: string;
}

const NyttigInformasjon: FC<NyttigInformasjonProps> = ({ melding, className }) => {
	return (
		<Informasjon className={className}>
			<SvgGetter icon={'Informasjon'} wrapSvg størrelse={'stor'} pathFill={Colors.oransje} />
			<BodyLitenTekst>{melding}</BodyLitenTekst>
		</Informasjon>
	);
};

export default NyttigInformasjon;

const Informasjon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 0.5rem;
`;
