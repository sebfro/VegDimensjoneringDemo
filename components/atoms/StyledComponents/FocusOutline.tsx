import { FC } from 'react';
import styled, { css, CSSProperties } from 'styled-components';
import { Colors } from '../../../styles/colors';

interface FocusOutlineProps {
	children: JSX.Element;
	className?: string;
	focus?: boolean;
	offset?: number;
	height?: CSSProperties['height'];
	circle?: boolean;
}

/**
 * Legger på en outline ved focus-within event. Tar ikke mer enn komponenten
 * den wrappes rundt eller hadde gjort. <br/>
 * @param foramtering <br/>
 * @param offset Bestemmer --position-offset og --width-height-offset.<br/>
 * --position-offset må være halvparten av --width-height-offset og være negativ<br/>
 * F.eks. hvis --width-height-offset er 10 så må --position-offset være -5<br/>
 * @param children <br/>
 * @param height Sett denne hvis outline ikke plasser seg riktig. Gjelder hovedsaklig textarea. <br/>
 * @param focus Bruk denne hvis du vil at outline skal vises uten at :focus-within trigger på denne komponenten <br/>
 * @param circle Bruk denne hvis du vil at outline skal være en sirkel <br/>
 * @constructor <FocusOutline> <input/> </FocusOutline> <br/>
 */
const FocusOutline: FC<FocusOutlineProps> = ({
	children,
	className,
	focus,
	offset = 10,
	height = '100%',
	circle = false,
}) => {
	return (
		<Wrapper className={className} focus={focus}>
			{children}
			<Outline offset={offset} height={height} circle={circle} />
		</Wrapper>
	);
};

export default FocusOutline;

export const Outline = styled.div<{
	height: CSSProperties['height'];
	offset?: number;
	circle?: boolean;
}>`
	z-index: 2;
	display: none;
	position: absolute;
	--position-offset: ${({ offset = 10 }) => `-${offset / 2}px`};
	top: var(--position-offset);
	left: var(--position-offset);
	--width-height-offset: ${({ offset = 10 }) => offset + 'px'};
	${({ height }) => css`
		height: calc(${height} + var(--width-height-offset));
	`};
	width: calc(100% + var(--width-height-offset));
	border: 3px solid ${Colors.oransje};
	pointer-events: none;
	${({ circle }) =>
		circle &&
		css`
			border-radius: 50%;
		`};
`;

const Wrapper = styled.div<{ focus?: boolean }>`
	position: relative;
	${({ focus }) =>
		focus
			? css`
					${Outline} {
						display: unset;
					}
			  `
			: css`
					:focus-within {
						${Outline} {
							display: unset;
						}
					}
			  `};
`;
