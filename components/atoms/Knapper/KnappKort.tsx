import React from 'react';
import styled from 'styled-components';
import FocusOutline from '../StyledComponents/FocusOutline';
import { Colors } from '../../../styles/colors';
import SvgGetter from '../SVG/SvgGetter/SvgGetter';
import { BodyLitenTekst } from '../TekstKomponenter.ts';
import { Icons } from '../SVG/SvgGetter/Icons.ts';

interface NavigasjonsKortProps extends React.HTMLAttributes<HTMLButtonElement> {
	title: string;
	height?: number;
	selected?: boolean;
}

const KnappKort: React.FC<NavigasjonsKortProps> = ({
	title,
	height,
	selected = false,
	...props
}) => {
	const icon: Icons = selected ? 'AvmerkingsBoks' : 'CheckMark';
	return (
		<FocusOutline offset={10} height={'100%'}>
			<StyledCard height={height} tabIndex={0} role='button' {...props}>
				<Sirkel>{selected && <Dot />} </Sirkel>
				<Content>
					<StyledSvgGetter icon={icon} wrapSvg />
					<BodyLitenTekst>{title}</BodyLitenTekst>
				</Content>
			</StyledCard>
		</FocusOutline>
	);
};

export default KnappKort;

const Sirkel = styled.div`
	border-radius: 50%;
	border: 2px solid ${Colors.primaryTekst};
	width: 2rem;
	height: 2rem;
	padding: 0.3rem;
	position: absolute;
	top: 1rem;
	right: 1rem;
`;

const Dot = styled.div`
	border-radius: 50%;
	background-color: ${Colors.primaryTekst};
	width: 100%;
	height: 100%;
`;
const StyledCard = styled.button<{ height?: number }>`
	border: 1px solid ${Colors.grå};
	padding: 1rem;
	background-color: white;
	border-radius: 0;
	position: relative;
	width: 100%;
	min-height: 10.375rem;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.2s ease-in-out;
	:focus {
		transition: all 0.2s ease-in-out;
		box-shadow: 0 0 16px 12px rgba(53, 62, 67, 0.08);
		border: 3px solid ${Colors.primaryTekst};
		border-radius: 2px;
		padding: 29px;
	}

	:hover {
		cursor: pointer;
		box-shadow: 0 0 8px 4px rgba(53, 62, 67, 0.3);
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	column-gap: 1.5em;
`;

const StyledSvgGetter = styled(SvgGetter)`
	height: 4rem;
	width: 4rem;
`;
