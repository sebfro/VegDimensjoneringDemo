import { FC } from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from './Button';
import { Colors } from '../../../styles/colors';
import { Loader } from '../loading/Loader.tsx';
import { HovedKnappCss } from './FellesCss.ts';

const HovedKnapp: FC<ButtonProps> = (props) => {
	return (
		<StyledButton {...props}>
			{props.laster && <Loader size='button' color={Colors.hvit} />}
		</StyledButton>
	);
};

export default HovedKnapp;

const StyledButton = styled(Button)`
	background-color: ${Colors.oransje};
	border-color: ${Colors.oransje};
	max-height: 64px;
	${HovedKnappCss};
`;
