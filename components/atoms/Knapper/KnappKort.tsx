import React, { useCallback } from 'react';
import styled from 'styled-components';
import FocusOutline from '../StyledComponents/FocusOutline';
import { Colors } from '../../../styles/colors';
import { BodyLitenTekst } from '../TekstKomponenter.ts';
import { KjørefeltType } from '../../../routes/Grunnlag.tsx';

interface NavigasjonsKortProps extends React.HTMLAttributes<HTMLButtonElement> {
	title: string;
	kjørefelt: KjørefeltType;
	height?: number;
	selected?: boolean;
}

const KnappKort: React.FC<NavigasjonsKortProps> = ({
	title,
	kjørefelt,
	height,
	selected = false,
	...props
}) => {
	const getLanes = useCallback(() => {
		const lanes = [];
		for (let i = 1; i < kjørefelt; i++) {
			lanes.push(<OrangeLine key={i} />);
		}
		return lanes;
	}, [kjørefelt]);
	return (
		<FocusOutline offset={10} height={'100%'}>
			<StyledCard height={height} tabIndex={0} role='button' {...props}>
				<Sirkel>{selected && <Dot />} </Sirkel>
				<Content>
					<Road>
						<BlackLine />
						{getLanes()}
						<BlackLine />
					</Road>
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

const Road = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 4rem;
`;

const BlackLine = styled.div`
	height: 64px;
	width: 2px;
	background-color: black;
`;
const OrangeLine = styled.div`
	height: 64px;
	width: 2px;
	background-color: ${Colors.oransje};
	background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='white' stroke-width='2' stroke-dasharray='8%2c 6' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
`;
