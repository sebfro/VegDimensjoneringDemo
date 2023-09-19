import { FC } from 'react';
import { Colors } from '../../../styles/colors';
import { MålebilAnimasjon } from './MålebilAnimasjon';
import { BodyMediumTekst } from '../TekstKomponenter';
import styled, { css, CSSProperties } from 'styled-components';

/**
 * Returnerer children som sendes inn Wrappet i en container som legger ett
 * opacity lag på toppen med en en Loader. Denne varer frem til loading blir false.
 * @param loading
 * @param children
 * @constructor <LoaderOverlay loading={boolean}>{ReactElement/HTML tags}</LoaderWrapper>
 */
interface OverlayProps {
	loading: boolean;
	children: any;
	className?: string;
	top?: CSSProperties['height'];
	right?: CSSProperties['width'];
	beskrivelse?: string;
}

export const MålebilOverlay: FC<OverlayProps> = ({
	loading,
	children,
	className,
	top = '50%',
	right = '50%',
	beskrivelse = 'Klargjør vegbilder for opplastning',
}) => {
	return (
		<Wrapper className={className}>
			{loading && (
				<>
					<StyledLoading top={top} right={right} halfWidth={'200px'}>
						<MålebilAnimasjon height={'fit-content'} />
						<Tekst>{beskrivelse}</Tekst>
					</StyledLoading>
					<OpacityLayer />
				</>
			)}
			{children}
		</Wrapper>
	);
};

const Wrapper = styled.div<{ width?: string; height?: string }>`
	position: relative;
	height: 100dvh;
`;

const OpacityLayer = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 19;
	background-color: ${Colors.sort};
`;

const StyledLoading = styled.div<{
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
	height: 100dvh;
`;

const Tekst = styled(BodyMediumTekst)`
	text-align: center;
`;
