import { FC, SVGProps } from 'react';
import styled, { css, ThemedStyledProps } from 'styled-components';
import { IconMap, Icons } from './Icons';

type StørrelseType = 'liten' | 'medium' | 'stor';

export interface SvgProps extends SVGProps<SVGSVGElement> {
	pathFill?: string;
}

export interface SvgGetterProps extends SvgProps {
	icon: Icons;
	className?: string;
	svgWrapperStyling?: ThemedStyledProps<any, any>;
	wrapSvg?: boolean;
	størrelse?: StørrelseType;
}

/**
 * Henter SVG fra IconMap og returnerer den som en komponent
 * @param icon <br/>
 * @param pathFill fargen til ikonet <br/>
 * @param scale {number} skalering av ikonet <br/>
 * @param className for å bruke SvgGetter som en styledComponent. Da må WrapSvg være satt til true <br/>
 * @param svgWrapperStyling for å sende inn en css`` fra styledComponent istendenfor å lage en styledcomponent av SvgGetter.
 * WrapSvg må være true <br/>
 * @param wrapSvg {@link boolean} default true. Wrapper svg-en i en div. <br/>
 * @param størrelse default medium. Størrelse på Wrapperen rundt svg-en. Svg-en skalerer basert på den <br/>
 * @constructor <br/>
 */
const SvgGetter: FC<SvgGetterProps> = ({
	icon,
	pathFill,
	className,
	svgWrapperStyling,
	wrapSvg = false,
	størrelse = 'medium',
	...props
}) => {
	const NewSelectedSvg = IconMap.get(icon);

	const hentConatinerStørrelse = () => {
		switch (størrelse) {
			case 'liten':
				return '1.5rem';
			case 'medium':
				return '2.5rem';
			case 'stor':
				return '4rem';
		}
	};

	if (NewSelectedSvg) {
		return wrapSvg ? (
			<SvgWrapper
				størrelse={hentConatinerStørrelse()}
				className={className}
				styling={svgWrapperStyling}
			>
				<NewSelectedSvg pathFill={pathFill} {...props} />
			</SvgWrapper>
		) : (
			<NewSelectedSvg />
		);
	}
};

export default SvgGetter;

const SvgWrapper = styled.div<{ størrelse: string; styling?: ThemedStyledProps<any, any> }>`
	${({ størrelse }) =>
		css`
			width: ${størrelse};
			height: ${størrelse};
		`};
	display: flex;
	align-items: center;
	justify-content: center;
	${({ styling }) => styling};
`;
