import { FC } from 'react';
import { BaseModalProps, KnappeRad, Modal } from '../Modal';
import styled, { css } from 'styled-components';
import InfoMelding from '../InformasjonMeldinger/InfoMelding.tsx';

interface AvbrytOpplastingProps extends BaseModalProps {
	error?: boolean;
}

const AvbrytOpplasting: FC<AvbrytOpplastingProps> = (props) => {
	return (
		<StyledModal
			tekster={{
				tittel: 'Avbryt opplasting',
				beskrivelse:
					'Er du sikker på at du ønsker å avbryte opplastningen? Bilder som er lastet opp vil bli forkastet.',
				lukke: 'Fortsett opplasting',
				bekreft: 'Avbryt opplasting',
			}}
			inkluderIkon={false}
			{...props}
		>
			{props.error && <InfoMelding text='Kunne ikke avbrytte opplasting' alvorlighet='advarsel' />}
		</StyledModal>
	);
};

export default AvbrytOpplasting;

const StyledModal = styled(Modal)<{ error?: boolean }>`
	${KnappeRad} {
		${({ error = false }) =>
			error
				? css`
						margin-top: 1.5rem;
				  `
				: css`
						margin-top: 3rem;
				  `};
	}
`;
