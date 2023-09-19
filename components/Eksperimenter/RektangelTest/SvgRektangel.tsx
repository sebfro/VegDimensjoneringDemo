import { FC } from 'react';
import styled, { css, CSSProperties } from 'styled-components';

interface SvgRektangelProps {
	høyde: number;
	indent: number;
	color: CSSProperties['fill'];
}

export const SvgRektangel: FC<SvgRektangelProps> = (props) => {
	return (
		<StyledSvg høyde={props.høyde} indent={props.indent}>
			<rect x='0' y='0' {...props} fill={props.color} />
			{/*<circle cx='50' cy='50' r='30' fill='white' />*/}
		</StyledSvg>
	);
};

const StyledSvg = styled.svg<{ høyde: number; indent: number }>`
	rect {
		height: ${(props) => props.høyde}px;
		${({ indent }) => css`
			width: calc(100% - ${indent}px);
		`};
	}

	height: ${(props) => props.høyde}px;
	// ${({ indent }) => css`
		// 	width: calc(100% - ${indent}px);
		//
	`};
	border-top-right-radius: 5px;
`;
