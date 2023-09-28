import styled, { css } from 'styled-components';
import Dropdown from '../../atoms/Inputs/Dropdown';
import { Colors } from '../../../styles/colors';
import { DropdownArrowContainer } from '../../atoms/Inputs/InputStyling';
import {
	DimensjoneringsLagType,
	LagType,
	MaterialeListe,
} from '../../../lib/MidlertidigData/Dimensjonering';
import { FC, useContext } from 'react';
import { DimensionContext } from '../../../lib/context/dimensionContext.tsx';

interface MaterialeBoksProps {
	borderTop: boolean;
	lag: Pick<LagType, 'materiale' | 'aktiv' | 'navn'>;
	dimLagType: DimensjoneringsLagType;
}

export const MaterialeBoks: FC<MaterialeBoksProps> = ({ borderTop, lag, dimLagType }) => {
	const {
		handlers: { handleEndreMateriale },
	} = useContext(DimensionContext);

	return (
		<MaterialeBokser borderTop={borderTop} aktiv={lag.aktiv}>
			{lag.aktiv && (
				<TransparangDropdown
					options={MaterialeListe}
					value={lag.materiale}
					handleOnChange={(value) => handleEndreMateriale(value, dimLagType, [lag.navn])}
				/>
			)}
		</MaterialeBokser>
	);
};

const MaterialeBokser = styled.div<{
	borderTop: boolean;
	aktiv: boolean;
}>`
	border-color: ${Colors.grå};
	height: 3rem;
	display: flex;
	${({ aktiv }) =>
		!aktiv
			? css`
					background-color: ${Colors.lysGrå};
			  `
			: css`
					:hover,
					:focus-within {
						background-color: ${Colors.lysGrå};
						border-bottom: 2px solid ${Colors.oransje};

						${DropdownArrowContainer} {
							background-color: ${Colors.lysGrå};
						}
					}
			  `};
	border-bottom: var(--border-style);
	${({ borderTop }) =>
		borderTop &&
		css`
			border-top: var(--border-style);
		`};
`;

export const TransparangDropdown = styled(Dropdown)`
	select {
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
	}
`;
