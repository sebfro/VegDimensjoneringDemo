import { FC } from 'react';
import { BaseModalProps, KnappeRad, Modal } from '../Modal';
import styled from 'styled-components';

export const IngenNyeVegbilder: FC<BaseModalProps> = (props) => {
	return (
		<StyledModal
			{...props}
			tekster={{
				tittel: 'Ingen nye vegbilder',
				beskrivelse:
					'Vi fant ingen nye vegbilder i mappen du valgte. Dobbelsjekk at du har valgt en mappe som inneholder bilder som ikke er lastet opp fra før og prøv igjen.',
				lukke: 'Tilbake til forsiden',
				bekreft: 'Velg en annen mappe',
			}}
		/>
	);
};

const StyledModal = styled(Modal)`
	${KnappeRad} {
		margin-top: 2rem;
	}
`;
