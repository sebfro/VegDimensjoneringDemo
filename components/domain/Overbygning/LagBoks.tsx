import { FC } from 'react';
import styled, { css } from 'styled-components';
import { LagType } from '../../../lib/MidlertidigData/Dimensjonering';
import { Colors } from '../../../styles/colors';
import Checkbox from '../../atoms/Inputs/CheckBox.tsx';

interface LagBoksProps {
	lag: Pick<LagType, 'navn' | 'aktiv'>;
	index: number;
	handleToggleCheckbox: (index: number) => void;
	borderTop: boolean;
}

export const LagBoks: FC<LagBoksProps> = ({ lag, index, handleToggleCheckbox, borderTop }) => {
	return (
		<Container borderTop={borderTop} borderBottom={lag.navn !== 'Bærelag'}>
			<Checkbox
				handleOnClick={() => handleToggleCheckbox(index)}
				selected={lag.aktiv}
				buttonLabel={lag.navn}
			/>
		</Container>
	);
};

const Container = styled.div<{ borderBottom: boolean; borderTop: boolean }>`
	border-color: ${Colors.grå};
	display: flex;
	padding: 0 0.75rem 0 1rem;
	height: 3rem;
	${({ borderBottom }) =>
		borderBottom &&
		css`
			border-bottom: var(--border-style);
		`};
	${({ borderTop }) =>
		borderTop &&
		css`
			border-top: var(--border-style);
		`};
	border-right: var(--border-style);
	border-left: var(--border-style);
`;
