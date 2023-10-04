import React from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../../styles/TextStyles';
import PrimaryButton from '../../atoms/Knapper/PrimaryButton';
import ScondaryButton from '../../atoms/Knapper/ScondaryButton';
import { Colors } from '../../../styles/colors.ts';

interface OverbygningHeaderProps {
	title: string;
}

const OverbygningHeader: React.FC<OverbygningHeaderProps> = ({ title }) => {
	return (
		<Header>
			<Title>{title}</Title>
			<ButtonsWrapper>
				<PrimaryButton tekst={'Eksporter resultat'} />
				<ScondaryButton tekst={'Avslutt'} />
			</ButtonsWrapper>
		</Header>
	);
};

export default OverbygningHeader;

const Title = styled.h1`
	${TextStyles.TittelStor}
`;

const Header = styled.div`
	padding-bottom: 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${Colors.borders.secondary};
	margin-bottom: 4rem;
`;

const ButtonsWrapper = styled.div`
	column-gap: 1.5rem;
	display: flex;
	align-items: center;
`;
