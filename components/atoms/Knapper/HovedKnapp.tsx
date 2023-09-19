import React from 'react';
import styled, { css, CSSProperties } from 'styled-components';

import { Colors } from '../../../styles/colors.ts';
import { TextStyles } from '../../../styles/TextStyles.ts';
import SvgGetter from '../SVG/SvgGetter/SvgGetter.tsx';
import { Icons } from '../SVG/SvgGetter/Icons.ts';
import { Loader } from '../loading/Loader.tsx';
import { ButtonFocusStyle } from '../StyledComponents/Common.ts';

export interface PrimaryButtonProps {
	onClick?: (e: any) => void;
	tekst: string;
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
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	onClick,
	tekst,
	icon,
	iconColor,
	className = '',
	justifyContent = 'center',
	border = false,
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
			loadingState={loading}
			disabled={loading || disabled}
			justifyContent={justifyContent}
			width={width}
		>
			{icon && <SvgGetter icon={icon} fill={iconColor} />}
			{tekst}
			{loading && <Loader size='button' />}
		</Button>
	);
};

export default PrimaryButton;

interface ButtonProps {
	border: boolean;
	loadingState: boolean;
	justifyContent: CSSProperties['justifyContent'];
	width?: CSSProperties['width'];
}

const Button = styled.button<ButtonProps>`
	width: ${({ width }) => width};
	padding: 4px 40px;
	white-space: nowrap;
	justify-content: ${({ justifyContent }) => justifyContent};
	${TextStyles.Knapp};
	${ButtonFocusStyle};
	:disabled {
		opacity: 50%;
	}
	border: ${({ border }) => (border ? '2px solid ${Colors.primary.darkGray}' : 'none')};
	color: white;
	background-color: ${Colors.primaryTekst};
	:hover {
		border-bottom: 2px solid ${Colors.oransje};
		background-color: black;
		padding: 4px 40px 2px;
	}
	:focus {
		background-color: black;
	}
	:active {
		background-color: ${Colors.primaryTekst};
	}
	display: flex;
	column-gap: 12px;
	height: 3em;
	align-items: center;
	:hover {
		cursor: pointer;
	}
	${({ loadingState }) =>
		loadingState &&
		css`
			background-color: ${Colors.grå};
			padding: 0 21px;
			column-gap: 0;
		`}
`;
