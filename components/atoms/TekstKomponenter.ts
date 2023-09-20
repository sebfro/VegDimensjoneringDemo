import styled, { css, CSSProperties } from 'styled-components';
import { TextStyles } from '../../styles/TextStyles';

const {
	BodyMedium,
	BodyStor,
	BodyLiten,
	TittelMedium,
	TittelLiten,
	TittelStor,
	Nummer,
	LabelType,
	Knapp,
} = TextStyles;
export const TittelStorTekst = styled.h1`
	${TittelStor};
`;
export const TittelMediumTekst = styled.h2`
	${TittelMedium};
`;
export const TittelLitenTekst = styled.h3`
	${TittelLiten};
`;
export const BodyStorTekst = styled.p`
	${BodyStor};
`;
export const BodyMediumTekst = styled.p<{ farge?: CSSProperties['color'] }>`
	${(props) =>
		props.farge &&
		css`
			color: ${props.farge};
		`};
	${BodyMedium};
`;
export const BodyLitenTekst = styled.p<{ farge?: CSSProperties['color'] }>`
	${(props) =>
		props.farge &&
		css`
			color: ${props.farge};
		`};
	${BodyLiten};
`;
export const KnappTekst = styled.p`
	${Knapp};
`;
export const NummerTekst = styled.p`
	${Nummer};
`;
export const LabelTekst = styled.p`
	${LabelType};
`;
