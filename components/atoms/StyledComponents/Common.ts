import styled, { css } from 'styled-components';
import { Colors } from '../../../styles/colors';

/**
 * Dette er en samling av styled-components som brukes ofte.
 * Hovedsaklig styling fot hover og focus (inkluderer focus-visible)
 * Skal du lage focus eller hover på noe ta utgangspunkt i css-en som ligger her.
 * Eventuelt gjenbruk den.
 */
interface LayoutBannerProps {
	backgroundColor?: string;
}

const offset = '3px';

export const LayoutBanner = styled.div<LayoutBannerProps>`
	@media (max-width: 640px) {
		padding: 0 8px 124px;
	}
	padding: 0 48px 124px;
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	margin: auto;
	background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : Colors.lysBlå)};
`;

export const Container = styled.div`
	max-width: 880px;
	margin: 0 auto;
	border-width: 0;
	border-style: solid;
	border-color: currentColor;
	min-height: 100vh;
`;

export const StyledA = styled.a`
	text-decoration: none;

	:focus {
		outline: 3px solid ${Colors.mørkSort};
		box-shadow: 0 0 6px 2px rgba(53, 62, 67, 0.08);
	}

	:hover {
		box-shadow: 0 0 8px 4px rgba(53, 62, 67, 0.3);
	}
`;

export const HoverStyle = css`
	:hover {
		outline: ${offset} solid ${Colors.mørkSort};
		outline-offset: -${offset};
		box-shadow: 0 0 6px 2px rgba(53, 62, 67, 0.08);
	}

	:focus-visible,
	:focus-within {
		outline: ${offset} solid ${Colors.mørkSort};
		outline-offset: -${offset};
		box-shadow: 0 0 6px 2px rgba(53, 62, 67, 0.08);
	}
`;

export const FocusVisibleOffsetStyle = css`
	:focus-visible {
		outline: ${offset} solid ${Colors.mørkSort};
		outline-offset: -${offset};
		box-shadow: 0 0 6px 2px rgba(53, 62, 67, 0.08);
	}
`;

export const FocusVisibleStyle = css`
	:focus-visible {
		outline: 3px solid ${Colors.oransje} !important;
	}
`;

export const FocusVisibleStyleNegativeOffset = css`
	:focus-visible {
		outline: 3px solid ${Colors.oransje};
		outline-offset: -5px;
		border-radius: 15px;
	}
`;

export const ButtonFocusStyle = css`
	:focus {
		outline: 3px solid ${Colors.oransje};
		border-radius: 2px;
	}
`;

export const FocusBorder = styled.div<{ focus: boolean; circle?: boolean }>`
	padding: 2px;
	border: none;
	background-color: transparent !important;
	color: transparent;
	${({ focus }) =>
		focus &&
		css`
			outline: 3px solid ${Colors.oransje};
		`};
	${({ circle = false }) =>
		circle &&
		css`
			border-radius: 50%;
		`};
`;

/**
 * Brukes til å gjemme tekst som er for lang i forhold til sin container.<br/>
 * Se link for forklaring: https://css-tricks.com/almanac/properties/t/text-overflow/
 * Brukes ved å legge til det som ligger på neste linje i en Styled Component.<br/>
 * ${EllipsisTExt}
 * Container-en til teksten som bruker EllipsisText må ha EllipsisContainer for at
 * teksten skal få Ellipsis.
 */
export const EllipsisContainer = css`
	overflow: hidden;
	white-space: nowrap;
`;

export const EllipsisText = css`
	text-overflow: ellipsis;
	${EllipsisContainer};
`;
/**
 * Brukes til å gjemme tekst som er for lang i forhold til sin container. <br/>
 * antallLinjer {@link number} - Antall linjer som skal vises før teksten blir gjemt. 2 er default. <br/>
 * antallLinjer prop-en sendes inn i Styled Component-en som skal bruke EllipsisTextMultiline. <br/>
 */
export const EllipsisTextMultiline = css<{ antallLinjer: number }>`
	${({ antallLinjer = 2 }) => css`
		@supports (-webkit-line-clamp: ${antallLinjer}) {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: initial;
			display: -webkit-box;
			-webkit-line-clamp: ${antallLinjer};
			-webkit-box-orient: vertical;
		}
	`};
`;
