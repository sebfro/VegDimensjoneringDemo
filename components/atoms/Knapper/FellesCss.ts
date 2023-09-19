import { css } from 'styled-components';
import { Colors } from '../../../styles/colors';
import { TextStyles } from '../../../styles/TextStyles.ts';

/**
 * Felles css for knapper som er oransje.
 */
export const HovedKnappCss = css`
	background-color: ${Colors.primaryTekst};
	border: none;
	color: ${Colors.hvit};
	--transitionTime: 0.2s;
	transition: border-color var(--transitionTime) ease-out, color var(--transitionTime) ease-out,
		opacity var(--transitionTime) ease-out, background-color var(--transitionTime) ease-out;

	:not(:disabled) {
		:hover {
			border-color: ${Colors.mørkOransje};
			background-color: ${Colors.primaryTekst};
		}

		:focus-within {
			outline: 3px solid ${Colors.oransje};
			outline-offset: 2px;
			border-color: ${Colors.mørkSort};
		}
	}
`;
/**
 * Felles css for knapper som har gjennomsiktig bakgrunn.
 */
export const SekundærKnappCss = css`
	border: 2px solid ${Colors.primaryTekst};
	background-color: white;
	color: ${Colors.primaryTekst};
	${TextStyles.Knapp};

	:not(:disabled) {
		:hover {
			background: ${Colors.bakgrunnGrå};
			border-width: 3px;
			padding: 1rem calc(2rem - 1px);
		}

		:focus-within {
			outline: 3px solid ${Colors.oransje};
			outline-offset: 3px;
			background: ${Colors.grå};
			border-width: 3px;
			padding: 1rem calc(2rem - 1px);
		}
	}
`;
