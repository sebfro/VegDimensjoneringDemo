import Button, { ButtonProps } from './Button';
import styled from 'styled-components';
import { Colors } from '../../../styles/colors.ts';
import { FC } from 'react';
import { Loader } from '../loading/Loader.tsx';
import { SekundærKnappCss } from './FellesCss.ts';

export const SekundærKnapp: FC<ButtonProps> = (props) => {
	return <StyledButton {...props}>{props.laster && <Loader size='button' />}</StyledButton>;
};

export const StyledButton = styled(Button)`
	width: fit-content;
	max-height: 64px;

	:active {
		background-color: ${Colors.oransje};
		color: ${Colors.hvit};
	}

	--transitionTime: 0.2s;
	transition: border-color var(--transitionTime) ease-out, color var(--transitionTime) ease-out,
		background-color var(--transitionTime) ease-out;

	${SekundærKnappCss};
`;
