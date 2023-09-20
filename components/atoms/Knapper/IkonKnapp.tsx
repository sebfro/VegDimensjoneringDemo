import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { Icons } from '../SVG/SvgGetter/Icons.ts';
import { Colors } from '../../../styles/colors.ts';
import SvgGetter from '../SVG/SvgGetter/SvgGetter.tsx';
import FocusOutline from '../StyledComponents/FocusOutline.tsx';
import { Loader } from '../loading/Loader.tsx';
import { TextStyles } from '../../../styles/TextStyles.ts';

interface CircleButtonProps {
	ikon: Icons;
	onClick?: (e: any) => void;
	className?: string;
	tekst?: string;
	href?: string;
	downloadFileName?: string;
	svgColor?: string;
	iconSize?: number;
	backgroundColor?: string;
	border?: boolean;
	circle?: boolean;
	label?: string;
	type?: 'button' | 'submit';
	useStroke?: boolean;
	loading?: boolean;
	disabled?: boolean;
}
const IconButton: React.FC<CircleButtonProps> = ({
	ikon,
	onClick,
	className,
	tekst,
	href,
	downloadFileName,
	svgColor = Colors.primaryTekst,
	iconSize = 40,
	backgroundColor = 'white',
	border = true,
	circle = true,
	label = 'default-label',
	type = 'button',
	useStroke = false,
	loading = false,
	disabled = false,
}) => {
	const [focus, setFocus] = useState(false);

	const updateFocusState = useCallback((value: boolean) => {
		setFocus(value);
	}, []);
	const ButtonProps = {
		useStroke: useStroke,
		onFocus: () => updateFocusState(true),
		onBlur: () => updateFocusState(false),
		backgroundColor: backgroundColor,
		border: border,
		circle: circle,
		iconSize: iconSize,
		'aria-label': label,
		disabled,
	};

	const IconWithText = (
		<>
			<SvgGetter fill={svgColor} icon={ikon} />
			{tekst && <p>{tekst}</p>}
		</>
	);
	let LinkElement = undefined;
	if (href) {
		LinkElement = downloadFileName ? (
			<DownloadLink {...ButtonProps} href={href} download={downloadFileName} className={className}>
				{IconWithText}
			</DownloadLink>
		) : (
			<AhrefWrapper {...ButtonProps} href={href}>
				{IconWithText}
			</AhrefWrapper>
		);
	}

	return (
		<FocusOutline className={className} circle focus={focus} offset={10}>
			{LinkElement ? (
				LinkElement
			) : (
				<ButtonWrapper {...ButtonProps} onClick={onClick} type={type}>
					{IconWithText}
					{loading && <Loader size='button' />}
				</ButtonWrapper>
			)}
		</FocusOutline>
	);
};

export default IconButton;

interface IconButtonStylingProps {
	backgroundColor: string;
	border: boolean;
	circle: boolean;
	iconSize: number;
	useStroke?: boolean;
	disabled?: boolean;
}

const IconButtonStyling = css<IconButtonStylingProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	column-gap: 0.5em;
	p {
		margin: 0.6em 0 0;
	}
	${({ circle }) =>
		circle &&
		css`
			border-radius: 100%;
		`}
	${({ border }) =>
		border
			? css`
					border: 2px solid ${Colors.sort};
			  `
			: css`
					border: none;
			  `};
	background-color: ${({ backgroundColor }) => backgroundColor};

	:hover {
		cursor: pointer;
		border: 3px solid ${Colors.primaryTekst};
		path {
			${({ useStroke = false }) =>
				useStroke
					? css`
							stroke: ${Colors.primaryTekst};
					  `
					: css`
							fill: ${Colors.primaryTekst};
					  `}
		}
	}
	${({ iconSize }) =>
		iconSize
			? css`
					width: ${iconSize.toString() + 'px'};
					height: ${iconSize.toString() + 'px'};
			  `
			: css`
					width: min-content;
					height: min-content;
			  `};
`;

const AhrefWrapper = styled.a`
	${IconButtonStyling}
`;

const DownloadLink = styled.a`
	${IconButtonStyling};
	width: fit-content;
	justify-content: flex-start;
	:hover {
		border: none;
	}
	p {
		${TextStyles.Knapp};
		color: ${Colors.primaryTekst};
		text-decoration: underline;
		text-underline-offset: 5px;
		text-underline-color: ${Colors.grå};
		text-decoration-thickness: 1px;
	}
`;

const ButtonWrapper = styled.button`
	${IconButtonStyling}
`;
