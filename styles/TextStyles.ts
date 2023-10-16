import { css } from 'styled-components';

// Samme som LEFT Etica Regular. Se globals.xss
const LftEtica = css`
	font-family: 'LFT Etica', sans-serif;
	font-style: normal;
`;

const LftEticaLight = css`
	font-family: 'LFT Etica', sans-serif;
	font-style: normal;
`;
export const LftEticaSemiBold = css`
	font-family: 'LFT Etica', sans-serif;
	font-style: normal;
`;

export const TextStyles = {
	TittelStor: css`
		${LftEtica};
		font-weight: 600;
		font-size: 3rem;
		line-height: 3.5rem;
	`,
	TittelMedium: css`
		${LftEtica};
		font-weight: 600;
		font-size: 2rem;
		line-height: 2rem;
	`,
	TittelLiten: css`
		${LftEtica};
		font-weight: 400;
		font-size: 1.5rem;
		line-height: 2rem;
	`,
	BodyStor: css`
		${LftEtica};
		font-weight: 400;
		font-size: 2rem;
		line-height: 2.5rem;
	`,
	BodyMedium: css`
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.5rem;
	`,
	BodyLiten: css`
		${LftEticaLight};
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.5rem;
	`,
	Knapp: css`
		${LftEticaLight};
		font-weight: 600;
		font-size: 1.5rem;
		line-height: 2rem;
		letter-spacing: 0.0075rem;
	`,
	Nummer: css`
		${LftEtica};
		font-weight: 300;
		font-size: 3.5rem;
		line-height: 4rem;
	`,
	LabelType: css`
		${LftEtica};
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.5rem;
	`,
	PlaceholderType: css`
		font-size: 1rem;
		font-style: italic;
		font-weight: 300;
		line-height: 1.5rem; /* 150% */
	`,
};
