import { FC, useContext } from 'react';
import styled, { css } from 'styled-components';
import { DimensjoneringsLagType, LagType } from '../../../../lib/MidlertidigData/Dimensjonering';
import { Colors } from '../../../../styles/colors';
import Checkbox from '../../../atoms/Inputs/CheckBox.tsx';
import { DimensionContext } from '../../../../lib/context/dimensionContext.tsx';

interface LagBoksProps {
	lag: Pick<LagType, 'navn' | 'aktiv' | 'materiale'>;
	dimLagType: DimensjoneringsLagType;
	borderTop: boolean;
}

export const LagBoks: FC<LagBoksProps> = ({ lag, dimLagType, borderTop }) => {
	const {
		handlers: { handleToggleCheckbox },
	} = useContext(DimensionContext);
	return (
		<Container borderTop={borderTop} borderBottom>
			<Checkbox
				handleOnClick={() =>
					handleToggleCheckbox(dimLagType, [{ aktiv: !lag.aktiv, navn: lag.navn }])
				}
				selected={lag.aktiv}
				buttonLabel={lag.navn}
			/>
		</Container>
	);
};

const Container = styled.div<{
	borderBottom: boolean;
	borderTop: boolean;
}>`
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
