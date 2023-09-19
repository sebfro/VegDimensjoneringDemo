import { FC } from 'react';
import { BaseModalProps, KnappeRad, Modal } from '../Modal';
import styled from 'styled-components';

export const ManglerTilgang: FC<BaseModalProps> = (props) => {
	return (
		<StyledModal
			{...props}
			tekster={{
				tittel: 'Du må gi nettleseren tilgang til filene dine.',
				beskrivelse:
					'Du blir bedt om å gi tilgang når du velger en mappe som skal lastes opp. Tilgangen er gyldig til du lukker alle fanene for dette nesttstedet. ',
				lukke: 'Tilbake til forsiden',
			}}
		/>
	);
};

const StyledModal = styled(Modal)`
	${KnappeRad} {
		margin-top: 2rem;
	}
`;
