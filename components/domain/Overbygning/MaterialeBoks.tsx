import styled, { css } from 'styled-components';
import Dropdown from '../../atoms/Inputs/Dropdown';
import { Colors } from '../../../styles/colors';
import { DropdownArrowContainer } from '../../atoms/Inputs/InputStyling';
import { LagType, MaterialeListe } from '../../../lib/MidlertidigData/Dimensjonering';
import { FC } from 'react';

interface MaterialeBoksProps {
	borderTop: boolean;
	lag: Pick<LagType, 'materiale' | 'aktiv'>;
	index: number;
	handleEndreMateriale: (value: string, index: number) => void;
}

export const MaterialeBoks: FC<MaterialeBoksProps> = ({
	borderTop,
	lag,
	index,
	handleEndreMateriale,
}) => {
	return (
		<MaterialeBokser borderTop={borderTop} aktiv={lag.aktiv}>
			{lag.aktiv && (
				<StyledDropdown
					options={MaterialeListe}
					value={lag.materiale}
					handleOnChange={(value) => handleEndreMateriale(value, index)}
				/>
			)}
		</MaterialeBokser>
	);
};

const MaterialeBokser = styled.div<{ borderTop: boolean; aktiv: boolean }>`
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

const StyledDropdown = styled(Dropdown)`
	select {
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
	}
`;
