import React from 'react';
import styled, { css, CSSProperties } from 'styled-components';
import { Icons } from '../SVG/SvgGetter/Icons.ts';
import SvgGetter from '../SVG/SvgGetter/SvgGetter.tsx';
import { TextStyles } from '../../../styles/TextStyles.ts';
import { ButtonFocusStyle } from '../StyledComponents/Common.ts';
import { Colors } from '../../../styles/colors.ts';
import { Loader } from '../loading/Loader.tsx';

export interface SecondaryButtonProps {
	onClick?: (e: any) => void;
	tekst: string;
	label?: string;
	icon?: Icons;
	iconColor?: CSSProperties['color'];
	justifyContent?: CSSProperties['justifyContent'];
	className?: string;
	border?: boolean;
	type?: 'button' | 'submit' | 'reset' | undefined;
	loading?: boolean;
	disabled?: boolean;
	width?: CSSProperties['width'];
}
const SekundærKnapp: React.FC<SecondaryButtonProps> = ({
	onClick,
	tekst,
	label = 'button',
	icon,
	iconColor,
	className = '',
	justifyContent = 'center',
	border = true,
	type = 'button',
	loading = false,
	disabled = false,
	width = '100%',
}) => {
	return (
		<Button
			border={border}
			onClick={onClick}
			type={type}
			className={className}
			disabled={loading || disabled}
			justifyContent={justifyContent}
			aria-label={label}
			width={width}
		>
			{icon && <SvgGetter icon={icon} fill={iconColor} />}
			{tekst}
			{loading && <Loader size='button' />}
		</Button>
	);
};

export default SekundærKnapp;

interface ButtonProps {
	border: boolean;
	justifyContent: CSSProperties['justifyContent'];
	width?: CSSProperties['width'];
}

const Button = styled.button<ButtonProps>`
	width: ${({ width }) => width};
	padding: 1px 40px;
	white-space: nowrap;
	${TextStyles.Knapp};
	${ButtonFocusStyle};
	:disabled {
		opacity: 50%;
	}
	${({ border }) =>
		border
			? css`
					border: 2px solid ${Colors.primaryTekst};
			  `
			: css`
					border: none;
			  `};
	color: ${Colors.primaryTekst};
	background-color: white;
	:hover {
		border-width: 3px;
		padding: 0 39px;
	}
	:active {
		background-color: ${Colors.lysGrå};
	}
	display: flex;
	column-gap: 12px;
	justify-content: ${({ justifyContent }) => justifyContent};
	height: 3em;
	align-items: center;
	:hover {
		cursor: pointer;
	}
`;
