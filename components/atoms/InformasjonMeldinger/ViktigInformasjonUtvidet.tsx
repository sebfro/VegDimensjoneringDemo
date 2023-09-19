import { FC } from 'react';
import styled from 'styled-components';
import Kort from '../Kort';
import { Colors } from '../../../styles/colors';
import SvgGetter from '../SVG/SvgGetter/SvgGetter';
import { BodyLitenTekst, TittelLitenTekst } from '../TekstKomponenter';

interface EksisterendeBilderProps {
	tittel?: string;
	beskrivelse?: string;
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}

const EksisterendeBilder: FC<EksisterendeBilderProps> = ({
	tittel = 'Eksisterende bilder',
	beskrivelse = 'Her kan du se alle bildene som allerede ligger i mappen.',
	className,
	children,
	onClick,
}) => {
	return (
		<Wrapper className={className} onClick={onClick}>
			<SirkelMedIkon>
				<SvgGetter icon='Advarsel' wrapSvg pathFill={Colors.oransje} />
			</SirkelMedIkon>
			<StyledKort>
				<Tittel>{tittel}</Tittel>
				<Beskrivelse>{beskrivelse}</Beskrivelse>
				{children && children}
			</StyledKort>
		</Wrapper>
	);
};

export default EksisterendeBilder;

const StyledKort = styled(Kort)`
	background-color: ${Colors.mørkSort};
	border: none;
	border-radius: 2rem;
	position: relative;
	top: -80px;
	margin-top: 40px;
	padding: 4rem 2rem;
`;

const Tittel = styled(TittelLitenTekst)`
	margin-bottom: 1rem;
`;

const Beskrivelse = styled(BodyLitenTekst)`
	margin-bottom: 2.5rem;
`;

const SirkelMedIkon = styled.div`
	border-radius: 50%;
	background-color: ${Colors.mørkSort};
	position: relative;
	width: 80px;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: calc(50% - 40px);
	//padding: 1rem;
	z-index: 1;

	svg {
		z-index: 2;
	}
`;

const Wrapper = styled.div`
	width: 100%;
`;
