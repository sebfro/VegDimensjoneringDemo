import { FC } from 'react';
import { Container } from '../styles/BasePageLayout.ts';
import styled from 'styled-components';
import { Dimejsonering } from '../components/Eksperimenter/Dimejsonering.tsx';
import { Colors } from '../styles/colors.ts';

const Root: FC = () => {
	return (
		<>
			<StyledContainer>
				<h1>Hovedsiden</h1>
				<Dimejsonering />
			</StyledContainer>
		</>
	);
};

export default Root;

const StyledContainer = styled(Container)`
	a:hover {
		font-size: 1.5rem;
	}
	background-color: ${Colors.bakgrunnGrå};
	row-gap: 1rem;
`;
