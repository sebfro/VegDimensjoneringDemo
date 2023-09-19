import React, { FC } from 'react';
import styled from 'styled-components';
import Kort from './Kort';
import { Lobby } from '../../api';
import { BodyMediumTekst } from './TekstKomponenter.ts';

interface IngenLobbierProps {
	children: React.ReactNode;
	className?: string;
	lobbier?: Lobby[];
}
const IngenLobbier: FC<IngenLobbierProps> = ({ className, lobbier, children }) => {
	if (lobbier && lobbier.length > 0) {
		return <>{children}</>;
	} else {
		return (
			<StyledKort className={className}>
				<BodyMediumTekst>Ingen lobbier funnet</BodyMediumTekst>
			</StyledKort>
		);
	}
};

export default IngenLobbier;

const StyledKort = styled(Kort)`
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 20rem;
	border-radius: 1.5rem;
`;
