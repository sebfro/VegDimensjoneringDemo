import { forwardRef, useMemo } from 'react';
import styled, { css, CSSProperties } from 'styled-components';
import { Colors } from '../../../styles/colors.ts';

export type LoadingProps = {
	/**Description for loading*/
	size?: 'small' | 'button' | 'default';
	className?: string;
	color?: CSSProperties['color'];
};

interface SpinnerProps {
	containerWidth: string;
	containerHeight: string;
	spinnerWidth: string;
	spinnerHeight: string;
}

function LoaderComponent({ size, className, color = Colors.oransje }: LoadingProps, ref: any) {
	const SpinnerSize: SpinnerProps = useMemo(() => {
		switch (size) {
			case 'small':
				return {
					containerWidth: '30px',
					containerHeight: '30px',
					spinnerWidth: '16px',
					spinnerHeight: '16px',
				} as SpinnerProps;
			case 'button':
				return {
					containerWidth: '38px',
					containerHeight: '38px',
					spinnerWidth: '25px',
					spinnerHeight: '25px',
				} as SpinnerProps;
			default:
				return {
					containerWidth: '100%',
					containerHeight: '64px',
					spinnerWidth: '51px',
					spinnerHeight: '51px',
				} as SpinnerProps;
		}
	}, [size]);

	return (
		<StyledLoading className={className} ref={ref} defaultStyle={size === 'default'}>
			<Spinner {...SpinnerSize} color={color}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</Spinner>
		</StyledLoading>
	);
}

export const Loader = forwardRef(LoaderComponent);

export const StyledLoading = styled.div<{ defaultStyle: boolean }>`
	text-align: center;
	opacity: 1 !important;
	${({ defaultStyle }) => {
		return (
			defaultStyle &&
			css`
				top: 50%;
				left: calc(50% - 64px);
				position: absolute;
				width: 128px;
				z-index: 99;
			`
		);
	}}
	text-align: center;
	font-size: 1rem;
`;

const Spinner = styled.div<{ color: CSSProperties['color'] } & SpinnerProps>`
	display: flex;
	position: relative;
	width: ${({ containerWidth }) => containerWidth};
	height: ${({ containerHeight }) => containerHeight};
	justify-content: center;

	> div {
		display: block;
		position: absolute;
		width: ${({ spinnerWidth }) => spinnerWidth};
		height: ${({ spinnerHeight }) => spinnerHeight};
		margin: 6px;
		${({ color }) => css`
			border: 2px solid ${color};
		`}
		border-radius: 50%;
		animation: rotate-360 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		${({ color }) => css`
			border-color: ${color} transparent transparent transparent;
		`}
	}

	div:nth-child(1) {
		animation-delay: -0.45s;
	}

	div:nth-child(2) {
		animation-delay: -0.3s;
	}

	div:nth-child(3) {
		animation-delay: -0.15s;
	}

	@keyframes rotate-360 {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
