import { FC, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import Kort from '../Kort';
import SvgGetter from '../SVG/SvgGetter/SvgGetter';
import { BodyMediumTekst } from '../TekstKomponenter';
import IkonKnapp from '../Knapper/IkonKnapp';
import { Colors } from '../../../styles/colors.ts';
import ViktigInformasjonUtvidet from './ViktigInformasjonUtvidet.tsx';

interface InformasjonMeldingprops {
	tittel: string;
	beskrivelse: string;
	className?: string;
	kanUtvides?: boolean;
}

const ViktigInformasjon: FC<InformasjonMeldingprops> = ({
	tittel,
	beskrivelse,
	className,
	kanUtvides = true,
}) => {
	const [erÅpen, setErÅpen] = useState(false);
	const handleÅpne = useCallback(() => {
		setErÅpen(!erÅpen);
	}, [erÅpen]);
	if (erÅpen) {
		return (
			<ViktigInformasjonUtvidet
				onClick={handleÅpne}
				tittel={tittel}
				beskrivelse={beskrivelse}
				className={className}
			/>
		);
	} else {
		return (
			<StyledKort erÅpen={erÅpen} className={className}>
				<TekstOgIkon>
					<StyledSvgGetter pathFill={Colors.oransje} icon={'Advarsel'} wrapSvg størrelse={'stor'} />
					<BodyMediumTekst>{tittel}</BodyMediumTekst>
				</TekstOgIkon>
				{kanUtvides && (
					<StyledIkonKnapp
						ikon={'Utvid'}
						tekst={'Les mer'}
						onClick={handleÅpne}
						knappType='gjennomsiktig'
					/>
				)}
			</StyledKort>
		);
	}
};

export default ViktigInformasjon;

const StyledKort = styled(Kort)<{ erÅpen: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	${({ erÅpen }) =>
		erÅpen &&
		css`
			height: 100rem;
		`};
	padding: 1.5rem 1rem;
	border: none;
	gap: 1.5rem;
`;

const TekstOgIkon = styled.div`
	display: flex;
	align-items: inherit;
	gap: 0.5rem;
`;

const StyledIkonKnapp = styled(IkonKnapp)``;

const StyledSvgGetter = styled(SvgGetter)`
	padding: 1rem;
`;
