import { FC } from 'react';
import Kort from '../Kort';
import styled from 'styled-components';
import { Colors } from '../../../styles/colors';
import SvgGetter from '../SVG/SvgGetter/SvgGetter.tsx';

type alvorlighetType = 'info' | 'advarsel';

interface InfoMeldingProps {
	text: string;
	alvorlighet: alvorlighetType;
}

const InfoMelding: FC<InfoMeldingProps> = ({ text, alvorlighet }) => {
	return (
		<StyledInfoMelding alvorlighet={alvorlighet}>
			<TekstOgIkon>
				<SvgGetter icon={'Advarsel'} wrapSvg størrelse='liten' />
				<p>{text}</p>
			</TekstOgIkon>
		</StyledInfoMelding>
	);
};

export default InfoMelding;

const StyledInfoMelding = styled(Kort)<{ alvorlighet: alvorlighetType }>`
	background-color: ${(props) => (props.alvorlighet === 'info' ? Colors.blå : Colors.rød)};
	color: ${Colors.hvit};
`;

const TekstOgIkon = styled.div`
	display: flex;
	column-gap: 1rem;
`;
