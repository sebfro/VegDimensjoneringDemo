import { FC } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { Colors } from '../../../styles/colors';
import SvgGetter from '../SVG/SvgGetter/SvgGetter.tsx';
import { LabelTekst } from '../TekstKomponenter.ts';
import ViktigInformasjonUtvidet from './ViktigInformasjonUtvidet.tsx';

interface EksisterendeBilderProps {
	tittel?: string;
	besrkivelse?: string;
}

const EksisterendeBilderKort: FC<EksisterendeBilderProps> = ({
	tittel = 'Eksisterende bilder',
	besrkivelse = 'Her kan du se alle bildene som allerede ligger i mappen.',
}) => {
	return (
		<ViktigInformasjonUtvidet tittel={tittel} beskrivelse={besrkivelse}>
			<Forklaring>
				<div />
				<LabelTekst>Antall nye bilder</LabelTekst>
				<KurvetPilNed wrapSvg icon={'KurvetPil'} størrelse='liten' />
				<StyledStatusLoader wrapSvg icon={'StatusLoader'} />
				<PLaceholder backgroundColor={Colors.hvit} />
				<XBilder>X bilder</XBilder>
				<SvgGetter icon={'IngenNyeBilder'} wrapSvg />
				<PLaceholder />
				<PLaceholder />
				<KurvetPilOpp wrapSvg icon={'KurvetPil'} størrelse='liten' />
				<LabelTekst>Ingen nye bilder</LabelTekst>
			</Forklaring>
		</ViktigInformasjonUtvidet>
	);
};

export default EksisterendeBilderKort;

const Forklaring = styled.div`
	display: grid;
	gap: 1rem;
	grid-template-columns: 2.5rem 2fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
	justify-items: center;
	align-items: center;
	padding: 0 2rem 0 1.5rem;
	p {
		white-space: nowrap;
	}
`;

const KurvetPilOpp = styled(SvgGetter)`
	rotate: 180deg;
	position: relative;
	left: 9px;
	bottom: 11px;
`;

const KurvetPilNed = styled(SvgGetter)`
	position: relative;
	right: 12px;
	top: 12px;
`;

const PLaceholder = styled.div<{ backgroundColor?: CSSProperties['backgroundColor'] }>`
	${({ backgroundColor = Colors.grå }) =>
		backgroundColor && `background-color: ${backgroundColor};`}
	width: 100%;
	height: 0.5625rem;
	border-radius: 0.5rem;
`;

const XBilder = styled(LabelTekst)`
	color: ${Colors.grå};
`;

const StyledStatusLoader = styled(SvgGetter)`
	width: 32px;
	height: 32px;
`;
