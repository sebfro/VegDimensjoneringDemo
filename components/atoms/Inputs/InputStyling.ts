import styled, { css } from 'styled-components';
import { TextStyles } from '../../../styles/TextStyles.ts';
import { Colors } from '../../../styles/colors.ts';
import { ButtonFocusStyle, HoverStyle } from '../StyledComponents/Common.ts';

export const CommonInputStyling = css`
	${TextStyles.BodyMedium};
	${HoverStyle};
	color: ${Colors.mørkSort};
	border: 2px solid ${Colors.sort};
	padding: 16px;

	::placeholder,
	input::placeholder {
		${TextStyles.LabelType}
	}
`;

// Dropdown / Select styling
export const SelectStyling = css`
	select {
		${TextStyles.BodyMedium};
		width: 100%;
		border: 2px solid #97989b;
		height: 48px;
		background-color: white;
		color: ${Colors.mørkSort};
		${ButtonFocusStyle};
		${HoverStyle};
		padding: 0 0 0 16px;

		:hover {
			cursor: pointer;
		}
	}
`;

export const SelectWrapper = styled.div<{ placeholderSelected: boolean; error?: boolean }>`
	.default {
		color: #97989b;
		${TextStyles.LabelType};
	}

	${SelectStyling};

	select {
		${({ error }) =>
			error &&
			css`
				border-color: ${Colors.rød};
			`};
		${({ placeholderSelected }) =>
			placeholderSelected &&
			css`
				${TextStyles.LabelType};
			`}
	}
`;

export const StyledOption = styled.option`
	padding: 0 10px;
	margin: 16px;
	// Brukes til å overkjøre placeholder styling på de andre Options.
	font-style: normal;
	color: ${Colors.mørkSort};

	:hover {
		color: ${Colors.lysBlå};
		font-weight: 600;
		cursor: pointer;
	}
`;

export const DropdownArrowContainer = styled.span`
	position: absolute;
	top: 5px;
	right: 5px;
	background-color: white;
	height: 40px;
	width: 35px;
	display: grid;
	place-items: center;
	pointer-events: none;
`;
// Dropdown / Select styling
