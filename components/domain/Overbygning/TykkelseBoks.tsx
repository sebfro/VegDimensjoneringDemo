import { FC, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Colors } from '../../../styles/colors';
import MilimeterInput from '../../atoms/Inputs/MilimeterInput';
import { ArcherElement } from 'react-archer';
import { DimensjoneringsLagType, LagType } from '../../../lib/MidlertidigData/Dimensjonering';
import { DimensionContext } from '../../../lib/context/dimensionContext.tsx';

interface TykkelseBoksProps {
	lag: Pick<LagType, 'høyde' | 'aktiv' | 'navn'>;
	borderTop: boolean;
	dimLagType: DimensjoneringsLagType;
}

export const TykkelseBoks: FC<TykkelseBoksProps> = ({ lag, borderTop, dimLagType }) => {
	const {
		handlers: { handleEndreTykkelse },
	} = useContext(DimensionContext);
	const boks = (
		<TykkelseBokser borderTop={borderTop} aktiv={lag.aktiv}>
			{lag.aktiv && (
				<StyledMilimeterInput
					onChangeCallback={(value) => handleEndreTykkelse(value, dimLagType, [lag.navn])}
					value={lag.høyde.toString()}
				/>
			)}
		</TykkelseBokser>
	);
	if (!lag.aktiv) return boks;
	return (
		<ArcherElement
			id={lag.navn}
			key={lag.navn}
			relations={[
				{
					targetId: `${lag.navn + 'dimlag'}`,
					targetAnchor: 'left',
					sourceAnchor: 'right',
					style: {
						lineStyle: 'curve',
						endShape: {
							arrow: {
								arrowLength: 0,
								arrowThickness: 0,
							},
						},
					},
				},
			]}
		>
			{boks}
		</ArcherElement>
	);
};

const StyledMilimeterInput = styled(MilimeterInput)`
	background-color: transparent;
	width: 5rem;
	margin-left: 0.5rem;

	input {
		background-color: transparent;
		width: 2rem;
	}
`;

const TykkelseBokser = styled.div<{
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
					:hover {
						${StyledMilimeterInput} {
							padding: 0.75rem 0.5rem calc(0.75rem - 1px);
						}

						border-bottom: 2px solid ${Colors.oransje};
						background-color: ${Colors.lysGrå};
					}

					border-left: var(--border-style);
			  `};
	align-items: center;
	justify-content: start;
	border-bottom: var(--border-style);
	border-right: var(--border-style);
	${({ borderTop }) =>
		borderTop &&
		css`
			border-top: var(--border-style);
		`};

	:focus-within {
		outline: 2px solid ${Colors.oransje};
		outline-offset: -1px;
	}
`;
