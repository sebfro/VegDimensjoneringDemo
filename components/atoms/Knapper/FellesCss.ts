import { css } from 'styled-components';
import { Colors } from '../../../styles/colors';

/**
 * Felles css for knapper som er oransje.
 */
export const HovedKnappCss = css`
	--transitionTime: 0.2s;
	transition: border-color var(--transitionTime) ease-out, color var(--transitionTime) ease-out,
		opacity var(--transitionTime) ease-out, background-color var(--transitionTime) ease-out;
	:not(:disabled) {
		:hover {
			border-color: ${Colors.mørkOransje};
			background-color: ${Colors.mørkOransje};
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
	:not(:disabled) {
		:hover {
			background: #030405;
			border-width: 3px;
			padding: 1rem calc(2rem - 1px);
		}

		:focus-within {
			outline: 3px solid ${Colors.oransje};
			outline-offset: 3px;
			background: #030405;
			border-width: 3px;
			padding: 1rem calc(2rem - 1px);
		}
	}
`;
