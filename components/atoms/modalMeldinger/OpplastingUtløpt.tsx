import { FC } from 'react';
import { BaseModalProps, KnappeRad, Modal } from '../Modal';
import styled from 'styled-components';

export const OpplastingUtløpt: FC<BaseModalProps> = (props) => {
	// Denne må være her for unggå fast-refresh bug
	const StyledModal = styled(Modal)`
		${KnappeRad} {
			margin-top: 2rem;
		}
	`;
	return (
		<StyledModal
			{...props}
			tekster={{
				tittel: 'Opplasting er utløpt',
				beskrivelse:
					'Opplastingen har vært inaktiv i en lengre periode, så vi har kanselert den. Du blir nødt å starte opplastingen på nytt. ',
				lukke: 'Tilbake til forsiden',
			}}
		/>
	);
};
