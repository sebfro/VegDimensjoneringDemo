import styled, { css } from 'styled-components';
import { Colors } from '../../../styles/colors';
import { DropdownArrowContainer } from '../../atoms/Inputs/InputStyling';
import {
	DimensjoneringsLagType,
	LagType,
	MaterialeListe,
	MaterialeType,
} from '../../../lib/MidlertidigData/Dimensjonering';
import { FC, useContext } from 'react';
import { DimensionContext } from '../../../lib/context/dimensionContext.tsx';
import VeiOverbyggningDropdown from '../../atoms/Inputs/Dropdown/VeiOverbyggningDropdown.tsx';

interface MaterialeBoksProps {
	borderTop: boolean;
	lag: Pick<LagType, 'materiale' | 'aktiv' | 'navn'>;
	dimLagType: DimensjoneringsLagType;
}

export const MaterialeBoks: FC<MaterialeBoksProps> = ({ borderTop, lag, dimLagType }) => {
	const {
		handlers: { handleEndreMateriale },
	} = useContext(DimensionContext);

	//Midlertidig error for testing
	const error = false;

	return (
		<MaterialeBokser borderTop={borderTop} aktiv={lag.aktiv} error={error}>
			{lag.aktiv && (
				<VeiOverbyggningDropdown
					error={error}
					options={MaterialeListe.map((value) => ({ value: value, displayText: value }))}
					value={lag.materiale}
					handleOnChange={(value: MaterialeType) =>
						handleEndreMateriale(value, dimLagType, [lag.navn])
					}
				/>
			)}
		</MaterialeBokser>
	);
};

const MaterialeBokser = styled.div<{
	borderTop: boolean;
	aktiv: boolean;
	error: boolean;
}>`
	border-color: ${Colors.borders.secondary};
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
	select {
		${({ error }) =>
			error
				? css`
						padding: 0 0 0 2rem;
				  `
				: css`
						padding: 0 0 0 1rem;
				  `};
	}
	${({ error }) =>
		error &&
		css`
			border-bottom: 2px solid ${Colors.information.secondaryError};
		`};
`;
