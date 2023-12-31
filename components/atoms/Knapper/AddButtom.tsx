import React from 'react';
import styled, { css } from 'styled-components';
import { Icons } from '../SVG/SvgGetter/Icons.ts';
import SvgGetter from '../SVG/SvgGetter/SvgGetter.tsx';
import { TextStyles } from '../../../styles/TextStyles.ts';
import { Colors } from '../../../styles/colors.ts';

interface ButtonWithDottedLineProps {
	icon: Icons;
	onClickCallback?: () => void;
	tekst?: string;
	className?: string;
}

export const AddButtom: React.FC<ButtonWithDottedLineProps> = ({
	icon,
	onClickCallback,
	tekst,
	className,
}) => {
	return (
		<StyledButton onClick={onClickCallback} className={className}>
			<SvgGetter icon={icon} pathFill={Colors.primaryTekst} wrapSvg />
			<p>{tekst}</p>
		</StyledButton>
	);
};

const CommonStyling = css`
	display: flex;
	column-gap: 1em;

	p {
		${TextStyles.BodyLiten};
	}

	border: 2px dashed ${Colors.primaryTekst};
	width: 100%;
	padding: 2.5rem;
	justify-content: center;
	align-items: center;

	background-color: white;

	:hover {
		background-color: #e9e9e9;
		cursor: pointer;
	}

	:focus-within {
		outline: 3px solid ${Colors.oransje};
		border-radius: 2px;
		outline-offset: -3px;
	}
`;

const StyledButton = styled.button`
	${CommonStyling};
`;
