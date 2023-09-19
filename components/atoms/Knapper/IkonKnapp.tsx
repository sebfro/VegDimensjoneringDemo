import { FC } from 'react';
import { Icons } from '../SVG/SvgGetter/Icons';
import Button, { ButtonProps } from './Button';
import styled, { css, CSSProperties, ThemedStyledProps } from 'styled-components';
import { Colors } from '../../../styles/colors';
import SvgGetter from '../SVG/SvgGetter/SvgGetter';
import { HovedKnappCss } from './FellesCss.ts';

type KnappType = 'hoved' | 'gjennomsiktig';

type IkonPositionType = 'venstre' | 'høyre';

interface IkonKnappProps extends ButtonProps {
	ikon: Icons;
	ikonFarge?: CSSProperties['color'];
	knappType?: KnappType;
	ikonPosisjon?: IkonPositionType;
}

/**
 * @param ikon Hvilket ikon som skal brukes
 * @param ikonFarge Fargen på ikonet
 * @param ikonPosisjon Om ikonet skal være på høyre eller venstre side. Høyre er default.
 * @param knappType Enten Hoved eller gjennomsiktig. Hoved er default
 * @param className
 * @param tekst Teksten som skal vises
 * @param props Samme som det som ligger i ButtonProps. Hovedsaklig: React.ButtonHTMLAttributes<HTMLButtonElement>
 * @constructor
 */
const IkonKnapp: FC<IkonKnappProps> = ({
	ikon,
	ikonFarge = Colors.hvit,
	ikonPosisjon = 'høyre',
	knappType = 'hoved',
	className,
	tekst,
	...props
}) => {
	let styling: ThemedStyledProps<any, any> = css`
		background-color: ${Colors.oransje};
		color: ${Colors.hvit};
	`;
	switch (knappType) {
		case 'hoved':
			styling = css`
				background-color: ${Colors.oransje};
				color: ${Colors.hvit};
				border-color: ${Colors.oransje};
				height: 64px;
				${HovedKnappCss};
			`;
			break;
		case 'gjennomsiktig':
			styling = css`
				background-color: transparent;
				color: ${Colors.hvit};
				height: 40px;
				padding: 0 1rem 0 0;
				border: none;

				:focus-within {
					outline: 3px solid ${Colors.oransje};
					outline-offset: 3px;
					background: #030405;
				}

				:hover {
					background: #030405;
				}

				:focus-visible {
					outline: 1px solid ${Colors.oransje};
					background-color: transparent;
				}
			`;
	}
	return (
		<StyledButton
			{...props}
			styling={styling}
			tekst={tekst}
			className={className}
			ikonPosisjon={ikonPosisjon}
		>
			<StyledSvgGetter pathFill={ikonFarge} icon={ikon} wrapSvg={true} />
		</StyledButton>
	);
};

export default IkonKnapp;

const StyledButton = styled(Button)<{
	styling: ThemedStyledProps<any, any>;
	ikonPosisjon: IkonPositionType;
}>`
	height: 2.5rem;
	${({ styling }) => styling}
	display: flex;
	align-items: center;
	width: fit-content;
	white-space: nowrap;
	${({ ikonPosisjon }) =>
		ikonPosisjon === 'høyre' &&
		css`
			flex-direction: row-reverse;
		`};
`;

const StyledSvgGetter = styled(SvgGetter)``;
