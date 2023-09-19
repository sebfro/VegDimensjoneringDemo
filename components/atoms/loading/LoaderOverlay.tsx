import { FC, useRef } from 'react';
import { Loader, LoadingProps } from './Loader';
import styled, { css, CSSProperties } from 'styled-components';

/**
 * Returnerer children som sendes inn Wrappet i en container som legger ett
 * opacity lag på toppen med en en Loader. Denne varer frem til loading blir false.
 * @param loading
 * @param children
 * @param description
 * @param props
 * @constructor <LoaderOverlay loading={boolean} description={string}>{ReactElement/HTML tags}</LoaderWrapper>
 */
interface LoaderOverlayProps extends LoadingProps {
	loading: boolean;
	children: any;
	className?: string;
	top?: CSSProperties['height'];
	right?: CSSProperties['width'];
}

const LoaderOverlay: FC<LoaderOverlayProps> = ({
	loading,
	children,
	className,
	top = '50%',
	right = '50%',
	...props
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const halfWidth = ref.current?.clientWidth ? ref.current?.clientWidth / 2 + 'px' : '61.5px';

	return (
		<Wrapper className={className}>
			{loading && (
				<>
					<StyledLoading top={top} right={right} ref={ref} halfWidth={halfWidth} {...props} />
					<OpacityLayer />
				</>
			)}
			{children}
		</Wrapper>
	);
};

export default LoaderOverlay;

const Wrapper = styled.div<{ width?: string; height?: string }>`
	position: relative;
	height: 100dvh;
`;

const OpacityLayer = styled.div`
	opacity: 0.6;
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 19;
	background-color: white;
`;

const StyledLoading = styled(Loader)<{
	top: CSSProperties['height'];
	right: CSSProperties['width'];
	halfWidth: CSSProperties['width'];
}>`
	position: absolute;
	z-index: 20;
	/**
	Trekker fra halvparten av bredden og høyden til loader for å plassere
	den riktig innenfor Wrapper
	 */
	${({ top, right, halfWidth }) =>
		css`
			top: calc(${top} - 64px);
			right: calc(${right} - ${halfWidth});
		`};
`;
